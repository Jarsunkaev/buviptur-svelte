<script>
    import { onMount, onDestroy } from 'svelte';
    
    export let images = [
      {
        src: '/hero-1.png',
        alt: 'SvelteKit Project Screenshot 1'
      },
      {
        src: '/hero-2.png',
        alt: 'SvelteKit Project Screenshot 2'
      },
      {
        src: '/hero-3.png',
        alt: 'SvelteKit Project Screenshot 3'
      }
    ];
    
    let currentIndex = 0;
    let intervalId;
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
    
    function goToSlide(index) {
      currentIndex = index;
    }
    
    onMount(() => {
      // Auto rotate slides every 5 seconds
      intervalId = setInterval(nextSlide, 5000);
      
      return () => {
        clearInterval(intervalId);
      };
    });
    
    onDestroy(() => {
      if (intervalId) clearInterval(intervalId);
    });
  </script>
  
  <div class="relative w-full h-full overflow-hidden rounded-xl shadow-xl">
    <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl"></div>
    
    <!-- Image Container -->
    <div class="relative w-full h-full">
      {#each images as image, i}
        <div 
          class="absolute inset-0 transition-opacity duration-700 ease-in-out transform"
          style="opacity: {i === currentIndex ? '1' : '0'}; z-index: {i === currentIndex ? '1' : '0'};"
        >
          <img 
            src={image.src} 
            alt={image.alt}
            class="w-full h-full object-cover rounded-xl"
          />
        </div>
      {/each}
    </div>
    
    <!-- Navigation Arrows -->
    <button 
      class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
      on:click={prevSlide}
      aria-label="Previous image"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    
    <button 
      class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
      on:click={nextSlide}
      aria-label="Next image"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
    
    <!-- Dots Indicators -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
      {#each images as _, i}
        <button 
          class="w-2 h-2 rounded-full transition-all duration-300 {i === currentIndex ? 'bg-white w-6' : 'bg-white/60'}"
          on:click={() => goToSlide(i)}
          aria-label={`Go to slide ${i + 1}`}
        ></button>
      {/each}
    </div>
  
    <!-- Code Overlay (Optional for coding effect) -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-40 rounded-xl pointer-events-none"></div>
  </div>
  
  <style>
    /* Add some subtle animations */
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.02);
      }
    }
    
    .rounded-xl {
      animation: pulse 10s ease-in-out infinite;
    }
  </style>