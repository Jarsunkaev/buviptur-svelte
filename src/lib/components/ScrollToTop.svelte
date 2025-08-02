<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { t } from 'svelte-i18n';
  
  let showButton = false;
  let scrollPosition = 0;
  let scrollTimeout;
  
  // Throttle scroll event for performance
  function handleScroll() {
    if (!browser) return;
    
    // Clear any existing timeout
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    
    // Use requestAnimationFrame for performance
    scrollTimeout = window.requestAnimationFrame(() => {
      const currentPosition = window.scrollY || document.documentElement.scrollTop;
      
      // Only update if scroll position changed significantly (more than 5px)
      if (Math.abs(currentPosition - scrollPosition) > 5) {
        scrollPosition = currentPosition;
        
        // Show button when scrolled down more than 200px
        showButton = scrollPosition > 200;
      }
    });
  }
  
  function scrollToTop() {
    if (!browser) return;
    
    try {
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (e) {
      // Fallback for older browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }
  
  // Add scroll event listener
  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Initial check in case page loads scrolled
      handleScroll();
    }
    
    return () => {
      if (browser) {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeout) {
          window.cancelAnimationFrame(scrollTimeout);
        }
      }
    };
  });
</script>

<!-- Floating scroll to top button -->
<div 
  class="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out {showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}"
  style="position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9999;"
>
  <button 
    on:click={scrollToTop}
    class="w-12 h-12 bg-[#dcb660] hover:bg-[#c9a64f] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb660] cursor-pointer transform hover:-translate-y-1 backdrop-blur-sm"
    aria-label={$t('common.backToTop') || 'Back to top'}
    title={$t('common.backToTop') || 'Back to top'}
    type="button"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  </button>
</div>

<style>
  /* Ensure the button stays above all other content */
  div {
    position: fixed !important;
    bottom: 1.5rem !important;
    right: 1.5rem !important;
    z-index: 9999 !important;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    div {
      bottom: 1rem !important;
      right: 1rem !important;
    }
    
    button {
      width: 3rem !important;
      height: 3rem !important;
    }
  }
  
  /* Ensure button is always visible and clickable */
  button {
    position: relative;
    z-index: 10000;
  }
</style> 