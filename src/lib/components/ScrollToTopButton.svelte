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
  
  {#if showButton}
    <button 
      on:click={scrollToTop}
      class="fixed bottom-6 right-6 bg-teal-900 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-teal-800 transition-all hover:scale-110 z-50"
      aria-label="Scroll to top"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  {/if}