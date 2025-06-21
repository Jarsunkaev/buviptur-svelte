<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { t } from 'svelte-i18n';
  
  // Static carousel images - loaded once and memoized
  const carouselImages = [
    '/above.webp',
    '/margaret.webp',
    '/matyas.webp',
    '/parlament.webp',
    '/prague.webp',
    '/stefan.webp',
    '/var.webp',
    '/matyasii.webp'
  ];
  
  // Component state - using let for reactivity only where needed
  export let currentSlide = 0;
  let isVisible = false;
  let autoPlay = true;
  let carouselInterval;
  const loadedImages = new Set();
  const totalSlides = carouselImages.length;
  
  // Memoize slide navigation to prevent recreation
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
  };
  
  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  }
  
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
    // Force a full page reload to ensure contact page reloads with form data
    window.location.href = `/contact?${searchParams}`;
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
  
  // Preload all images when component mounts
  onMount(() => {
    // Preload all images immediately with eager loading
    const preloadImages = () => {
      carouselImages.forEach((src) => {
        if (!loadedImages.has(src)) {
          const img = new Image();
          img.src = src;
          img.loading = 'eager';
          img.decoding = 'async';
          img.fetchPriority = 'high';
          loadedImages.add(src);
        }
      });
    };
    
    // Start preloading
    preloadImages();
    
    // Set up carousel auto-play with 4-second intervals
    const startAutoPlay = () => {
      if (autoPlay && typeof window !== 'undefined' && 
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        carouselInterval = setInterval(nextSlide, 4000);
      }
    };
    
    // Mark component as visible
    isVisible = true;
    
    // Start autoplay after a short delay
    const autoplayTimeout = setTimeout(startAutoPlay, 1000);
    
    // Pause on interaction, resume after delay
    let pauseTimeout;
    const handleInteraction = () => {
      if (carouselInterval) {
        clearInterval(carouselInterval);
      }
      
      // Clear any existing pause timeout
      if (pauseTimeout) clearTimeout(pauseTimeout);
      
      // Resume autoplay after 10 seconds of inactivity
      pauseTimeout = setTimeout(() => {
        startAutoPlay();
      }, 10000);
    };
    
    // Add event listeners for user interaction
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        if (carouselInterval) clearInterval(carouselInterval);
      });
      carousel.addEventListener('mouseleave', () => {
        handleInteraction();
      });
      carousel.addEventListener('touchstart', () => {
        if (carouselInterval) clearInterval(carouselInterval);
      }, { passive: true });
    }
    
    // Cleanup
    return () => {
      if (carouselInterval) clearInterval(carouselInterval);
      if (autoplayTimeout) clearTimeout(autoplayTimeout);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  });
  
  // Highlights for desktop view - using translations
  $: highlights = [
    { icon: 'fa-map-marked-alt', title: $t('hero.highlights.guides') || 'Expert Guides' },
    { icon: 'fa-building', title: $t('hero.highlights.accommodation') || 'Quality Accommodation' },
    { icon: 'fa-globe-europe', title: $t('hero.highlights.experiences') || 'Unique Experiences' },
    { icon: 'fa-ship', title: $t('hero.highlights.cruises') || 'River Cruises' }
  ];
</script>

