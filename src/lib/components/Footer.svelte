<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  const currentYear = new Date().getFullYear();
  
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
    <div class="absolute -top-6 right-6 z-10">
      <button 
        on:click={forceScrollToTop}
        class="w-12 h-12 bg-[#dcb660] hover:bg-[#c9a64f] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb660] cursor-pointer"
        aria-label="Back to top"
        title="Back to top"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div class="space-y-4">
        <h3 class="text-2xl font-bold mb-6 text-[#dcb660]">About BuVipTur</h3>
        <p class="text-gray-300 leading-relaxed">Your trusted partner in creating unforgettable travel experiences since 2010. We specialize in unique local tours that show you the authentic side of every destination.</p>
        <div class="flex space-x-4 mt-6">
          <a href="https://facebook.com" class="w-10 h-10 bg-[#dcb660]/20 rounded-full flex items-center justify-center text-[#dcb660] hover:bg-[#dcb660] hover:text-white transition-colors" aria-label="Visit our Facebook page">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" class="w-10 h-10 bg-[#dcb660]/20 rounded-full flex items-center justify-center text-[#dcb660] hover:bg-[#dcb660] hover:text-white transition-colors" aria-label="Visit our Instagram page">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      
      <div class="space-y-4">
        <h3 class="text-2xl font-bold mb-6 text-[#dcb660]">Quick Links</h3>
        <ul class="space-y-3">
          <li><a href="/tours" class="text-gray-300 hover:text-[#dcb660] transition duration-300 flex items-center"><i class="fas fa-chevron-right mr-2 text-[#dcb660] text-sm"></i> Tours</a></li>
          <li><a href="/about" class="text-gray-300 hover:text-[#dcb660] transition duration-300 flex items-center"><i class="fas fa-chevron-right mr-2 text-[#dcb660] text-sm"></i> About Us</a></li>
          <li><a href="/services" class="text-gray-300 hover:text-[#dcb660] transition duration-300 flex items-center"><i class="fas fa-chevron-right mr-2 text-[#dcb660] text-sm"></i> Services</a></li>
          <li><a href="/contact" class="text-gray-300 hover:text-[#dcb660] transition duration-300 flex items-center"><i class="fas fa-chevron-right mr-2 text-[#dcb660] text-sm"></i> Contact</a></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-2xl font-bold mb-6 text-[#dcb660]">Contact Info</h3>
        <table class="border-collapse">
          <tbody>
            <tr>
              <td class="align-top pr-3"><i class="fas fa-map-marker-alt text-[#dcb660]"></i></td>
              <td class="pb-3">Budapest, Hungary</td>
            </tr>
            <tr>
              <td class="align-middle pr-3"><i class="fas fa-phone text-[#dcb660]"></i></td>
              <td class="pb-3">
                <a href="tel:+36707343444" class="hover:text-[#dcb660] transition-colors">+36 70 734 3444</a>
              </td>
            </tr>
            <tr>
              <td class="align-middle pr-3"><i class="fas fa-envelope text-[#dcb660]"></i></td>
              <td class="pb-3">
                <a href="mailto:info@buviptur.com" class="hover:text-[#dcb660] transition-colors">info@buviptur.com</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center w-full">
      <p class="text-gray-400 mb-4 md:mb-0">&copy; {currentYear} <span class="text-[#dcb660]">BuVipTur</span>. All rights reserved.</p>
      <div class="flex space-x-6">
        <a href="/privacy" class="text-gray-400 hover:text-[#dcb660] transition-colors">Privacy Policy</a>
      </div>
    </div>
  </div>
</footer>