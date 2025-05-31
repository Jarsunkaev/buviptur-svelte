<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { fly } from 'svelte/transition';
  
  let showButton = false;
  
  function scrollToTop() {
    try {
      // Try the modern method first
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (e) {
      // Fallback for browsers that don't support smooth scrolling
      document.documentElement.scrollTop = 0;
    }
  }
  
  function checkScrollPosition() {
    if (!browser) return;
    // Use either window.scrollY or document.documentElement.scrollTop for better cross-browser support
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    showButton = scrollPosition > 300;
  }
  
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
    
    const throttledScroll = throttle(checkScrollPosition, 50);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    checkScrollPosition();
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  });
</script>

<div class="fixed bottom-8 right-8 z-[9999] transition-all duration-300" class:opacity-0={!showButton} class:translate-y-4={!showButton} class:opacity-100={showButton} class:translate-y-0={showButton} style="will-change: transform, opacity;">
  <button
    on:click|preventDefault={scrollToTop}
    class="w-14 h-14 bg-[#dcb660] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#c9a34f] transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb660]"
    class:opacity-0={!showButton}
    class:translate-y-4={!showButton}
    class:opacity-100={showButton}
    class:translate-y-0={showButton}
    aria-label="Scroll to top"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>
</div>

<style>
  button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    border: 2px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
    opacity: 0.9;
    transform: translateZ(0); /* Force hardware acceleration */
    -webkit-backface-visibility: hidden; /* Fix for iOS */
    backface-visibility: hidden;
  }
  
  button:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.35);
  }
  
  button:active {
    transform: scale(0.95);
  }
  
  /* Smooth appearance animation */
  :global(html) {
    scroll-behavior: smooth;
  }
  
  /* Make sure the button is visible on all screen sizes */
  @media (max-width: 768px) {
    .fixed {
      bottom: 1.5rem;
      right: 1.5rem;
    }
  }
  
  /* Ensure button is visible in light and dark modes */
  @media (prefers-color-scheme: dark) {
    button {
      border-color: rgba(255, 255, 255, 0.4);
    }
  }
</style>