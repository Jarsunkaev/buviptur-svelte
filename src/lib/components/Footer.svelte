<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { t } from 'svelte-i18n';
  
  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-teal-900 text-white pt-12 pb-6 w-full mt-auto relative">
  <div class="container mx-auto px-6 relative">
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
          <li><a href="/impresszum" class="text-gray-300 hover:text-[#dcb660] transition duration-300 flex items-center"><i class="fas fa-chevron-right mr-2 text-[#dcb660] text-sm"></i> {$t('footer.quickLinks.impresszum')}</a></li>
          <li><a href="/aszf" class="text-gray-300 hover:text-[#dcb660] transition duration-300 flex items-center"><i class="fas fa-chevron-right mr-2 text-[#dcb660] text-sm"></i> {$t('footer.quickLinks.terms')}</a></li>
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