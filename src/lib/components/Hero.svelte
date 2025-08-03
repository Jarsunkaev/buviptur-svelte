<script>
  import { onMount, onDestroy } from 'svelte';
  import { t } from 'svelte-i18n';
  
  // Optimized image paths - only load what we need
  const imageNames = [
    'above-optimized.webp',
    'margaret-optimized.webp',
    'matyas-optimized.webp',
    'parlament-optimized.webp',
    'prague-optimized.webp',
    'stefan-optimized.webp',
    'var-optimized.webp',
    'budapest-optimized.webp'
  ];
  
  // State management with better performance
  let currentSlide = $state(0);
  let isMobile = $state(false);
  let isMounted = $state(false);
  let isVisible = $state(true);
  let carouselInterval = null;
  const totalSlides = imageNames.length;

  // Simple slide navigation with debouncing
  let slideTimeout;
  function nextSlide() {
    if (slideTimeout) clearTimeout(slideTimeout);
    slideTimeout = setTimeout(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
    }, 50);
  }

  function prevSlide() {
    if (slideTimeout) clearTimeout(slideTimeout);
    slideTimeout = setTimeout(() => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }, 50);
  }

  function goToSlide(index) {
    if (index >= 0 && index < imageNames.length) {
      if (slideTimeout) clearTimeout(slideTimeout);
      slideTimeout = setTimeout(() => {
        currentSlide = index;
      }, 50);
    }
  }

  // Optimized touch handling with passive listeners
  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 50;
  const SWIPE_TIME_THRESHOLD = 300;

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    // Pause autoplay on touch
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  }

  function handleTouchMove(e) {
    if (!touchStartX) return;
    touchEndX = e.touches[0].clientX;
    
    // Prevent scrolling if swiping horizontally
    if (Math.abs(touchEndX - touchStartX) > 10) {
      e.preventDefault();
    }
  }

  function handleTouchEnd() {
    if (!touchStartX) return;
    
    const swipeDistance = touchEndX - touchStartX;
    const swipeTime = Date.now() - (touchStartTime || Date.now());
    
    // Only process swipe if it was quick and significant enough
    if (swipeTime < SWIPE_TIME_THRESHOLD && Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
      if (swipeDistance > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    // Reset touch tracking
    touchStartX = 0;
    touchEndX = 0;
  }

  // Initialize component with better performance
  onMount(() => {
    isMounted = true;
    isMobile = window.innerWidth < 1024;
    isVisible = true;
    
    // Start auto-play if not reduced motion
    if (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      carouselInterval = setInterval(nextSlide, 5000);
    }
    
    // Setup touch events with passive listeners
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
      carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
      carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
      carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    return () => {
      if (carouselInterval) clearInterval(carouselInterval);
      if (slideTimeout) clearTimeout(slideTimeout);
      if (carousel) {
        carousel.removeEventListener('touchstart', handleTouchStart);
        carousel.removeEventListener('touchmove', handleTouchMove);
        carousel.removeEventListener('touchend', handleTouchEnd);
      }
    };
  });

  // Highlights for desktop view - made reactive
  const highlights = $derived([
    { icon: 'fa-map-marked-alt', title: $t('hero.highlights.guides') || 'Expert Guides' },
    { icon: 'fa-building', title: $t('hero.highlights.accommodation') || 'Quality Accommodation' },
    { icon: 'fa-globe-europe', title: $t('hero.highlights.experiences') || 'Unique Experiences' },
    { icon: 'fa-ship', title: $t('hero.highlights.cruises') || 'River Cruises' }
  ]);
</script>

<section 
  class="hero-section relative min-h-screen flex items-center overflow-hidden"
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  ontouchend={handleTouchEnd}
>
  <!-- Optimized Carousel with better performance -->
  <div class="absolute inset-0 z-0 carousel-container overflow-hidden">
    {#each imageNames as image, i}
      <div 
        class="carousel-item absolute inset-0 transition-opacity duration-1000 ease-in-out {i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}"
        style="will-change: transform, opacity;"
        data-index={i}
      >
        <img 
          src={image}
          alt="" 
          class="w-full h-full object-cover"
          loading={i <= 2 ? 'eager' : 'lazy'}
          decoding="async"
          style="transform: translateZ(0); backface-visibility: hidden;"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-[#113946]/40 via-[#113946]/25 to-[#113946]/15"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#113946]/35 via-transparent to-[#113946]/20"></div>
      </div>
    {/each}
  </div>
  
  <!-- Content Container -->
  <div class="container mx-auto px-4 sm:px-6 relative z-10 w-full">
    <!-- Mobile Layout -->
    <div class="lg:hidden flex flex-col justify-center min-h-screen pb-8 w-full">
      <div 
        class="text-white text-center w-full transform transition-all duration-1000 px-4"
        class:translate-y-0={isVisible}
        class:opacity-100={isVisible}
        class:translate-y-8={!isVisible}
        class:opacity-0={!isVisible}
      >
        <!-- Main Title -->
        <h1 class="text-3xl sm:text-4xl font-bold mb-4 leading-tight drop-shadow-lg">
          {$t('hero.title') || 'Discover Authentic'} 
          <span class="text-[#dcb660] block mt-1">{$t('hero.titleHighlight') || 'Central Europe'}</span>
        </h1>
        
        <!-- Subtitle -->
        <p class="text-base sm:text-lg text-white/95 mb-6 leading-relaxed max-w-sm mx-auto font-extrabold drop-shadow-xl"
          style="text-shadow: 0 2px 8px rgba(0,0,0,0.35);"
        >
          {$t('hero.formSubtitle') || 'From local escapes to far-flung adventures across Central Europe, crafted with expertise and attention to detail.'}
        </p>
        
        <!-- CTA Button -->
        <div class="flex justify-center mb-4">
          <a href="/contact" class="bg-[#dcb660] text-[#113946] font-semibold py-3 px-6 rounded-full hover:bg-[#dcb660]/90 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center text-sm">
            <span>{$t('hero.submitButton') || 'Get My Free Quote'}</span>
            <i class="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
        
        <!-- Mobile Highlights -->
        <div class="grid grid-cols-2 gap-3 mt-6">
          {#each highlights.slice(0, 4) as highlight, i}
            <div 
              class="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3 flex items-center space-x-2 transform transition-all duration-1000"
              class:translate-y-0={isVisible}
              class:opacity-100={isVisible}
              class:translate-y-8={!isVisible}
              class:opacity-0={!isVisible}
              style="transition-delay: {400 + (i * 100)}ms"
            >
              <div class="w-8 h-8 bg-[#dcb660]/20 rounded-full flex items-center justify-center text-[#dcb660] flex-shrink-0">
                <i class="fas {highlight.icon} text-xs"></i>
              </div>
              <span class="text-white text-xs font-medium leading-tight">{highlight.title}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Desktop Layout -->
    <div class="hidden lg:grid grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
      <div 
        class="text-white max-w-xl mx-auto lg:mx-0 transform transition-all duration-1000"
        class:translate-y-0={isVisible}
        class:opacity-100={isVisible}
        class:translate-y-8={!isVisible}
        class:opacity-0={!isVisible}
      >
        <h1 class="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
          {$t('hero.title') || 'Discover Authentic'} <span class="text-[#dcb660]">{$t('hero.titleHighlight') || 'Central Europe'}</span>
        </h1>
        <p class="text-xl text-white/90 mb-8 leading-relaxed font-extrabold drop-shadow-xl"
          style="text-shadow: 0 2px 8px rgba(0,0,0,0.35);"
        >
          {$t('hero.formSubtitle') || 'From local escapes to far-flung adventures across Central Europe, crafted with expertise and attention to detail.'}
        </p>
        <div class="flex">
          <a href="/contact" class="bg-[#dcb660] text-[#113946] font-semibold py-4 px-8 rounded-lg hover:bg-[#dcb660]/90 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center text-lg">
            <span>{$t('hero.submitButton') || 'Get My Free Quote'}</span>
            <i class="fas fa-arrow-right ml-3"></i>
          </a>
        </div>
      </div>
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
  
  <!-- Carousel Navigation Dots -->
  <div class="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 space-x-2 z-20">
    {#each imageNames as _, i}
      <button
        class="w-3 h-3 rounded-full transition-all duration-300 {i === currentSlide ? 'bg-[#dcb660] scale-125' : 'bg-white/40 hover:bg-white/60'}"
        onclick={() => goToSlide(i)}
        aria-label={`Go to slide ${i + 1}`}
      ></button>
    {/each}
  </div>
</section>

<style>
  .hero-section {
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
  }
  @media (max-width: 1023px) {
    .hero-section {
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      align-items: stretch;
    }
    h1 {
      text-shadow: 0 4px 8px rgba(0,0,0,0.7);
      font-weight: 800;
      line-height: 1.1;
    }
    p {
      text-shadow: 0 2px 4px rgba(0,0,0,0.6);
      font-weight: 500;
    }
    button {
      min-height: 48px;
      touch-action: manipulation;
    }
  }
  @media (min-width: 1024px) {
    .hero-section {
      padding-top: 0;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .translate-y-0 { transform: translateY(0); }
  .translate-y-8 { transform: translateY(2rem); }
  .opacity-0 { opacity: 0; }
  .opacity-100 { opacity: 1; }
  @media (prefers-reduced-motion: reduce) {
    .carousel-slide, .transform {
      transition: none !important;
      animation: none !important;
    }
  }
</style>
