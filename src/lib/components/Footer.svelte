<script>
  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-teal-900 text-white pt-12 pb-6 w-full mt-auto">
  <div class="container mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div class="space-y-4">
        <h3 class="text-2xl font-bold mb-6 text-[#dcb660]">About BuVipTur</h3>
        <p class="text-gray-300 leading-relaxed">Your trusted partner in creating unforgettable travel experiences since 2010. We specialize in unique local tours that show you the authentic side of every destination.</p>
        <div class="flex space-x-4 mt-6">
          <a href="https://facebook.com" class="w-10 h-10 bg-[#dcb660]/20 rounded-full flex items-center justify-center text-[#dcb660] hover:bg-[#dcb660] hover:text-white transition-colors" aria-label="Visit our Facebook page">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" class="w-10 h-10 bg-[#dcb660]/20 rounded-full flex items-center justify-center text-[#dcb660] hover:bg-[#dcb660] hover:text-white transition-colors" aria-label="Visit our Twitter page">
            <i class="fab fa-twitter"></i>
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


