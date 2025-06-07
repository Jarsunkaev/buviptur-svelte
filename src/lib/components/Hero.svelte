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
  let preloadTimeout;
  const loadedImages = new Set();
  const totalSlides = carouselImages.length;
  
  // Simple slide navigation with forced reflow
  function nextSlide() {
    document.querySelector('.carousel-slide')?.offsetHeight; // Force reflow
    currentSlide = (currentSlide + 1) % totalSlides;
  }
  
  function prevSlide() {
    document.querySelector('.carousel-slide')?.offsetHeight; // Force reflow
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  }
  
  // Preload all images when component mounts
  onMount(() => {
    // Preload all images immediately
    carouselImages.forEach((src, index) => {
      if (!loadedImages.has(src)) {
        const img = new Image();
        img.src = src;
        img.loading = 'eager';
        loadedImages.add(src);
      }
    });
    
    // Set up carousel auto-play
    if (autoPlay && typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      carouselInterval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    // Mark component as visible
    isVisible = true;
    
    // Cleanup
    return () => {
      if (carouselInterval) clearInterval(carouselInterval);
      if (preloadTimeout) clearTimeout(preloadTimeout);
    };
  });
  

  
  // Form data
  let name = '';
  let surname = '';
  let email = '';
  
  // Touch tracking for mobile swipe
  let touchStartX = 0;
  let touchEndX = 0;
  
  function handleGetOffer() {
    const searchParams = new URLSearchParams({
      name,
      surname,
      email
    }).toString();
    goto(`/contact?${searchParams}`);
  }
  
  // Touch handlers for swipe functionality
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }
  
  function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
  }
  
  function handleTouchEnd() {
    const swipeDistance = touchEndX - touchStartX;
    const threshold = 75; // Minimum distance for a swipe to register
    
    if (swipeDistance > threshold) {
      prevSlide();
    } else if (swipeDistance < -threshold) {
      nextSlide();
    }
  }
  
  onMount(() => {
    // Trigger fade-in animation after a short delay
    setTimeout(() => {
      isVisible = true;
    }, 100);
    
    // Set up carousel when component mounts (memoized)
    onMount(() => {
      if (memo.has('carousel_setup')) return;
      memo.set('carousel_setup', true);
      
      if (autoPlay) {
        carouselInterval = setupCarouselInterval();
      }
      
      return () => {
        if (carouselInterval) clearInterval(carouselInterval);
        if (preloadTimeout) clearTimeout(preloadTimeout);
        memo.delete('carousel_setup');
      };
    });
    
    setupCarousel();
    
    // Cleanup function
    return () => {
      if (carouselInterval) clearInterval(carouselInterval);
    };
  });
  
  // Highlights for desktop view - using translations
  $: highlights = [
    { icon: 'fa-map-marked-alt', title: $t('hero.highlights.guides') },
    { icon: 'fa-building', title: $t('hero.highlights.accommodation') },
    { icon: 'fa-globe-europe', title: $t('hero.highlights.experiences') },
    { icon: 'fa-ship', title: $t('hero.highlights.cruises') }
  ];
</script>

<section 
  class="relative min-h-screen flex items-center overflow-hidden pt-16 md:pt-0"
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
>
  <!-- Full Background Carousel -->
  <div class="absolute inset-0 z-0">
    {#each carouselImages as image, i}
      <div 
        class="carousel-slide absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style="opacity: {i === currentSlide ? '1' : '0'}; pointer-events: none;"
      >
        <img 
          src={image} 
          alt=""
          class="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          style="width: 100%; height: 100%;"
        />
        <!-- Multiple gradient overlays for better text readability -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#113946]/50 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#113946]/40 to-transparent"></div>
      </div>
    {/each}
    
    <!-- Subtle pattern overlay -->
    <div class="absolute inset-0 bg-black/10 z-10 opacity-30" 
         style="background-image: url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22 fill-rule=%22evenodd%22%3E%3Ccircle cx=%223%22 cy=%223%22 r=%223%22/%3E%3Ccircle cx=%2213%22 cy=%2213%22 r=%223%22/%3E%3C/g%3E%3C/svg%3E');">
    </div>
  </div>
  
  <!-- Content Container with better mobile spacing -->
  <div class="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col min-h-screen justify-center">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <!-- Left Content Area -->
      <div 
        class="text-white max-w-xl mx-auto lg:mx-0 transform transition-all duration-1000"
        class:translate-y-0={isVisible}
        class:opacity-100={isVisible}
        class:translate-y-8={!isVisible}
        class:opacity-0={!isVisible}
      >
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-[#dcb660]/20 backdrop-blur-sm border border-[#dcb660]/30 mb-6 mt-8 sm:mt-0">
          <span class="text-[#dcb660] font-medium">{$t('hero.badge')}</span>
        </div>
        
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {$t('hero.title')} <span class="text-[#dcb660]">{$t('hero.titleHighlight')}</span>
        </h1>
        
        <p class="text-lg sm:text-xl text-white/90 mb-8 max-w-lg">
          {$t('hero.subtitle')}
        </p>
        
        <!-- Form Container with improved mobile spacing -->
        <div class="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-xl mb-12 md:mb-0">
          <h3 class="text-xl font-semibold mb-4">{$t('hero.formTitle')}</h3>
          
          <div class="space-y-4" on:submit|preventDefault={handleGetOffer}>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder={$t('hero.firstName')}
                  class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                  bind:value={name}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={$t('hero.lastName')}
                  class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                  bind:value={surname}
                  required
                />
              </div>
            </div>
            
            <div>
              <input
                type="email"
                placeholder={$t('hero.email')}
                class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                bind:value={email}
                required
              />
            </div>
            
            <button
              type="button"
              on:click={handleGetOffer}
              class="w-full bg-[#dcb660] text-[#113946] font-semibold py-3 px-6 rounded-lg hover:bg-[#dcb660]/90 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <span>{$t('hero.submitButton')}</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Right side - Desktop visible highlights -->
      <div class="hidden lg:block">
        <div class="grid grid-cols-2 gap-4">
          {#each highlights as highlight, i}
            <div 
              class="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4 flex items-center space-x-3 transform transition-all duration-1000"
              class:translate-y-0={isVisible}
              class:opacity-100={isVisible}
              class:translate-y-8={!isVisible}
              class:opacity-0={!isVisible}
              style="transition-delay: {300 + (i * 100)}ms"
            >
              <div class="w-12 h-12 bg-[#dcb660]/20 rounded-full flex items-center justify-center text-[#dcb660]">
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
  /* Glass effect enhancement */
  .backdrop-blur-md {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  
  /* Input focus effect */
  input:focus {
    box-shadow: 0 0 0 2px rgba(220, 182, 96, 0.3);
  }
  
  /* Improved mobile sizing */
  @media (max-width: 768px) {
    /* Mobile-specific styles */
    .hero-content {
      padding-top: 2rem;
    }
    
    .hero-text {
      text-align: center;
    }
    
    /* Smoother transitions on mobile */
    .carousel-slide {
      transition-duration: 1200ms;
    }
  }
  
  /* Ensure images cover the entire viewport */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Smooth transitions */
  .translate-y-0 {
    transform: translateY(0);
  }
  
  .translate-y-8 {
    transform: translateY(2rem);
  }
  
  .opacity-0 {
    opacity: 0;
  }
  
  .opacity-100 {
    opacity: 1;
  }
</style>