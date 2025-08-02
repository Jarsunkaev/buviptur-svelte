<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { t } from 'svelte-i18n';
  
  let showBackToTop = false;
  let scrollPosition = 0;
  let scrollTimeout;
  
  // Throttle scroll event
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
        
        // Show button when scrolled down more than 300px
        showBackToTop = scrollPosition > 300;
      }
    });
  }
  
  const currentYear = new Date().getFullYear();
  
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
  
  function scrollToTop() {
    if (!browser) return;
    
    try {
      // Try modern smooth scrolling first
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
  
  // Alternative function for testing
  function forceScrollToTop() {
    if (!browser) return;
    
    // Force immediate scroll
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollY = 0;
    
    // Then try smooth scroll
    setTimeout(() => {
      try {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } catch (e) {
        console.log('Smooth scroll not supported');
      }
    }, 10);
  }
</script>

<footer class="bg-teal-900 text-white pt-12 pb-6 w-full mt-auto relative">
  <div class="container mx-auto px-6 relative">
    <!-- Scroll to top button positioned on the right -->
    <div class="fixed bottom-8 right-8 z-50 transition-opacity duration-300 ease-in-out {showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}">
      <button 
        on:click={forceScrollToTop}
        class="w-14 h-14 bg-[#dcb660] hover:bg-[#c9a64f] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb660] cursor-pointer transform hover:-translate-y-1"
        aria-label={$t('common.backToTop') || 'Back to top'}
        title={$t('common.backToTop') || 'Back to top'}
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div class="space-y-4">
        <h3 class="text-2xl font-bold mb-6 text-[#dcb660]">{$t('footer.about.title')}</h3>
        <p class="text-gray-300 leading-relaxed">{$t('footer.about.description')}</p>
        <div class="flex space-x-4 mt-6">
          <a href="https://www.facebook.com/share/1ELzg9gYcQ/?mibextid=wwXIfr" class="w-10 h-10 bg-[#dcb660]/20 rounded-full flex items-center justify-center text-[#dcb660] hover:bg-[#dcb660] hover:text-white transition-colors" aria-label={$t('footer.social.facebookAria')}>
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/buviptur_travel?igsh=eG9tMWt2eTk0Mm8w&utm_source=qr" class="w-10 h-10 bg-[#dcb660]/20 rounded-full flex items-center justify-center text-[#dcb660] hover:bg-[#dcb660] hover:text-white transition-colors" aria-label={$t('footer.social.instagramAria')}>
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      
      <div class="space-y-4">
        <h3 class="text-2xl font-bold mb-6 text-[#dcb660]">{$t('footer.quickLinks.title')}</h3>
        <ul class="space-y-3">
          <li><a href="/tours" class="text-gray-300 hover:text-[#dcb660] transition duration-300 flex items-center"><i class="fas fa-chevron-right mr-2 text-[#dcb660] text-sm"></i> {$t('nav.tours')}</a></li>
          <li><a href="/about" class="text-gray-300 hover:text-[#dcb660] transition duration-300 flex items-center"><i class="fas fa-chevron-right mr-2 text-[#dcb660] text-sm"></i> {$t('nav.about')}</a></li>
          <li><a href="/services" class="text-gray-300 hover:text-[#dcb660] transition duration-300 flex items-center"><i class="fas fa-chevron-right mr-2 text-[#dcb660] text-sm"></i> {$t('nav.services')}</a></li>
          <li><a href="/contact" class="text-gray-300 hover:text-[#dcb660] transition duration-300 flex items-center"><i class="fas fa-chevron-right mr-2 text-[#dcb660] text-sm"></i> {$t('nav.contact')}</a></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-2xl font-bold mb-6 text-[#dcb660]">{$t('footer.contact.title')}</h3>
        <table class="border-collapse">
          <tbody>
            <tr>
              <td class="align-top pr-3"><i class="fas fa-map-marker-alt text-[#dcb660]"></i></td>
              <td class="pb-3">{$t('footer.contact.address')}</td>
            </tr>
            <tr>
              <td class="align-middle pr-3"><i class="fas fa-phone text-[#dcb660]"></i></td>
              <td class="pb-3">
                <a href="tel:+36707343444" class="hover:text-[#dcb660] transition-colors">{$t('footer.contact.phone')}</a>
              </td>
            </tr>
            <tr>
              <td class="align-middle pr-3"><i class="fas fa-envelope text-[#dcb660]"></i></td>
              <td class="pb-3">
                <a href="mailto:info@buviptur.com" class="hover:text-[#dcb660] transition-colors">{$t('footer.contact.email')}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center w-full">
      <p class="text-gray-400 mb-4 md:mb-0">&copy; {currentYear} <span class="text-[#dcb660]">BuVipTur</span>. {$t('footer.copyright')}</p>
      <div class="flex space-x-6">
        <a href="/privacy" class="text-gray-400 hover:text-[#dcb660] transition-colors">{$t('footer.privacyPolicy')}</a>
      </div>
    </div>
  </div>
</footer>