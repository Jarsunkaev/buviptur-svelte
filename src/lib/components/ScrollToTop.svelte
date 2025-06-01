<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  let showButton = false;
  let scrollContainer = null;
  let scrollListener = null;
  
  function scrollToTop() {
    if (!browser) return;
    
    try {
      // Try scrolling the detected container first
      if (scrollContainer && scrollContainer !== window) {
        scrollContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // Use window for scrolling
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    } catch (e) {
      // Fallback for browsers that don't support smooth scrolling
      if (scrollContainer && scrollContainer !== window) {
        scrollContainer.scrollTop = 0;
      } else {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }
  }
  
  function getScrollPosition() {
    if (!browser || !scrollContainer) return 0;
    
    if (scrollContainer === window) {
      return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    } else {
      return scrollContainer.scrollTop;
    }
  }
  
  function checkScrollPosition() {
    if (!browser) return;
    
    const scrollPosition = getScrollPosition();
    const threshold = 300; // Show button after scrolling 300px
    
    showButton = scrollPosition > threshold;
  }
  
  function throttle(callback, limit) {
    let waiting = false;
    return function(...args) {
      if (!waiting) {
        callback.apply(this, args);
        waiting = true;
        setTimeout(() => {
          waiting = false;
        }, limit);
      }
    };
  }
  
  function findScrollContainer() {
    if (!browser) return null;
    
    // Check if main element is scrollable
    const main = document.querySelector('main');
    if (main) {
      const mainStyles = getComputedStyle(main);
      const hasScroll = main.scrollHeight > main.clientHeight;
      const hasOverflow = mainStyles.overflowY === 'scroll' || mainStyles.overflowY === 'auto';
      
      if (hasScroll && hasOverflow) {
        return main;
      }
    }
    
    // Check if body is scrollable
    const body = document.body;
    if (body && body.scrollHeight > body.clientHeight) {
      return window; // Use window for body scrolling
    }
    
    // Default to window
    return window;
  }
  
  onMount(() => {
    if (!browser) return;
    
    // Find the appropriate scroll container
    scrollContainer = findScrollContainer();
    
    // Create throttled scroll handler
    const throttledScroll = throttle(checkScrollPosition, 50);
    
    // Add scroll listener to the appropriate container
    if (scrollContainer === window) {
      window.addEventListener('scroll', throttledScroll, { passive: true });
      scrollListener = () => window.removeEventListener('scroll', throttledScroll);
    } else {
      scrollContainer.addEventListener('scroll', throttledScroll, { passive: true });
      scrollListener = () => scrollContainer.removeEventListener('scroll', throttledScroll);
    }
    
    // Initial check
    checkScrollPosition();
    
    // Re-check scroll container on layout changes (useful for SPAs)
    const resizeObserver = new ResizeObserver(() => {
      const newContainer = findScrollContainer();
      if (newContainer !== scrollContainer) {
        // Remove old listener
        if (scrollListener) scrollListener();
        
        // Update container and add new listener
        scrollContainer = newContainer;
        if (scrollContainer === window) {
          window.addEventListener('scroll', throttledScroll, { passive: true });
          scrollListener = () => window.removeEventListener('scroll', throttledScroll);
        } else {
          scrollContainer.addEventListener('scroll', throttledScroll, { passive: true });
          scrollListener = () => scrollContainer.removeEventListener('scroll', throttledScroll);
        }
      }
    });
    
    resizeObserver.observe(document.body);
    
    return () => {
      if (scrollListener) scrollListener();
      resizeObserver.disconnect();
    };
  });
  
  onDestroy(() => {
    if (scrollListener) scrollListener();
  });
</script>

<!-- Button with smooth show/hide animation -->
<div 
  class="fixed bottom-6 right-6 z-[9999] transition-all duration-300 ease-out pointer-events-none"
  class:opacity-0={!showButton}
  class:translate-y-4={!showButton}
  class:scale-75={!showButton}
  class:opacity-100={showButton}
  class:translate-y-0={showButton}
  class:scale-100={showButton}
  style="will-change: transform, opacity;"
>
  <button
    on:click={scrollToTop}
    class="w-14 h-14 bg-[#dcb660] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ease-out transform hover:scale-110 hover:bg-[#c9a34f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb660] active:scale-95 pointer-events-auto"
    class:pointer-events-none={!showButton}
    aria-label="Scroll to top"
    title="Scroll to top"
    style="
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      border: 2px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    "
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-6 w-6 transition-transform duration-200" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      stroke-width="2.5"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>
</div>

<style>
  /* Ensure smooth transitions and proper layering */
  button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateZ(0); /* Force hardware acceleration */
    -webkit-backface-visibility: hidden; /* Fix for iOS */
    backface-visibility: hidden;
    cursor: pointer;
  }
  
  button:hover svg {
    transform: translateY(-1px);
  }
  
  button:active svg {
    transform: translateY(0);
  }
  
  /* Mobile optimizations */
  @media (max-width: 768px) {
    .fixed {
      bottom: 1rem;
      right: 1rem;
    }
    
    button {
      width: 3rem;
      height: 3rem;
    }
    
    button svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  /* Ensure button is visible in different color schemes */
  @media (prefers-color-scheme: dark) {
    button {
      border-color: rgba(255, 255, 255, 0.4);
    }
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .transition-all,
    button {
      transition: none !important;
    }
  }
</style>