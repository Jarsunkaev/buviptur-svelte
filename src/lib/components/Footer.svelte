<script>
  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-teal-900 text-white py-16">
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
      
      <div class="space-y-4">
        <h3 class="text-2xl font-bold mb-6 text-[#dcb660]">Contact Info</h3>
        <ul class="space-y-3 text-gray-300">
          <li class="flex items-start"><i class="fas fa-map-marker-alt mt-1 mr-3 text-[#dcb660]"></i> <span>Váci Street 12, Budapest, Hungary</span></li>
          <li class="flex items-center"><i class="fas fa-phone mr-3 text-[#dcb660]"></i> <span>+36 1 234 5678</span></li>
          <li class="flex items-center"><i class="fas fa-envelope mr-3 text-[#dcb660]"></i> <span>info@buviptur.com</span></li>
          <li class="flex items-center"><i class="fas fa-clock mr-3 text-[#dcb660]"></i> <span>Mon-Fri: 9AM - 6PM</span></li>
        </ul>
      </div>
    </div>
    
    <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p class="text-gray-400 mb-4 md:mb-0">&copy; {currentYear} <span class="text-[#dcb660]">BuVipTur</span>. All rights reserved.</p>
      <div class="flex space-x-6">
        <a href="/privacy-policy" class="text-gray-400 hover:text-[#dcb660] transition-colors">Privacy Policy</a>
        <a href="/terms-of-service" class="text-gray-400 hover:text-[#dcb660] transition-colors">Terms of Service</a>
        <a href="/sitemap" class="text-gray-400 hover:text-[#dcb660] transition-colors">Sitemap</a>
      </div>
    </div>
  </div>
</footer>