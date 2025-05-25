<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  // Show button when page is scrolled down
  let showButton = false;
  let scrollY = 0;
  
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  function checkScrollPosition() {
    if (!browser) return;
    scrollY = window.scrollY;
    // Show button when scrolled down 300px
    showButton = scrollY > 300;
  }
  
  // Throttle scroll events for better performance
  function throttle(callback, limit) {
    let waiting = false;
    return function() {
      if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        setTimeout(() => {
          waiting = false;
        }, limit);
      }
    };
  }
  
  onMount(() => {
    if (!browser) return;
    
    const throttledScroll = throttle(checkScrollPosition, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    checkScrollPosition();
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  });
</script>

<div 
  class="fixed bottom-6 right-6 z-[9999] transition-all duration-300 ease-out"
  class:translate-y-0={showButton}
  class:translate-y-20={!showButton}
  class:opacity-100={showButton}
  class:opacity-0={!showButton}
  style="transform: translateY({showButton ? '0' : '80px'});"
>
  <button 
    on:click={scrollToTop}
    class="bg-[#dcb660] hover:bg-[#c9a64f] text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb660] pointer-events-auto"
    aria-label="Scroll to top"
    style="box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25); border: 2px solid rgba(255, 255, 255, 0.3)"
  >
    <i class="fas fa-chevron-up text-xl"></i>
  </button>
</div>

<style>
  button {
    will-change: transform, box-shadow;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    position: relative;
    z-index: 9999;
  }
  
  /* Smooth appearance/disappearance */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Ensure the button is above other content */
  .z-\[9999\] {
    z-index: 9999 !important;
  }
  
  /* Make sure the button is visible on all screen sizes */
  @media (max-width: 768px) {
    .fixed {
      right: 1.25rem !important;
      bottom: 5rem !important; /* Increased bottom spacing to avoid mobile browser UI */
    }
  }
  
  /* Ensure button is visible in light and dark modes */
  @media (prefers-color-scheme: dark) {
    button {
      border-color: rgba(255, 255, 255, 0.4);
    }
  }
</style>