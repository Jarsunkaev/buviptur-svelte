<script>
    import { onMount } from 'svelte';
    
    // Show button when page is scrolled down
    let showButton = false;
    
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    function checkScrollPosition() {
      // Show button when scrolled down 300px
      showButton = window.scrollY > 300;
    }
    
    onMount(() => {
      window.addEventListener('scroll', checkScrollPosition);
      
      return () => {
        window.removeEventListener('scroll', checkScrollPosition);
      };
    });
  </script>
  
<div class="fixed bottom-6 right-6 z-50 transition-opacity duration-300" style="opacity: {showButton ? '1' : '0'} ; pointer-events: {showButton ? 'auto' : 'none'}">
    <button 
      on:click={scrollToTop}
      class="bg-teal-900 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-teal-800 transition-all hover:scale-110"
      aria-label="Scroll to top"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </div>