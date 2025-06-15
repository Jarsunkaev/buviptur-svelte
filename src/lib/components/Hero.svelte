<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { t } from 'svelte-i18n';
  
  // Static carousel images - loaded once
  const carouselImages = [
    '/above.webp',
    '/margaret.webp',
    '/matyas.webp',
    '/parlament.webp',
    '/prague.webp',
    '/stefan.webp',
    '/var.webp',
    '/vajda.webp',
    '/matyasii.webp'
  ];
  
  // Component state
  let currentSlide = 0;
  let isVisible = false;
  let autoPlay = true;
  let carouselInterval;
  const totalSlides = carouselImages.length;
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  }
  
  onMount(() => {
    // Eagerly preload all images
    carouselImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    
    // Set up carousel auto-play, respecting user preferences
    if (autoPlay && typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      carouselInterval = setInterval(nextSlide, 5000);
    }
    
    // Trigger fade-in animation
    const visibilityTimeout = setTimeout(() => {
      isVisible = true;
    }, 100);
    
    // Cleanup on component destruction
    return () => {
      if (carouselInterval) clearInterval(carouselInterval);
      clearTimeout(visibilityTimeout);
    };
  });
  
  // Form data
  let name = '';
  let surname = '';
  let email = '';
  
  function handleGetOffer() {
    if (!name || !surname || !email) {
      // Basic validation feedback
      alert('Please fill out all fields.');
      return;
    }
    const searchParams = new URLSearchParams({ name, surname, email }).toString();
    goto(`/contact?${searchParams}`);
  }
  
  // Touch tracking for mobile swipe
  let touchStartX = 0;
  let touchEndX = 0;
  
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }
  
  function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
  }
  
  function handleTouchEnd() {
    const swipeDistance = touchEndX - touchStartX;
    const threshold = 50; // A smaller threshold for better responsiveness
    
    if (swipeDistance > threshold) {
      prevSlide();
    } else if (swipeDistance < -threshold) {
      nextSlide();
    }
  }
  
  // Highlights for desktop view
  $: highlights = [
    { icon: 'fa-map-marked-alt', title: $t('hero.highlights.guides') },
    { icon: 'fa-building', title: $t('hero.highlights.accommodation') },
    { icon: 'fa-globe-europe', title: $t('hero.highlights.experiences') },
    { icon: 'fa-ship', title: $t('hero.highlights.cruises') }
  ];
</script>

<section 
  class="relative h-[100svh] w-full flex items-center overflow-hidden"
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
>
  <div class="absolute inset-0 z-0">
    {#each carouselImages as image, i}
      <div 
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style="opacity: {i === currentSlide ? '1' : '0'};"
      >
        <img 
          src={image} 
          alt="Scenic tour background"
          class="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#113946]/60 to-transparent opacity-75"></div>
      </div>
    {/each}
  </div>
  
  <div class="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col justify-center md:justify-center h-full pt-20 pb-4 md:pt-0">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div 
        class="text-white max-w-xl mx-auto lg:mx-0 transition-all duration-1000 transform"
        class:translate-y-0={isVisible}
        class:opacity-100={isVisible}
        class:translate-y-8={!isVisible}
        class:opacity-0={!isVisible}
      >
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-[#dcb660]/20 backdrop-blur-sm border border-[#dcb660]/30 mb-4">
          <span class="text-[#dcb660] font-medium text-sm">{$t('hero.badge')}</span>
        </div>
        
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-shadow">
          {$t('hero.title')} <span class="text-[#dcb660]">{$t('hero.titleHighlight')}</span>
        </h1>
        
        <p class="text-lg text-white/90 mb-6 max-w-lg text-shadow">
          {$t('hero.subtitle')}
        </p>
        
        <div class="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 shadow-xl">
          <h3 class="text-xl font-semibold mb-4 text-center sm:text-left">{$t('hero.formTitle')}</h3>
          
          <form class="space-y-4" on:submit|preventDefault={handleGetOffer}>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={$t('hero.firstName')}
                class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                bind:value={name}
                required
              />
              <input
                type="text"
                placeholder={$t('hero.lastName')}
                class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                bind:value={surname}
                required
              />
            </div>
            
            <input
              type="email"
              placeholder={$t('hero.email')}
              class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
              bind:value={email}
              required
            />
            
            <button
              type="submit"
              class="w-full bg-[#dcb660] text-[#113946] font-semibold py-3 px-6 rounded-lg hover:bg-[#dcb660]/90 transition-transform transform hover:-translate-y-1 shadow-lg flex items-center justify-center"
            >
              <span>{$t('hero.submitButton')}</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </form>
        </div>
      </div>
      
      <div class="hidden lg:block">
        <div class="grid grid-cols-2 gap-4">
          {#each highlights as highlight, i}
            <div 
              class="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4 flex items-center space-x-4 transform transition-all duration-1000"
              class:translate-y-0={isVisible}
              class:opacity-100={isVisible}
              class:translate-y-8={!isVisible}
              class:opacity-0={!isVisible}
              style="transition-delay: {300 + (i * 100)}ms"
            >
              <div class="w-12 h-12 bg-[#dcb660]/20 rounded-full flex items-center justify-center text-[#dcb660] text-xl">
                <i class="fas {highlight.icon}"></i>
              </div>
              <span class="text-white font-medium">{highlight.title}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Legibility & Style Enhancements */
  .text-shadow {
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
  }

  .backdrop-blur-md {
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
  }
  
  input:focus {
    box-shadow: 0 0 0 2px rgba(220, 182, 96, 0.4);
  }

  /* Ensures the hero section attempts to fill the screen on mobile browsers */
  .h-\[100svh\] {
      height: 100svh;
  }
</style>