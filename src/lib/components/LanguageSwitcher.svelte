<script>
    import { locale } from 'svelte-i18n';
    
    const languages = [
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
      { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
    ];
    
    function changeLocale(newLocale) {
      locale.set(newLocale);
      localStorage.setItem('preferredLanguage', newLocale);
    }
  </script>
  
  <div class="language-switcher">
    {#each languages as lang}
      <button 
        class="flex items-center space-x-1 p-2 rounded-full {$locale === lang.code ? 'bg-[#dcb660]/20' : ''}"
        on:click={() => changeLocale(lang.code)}
        aria-label="Switch to {lang.name}"
      >
        <span class="text-lg">{lang.flag}</span>
      </button>
    {/each}
  </div>