<section 
  class="hero-section relative min-h-screen flex items-center overflow-hidden"
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
>
  <!-- Full Background Carousel with persistent rendering -->
  <div class="absolute inset-0 z-0 carousel-container">
    {#each carouselImages as image, i}
      <div 
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out {i === currentSlide ? 'opacity-100' : 'opacity-0'}"
        style="background-image: url('{image}'); background-size: cover; background-position: center; will-change: opacity;"
      >
        {#if loadedImages.has(image)}
          <img 
            src={image} 
            alt="" 
            class="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            style="width: 100%; height: 100%;"
          />
        {/if}
        <!-- Lighter gradient overlays for better image visibility -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#113946]/40 via-[#113946]/25 to-[#113946]/15"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#113946]/35 via-transparent to-[#113946]/20"></div>
      </div>
    {/each}
    
    <!-- Pattern overlay removed -->
  </div>
  
  <!-- Content Container - Mobile First Design -->
  <div class="container mx-auto px-4 sm:px-6 relative z-10 w-full">
    <!-- Mobile Layout: Stacked vertically, form above the fold -->
    <div class="lg:hidden flex flex-col justify-center items-center min-h-screen py-12 w-full px-4">
      <!-- Content Area -->
      <div 
        class="text-white text-center w-full"
      >
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg text-center">
          {$t('hero.title') || 'Discover Authentic'} <span class="text-[#dcb660]">{$t('hero.titleHighlight') || 'Central Europe'}</span>
        </h1>
      </div>
      
      <!-- Form Container - Compact for mobile, above the fold -->
      <div 
        class="transform transition-all duration-1000 w-full flex justify-center"
        class:translate-y-0={isVisible}
        class:opacity-100={isVisible}
        class:translate-y-8={!isVisible}
        class:opacity-0={!isVisible}
        style="transition-delay: 200ms"
      >
        <div class="bg-white/15 backdrop-blur-md rounded-xl border border-white/30 p-6 shadow-2xl w-full max-w-md mx-2">
          <h3 class="text-base font-semibold mb-2 text-center text-white">{$t('hero.formTitle') || 'Get Your Free Quote'}</h3>
          <p class="text-sm sm:text-base text-white/90 mb-4 text-center leading-relaxed max-w-md mx-auto">{$t('hero.formSubtitle') || 'From local escapes to far-flung adventures across Central Europe, crafted with expertise and attention to detail.'}</p>
          
          <form class="space-y-3.5" on:submit|preventDefault={handleGetOffer}>
            <div>
              <input
                type="text"
                placeholder={$t('hero.firstName') || 'First Name'}
                class="w-full px-4 py-3 text-sm sm:text-base rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] focus:bg-white/30 transition-all"
                bind:value={name}
                required
              />
            </div>
            
            <div>
              <input
                type="text"
                placeholder={$t('hero.lastName') || 'Last Name'}
                class="w-full px-4 py-3 text-sm sm:text-base rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] focus:bg-white/30 transition-all"
                bind:value={surname}
                required
              />
            </div>
            
            <div>
              <input
                type="email"
                placeholder={$t('hero.email') || 'Email Address'}
                class="w-full px-4 py-3 text-sm sm:text-base rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] focus:bg-white/30 transition-all"
                bind:value={email}
                required
              />
            </div>
            
            <button
              type="submit"
              class="w-full bg-[#dcb660] text-[#113946] font-semibold py-3 px-4 rounded-lg hover:bg-[#dcb660]/90 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center text-sm mt-3"
            >
              <span>{$t('hero.submitButton') || 'Get My Free Quote'}</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Desktop Layout: Side by side (original layout) -->
    <div class="hidden lg:grid grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
      <!-- Left Content Area -->
      <div 
        class="text-white max-w-xl mx-auto lg:mx-0 transform transition-all duration-1000"
        class:translate-y-0={isVisible}
        class:opacity-100={isVisible}
        class:translate-y-8={!isVisible}
        class:opacity-0={!isVisible}
      >
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-[#dcb660]/20 backdrop-blur-sm border border-[#dcb660]/30 mb-6">
          <span class="text-[#dcb660] font-medium">{$t('hero.badge') || 'Premium Central Europe Tours'}</span>
        </div>
        
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
          {$t('hero.title') || 'Discover Authentic'} <span class="text-[#dcb660]">{$t('hero.titleHighlight') || 'Central Europe'}</span>
        </h1>
        
        <!-- Desktop Form Container -->
        <div class="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-xl">
          <h3 class="text-xl font-semibold mb-2">{$t('hero.formTitle') || 'Get Your Free Quote'}</h3>
          <p class="text-base text-white/90 mb-5 leading-relaxed">{$t('hero.formSubtitle') || 'From local escapes to far-flung adventures across Central Europe, crafted with expertise and attention to detail.'}</p>
          
          <form class="space-y-4" on:submit|preventDefault={handleGetOffer}>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder={$t('hero.firstName') || 'First Name'}
                  class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                  bind:value={name}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={$t('hero.lastName') || 'Last Name'}
                  class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                  bind:value={surname}
                  required
                />
              </div>
            </div>
            
            <div>
              <input
                type="email"
                placeholder={$t('hero.email') || 'Email Address'}
                class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                bind:value={email}
                required
              />
            </div>
            
            <button
              type="submit"
              class="w-full bg-[#dcb660] text-[#113946] font-semibold py-3 px-6 rounded-lg hover:bg-[#dcb660]/90 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <span>{$t('hero.submitButton') || 'Get My Free Quote'}</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </form>
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
  
  <!-- Carousel Navigation Dots (Hidden on mobile for cleaner look) -->
  <div class="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 space-x-2 z-20">
    {#each carouselImages as _, i}
      <button
        class="w-3 h-3 rounded-full transition-all duration-300 {i === currentSlide ? 'bg-[#dcb660] scale-125' : 'bg-white/40 hover:bg-white/60'}"
        on:click={() => currentSlide = i}
        aria-label={`Go to slide ${i + 1}`}
      ></button>
    {/each}
  </div>
</section>

<style>
  /* Form width and spacing adjustments */
  @media (max-width: 1024px) {
    .hero-form {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }
    
    /* Increase spacing between form elements on mobile */
    form > div {
      margin-bottom: 1rem;
    }
    
    form > div:last-child {
      margin-bottom: 0;
    }
  }

  /* Enhanced glass effect */
  .backdrop-blur-md {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  
  /* Enhanced input focus effect */
  input:focus {
    box-shadow: 0 0 0 3px rgba(220, 182, 96, 0.3);
    transform: scale(1.02);
  }
  
  /* Mobile-first hero section */
  .hero-section {
    /* Use CSS custom properties for mobile viewport heights */
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
  }
  
  @media (max-width: 1023px) {
    .hero-section {
      /* Mobile: ensure content fits above the fold */
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      align-items: stretch;
    }
    
    /* Improve text legibility on mobile */
    h1 {
      text-shadow: 0 4px 8px rgba(0,0,0,0.7);
      font-weight: 800;
      line-height: 1.1;
    }
    
    p {
      text-shadow: 0 2px 4px rgba(0,0,0,0.6);
      font-weight: 500;
    }
    
    /* Enhanced mobile form styling */
    .bg-white\/15 {
      background: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.4);
    }
    
    /* Better mobile touch targets */
    input, button {
      min-height: 48px;
      touch-action: manipulation;
    }
    
    /* Compact mobile spacing */
    
  }
  
  /* Desktop optimizations */
  @media (min-width: 1024px) {
    .hero-section {
      padding-top: 0;
    }
    
    /* Smoother transitions on desktop */
    .carousel-slide {
      transition-duration: 1500ms;
    }
  }
  
  /* Mobile-specific improvements */
  @media (max-width: 1023px) {
    /* Smoother carousel transitions on mobile */
    .carousel-slide {
      transition-duration: 1500ms;
    }
  }
  
  /* Ensure images cover properly */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
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
  
  /* Accessibility improvements */
  @media (prefers-reduced-motion: reduce) {
    .carousel-slide,
    .transform {
      transition: none !important;
      animation: none !important;
    }
  }
  
  /* Enhanced glassmorphism effect */
  .backdrop-blur-md::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border-radius: inherit;
    pointer-events: none;
  }
</style>