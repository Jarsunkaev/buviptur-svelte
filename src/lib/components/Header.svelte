<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { locale, t } from 'svelte-i18n';
  import { languages, setLanguage } from '$lib/i18n/index.js';

  // Simplified state for header
  let isMenuOpen = false;
  let isScrolled = false;
  let currentScrollY = 0;

  // Get current language
  $: currentLang = $locale || 'en';

  // Simple language switching function
  function switchLanguage(newLang) {
    setLanguage(newLang);
  }

  // Optimized mobile menu toggle with better scroll lock
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      // Store current scroll position
      currentScrollY = window.scrollY;
      
      // Apply scroll lock
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Remove scroll lock
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      window.scrollTo(0, currentScrollY);
    }
  }

  // Close mobile menu
  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      
      // Remove scroll lock
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      window.scrollTo(0, currentScrollY);
    }
  }

  // Simple and reliable scroll handler
  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const newIsScrolled = scrollY > 10; // Lower threshold for more responsive behavior
    
    if (newIsScrolled !== isScrolled) {
      isScrolled = newIsScrolled;
    }
  }

  onMount(() => {
    if (!browser) return;
    
    // Initial scroll state
    handleScroll();
    
    // Add scroll listener - simple and reliable
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle page navigation
    const unsubscribe = page.subscribe(() => {
      closeMenu();
      // Small delay to ensure DOM is updated
      setTimeout(handleScroll, 50);
    });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
      
      // Clean up any remaining scroll lock
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  });

  // Navigation items with translations - simple paths
  $: navItems = [
    { href: '/', label: $t('nav.home') },
    { href: '/tours', label: $t('nav.tours') },
    { href: '/services', label: $t('nav.services') },
    { href: '/about', label: $t('nav.about') },
    { href: '/contact', label: $t('nav.contact') }
  ];
  
  // Handle navigation with scroll to top
  function navigate(href) {
    if (browser) {
      // Close mobile menu if open
      if (isMenuOpen) {
        closeMenu();
      }
      // Use SvelteKit's goto for programmatic navigation
      goto(href);
    }
  }

  // Helper function to check if current path matches nav item
  function isActivePath(href) {
    const currentPath = $page.url.pathname;
    // Exact match for home page
    if (href === '/') {
      return currentPath === '/';
    }
    // For other pages, check if current path starts with the href
    return currentPath.startsWith(href);
  }
  

</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</svelte:head>

<header
  class="fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-out"
  class:header-transparent={!isScrolled}
  class:header-scrolled={isScrolled}
  aria-label="Main navigation"
  data-scrolled={isScrolled}

>
  <div class="container mx-auto px-4 sm:px-6 h-full flex items-center">
    <nav class="flex items-center justify-between w-full h-full">
      <a href="/" class="flex items-center z-50 transition-all duration-300 ease-out" aria-label="BuVipTur Home">
        <div class="relative">
          <img
            src="/logo.PNG"
            alt="BuVipTur Logo"
            class="logo-img rounded-lg transition-all duration-300 ease-out object-contain"
          />
        </div>
      </a>

      <div class="hidden lg:flex items-center space-x-10">
        {#each navItems as item}
          <button
            class="nav-link"
            class:active={isActivePath(item.href)}
            on:click|preventDefault|stopPropagation={() => navigate(item.href)}
            on:keydown|preventDefault|stopPropagation={(e) => e.key === 'Enter' && navigate(item.href)}
            aria-current={isActivePath(item.href) ? 'page' : undefined}
          >
            <span class="nav-link-text">{item.label}</span>
          </button>
        {/each}

        <div class="flex items-center space-x-2 ml-4">
          {#each languages as lang}
            <button
              on:click={() => switchLanguage(lang.code)}
              class="language-btn w-8 h-8 flex items-center justify-center rounded-md overflow-hidden transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb660] {currentLang === lang.code ? 'ring-2 ring-[#dcb660] scale-110' : ''}"
              aria-label={`Switch to ${lang.name}`}
              title={lang.name}
            >
              {@html lang.flag}
            </button>
          {/each}
        </div>
      </div>

      <button
        class="mobile-menu-btn lg:hidden z-50 p-2 -mr-2 transition-colors duration-300"
        on:click={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
      >
        <i class="fas {isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl w-6 h-6"></i>
      </button>
    </nav>
  </div>

  {#if isMenuOpen}
    <div
      transition:fade={{ duration: 300 }}
      class="fixed inset-0 bg-teal-900/95 backdrop-blur-lg z-40 lg:hidden flex items-center justify-center"
      style="height: 100vh; height: calc(var(--vh, 1vh) * 100); overscroll-behavior: none;"
      role="dialog"
      aria-modal="true"
      id="mobile-menu-overlay"
    >
      <!-- Close button for mobile menu -->
      <button
        class="absolute top-4 right-4 text-white text-3xl p-2 rounded-full bg-black/30 hover:bg-black/60 transition-all duration-300 focus:outline-none z-50 lg:hidden"
        aria-label="Close menu"
        on:click={closeMenu}
      >
        <i class="fas fa-times"></i>
      </button>
      <div class="w-full h-full flex flex-col items-center justify-center overflow-hidden">
        <nav class="flex flex-col items-center space-y-4 w-full max-w-md mx-auto px-4">
          {#each navItems as item, index}
            <div class="relative w-full text-center">
              <button
                class="nav-link bg-transparent border-none text-current p-0 cursor-pointer"
                class:active={isActivePath(item.href)}
                on:click|preventDefault|stopPropagation={() => navigate(item.href)}
                on:keydown|preventDefault|stopPropagation={(e) => e.key === 'Enter' && navigate(item.href)}
                aria-current={isActivePath(item.href) ? 'page' : undefined}
              >
                {item.label}
              </button>
            </div>
          {/each}

          <div class="flex justify-center space-x-6 pt-2">
            {#each languages as lang, index}
              <button
                in:fly={{ y: 20, delay: (navItems.length + index) * 75, duration: 200 }}
                on:click={() => {
                  switchLanguage(lang.code);
                  closeMenu();
                }}
                class="w-12 h-12 flex items-center justify-center rounded-md overflow-hidden transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb660] {currentLang === lang.code ? 'ring-2 ring-[#dcb660] scale-110 bg-white/20' : ''}"
                aria-label={`Switch to ${lang.name}`}
                title={lang.name}
              >
                {@html lang.flag}
              </button>
            {/each}
          </div>
        </nav>
      </div>
    </div>
  {/if}
</header>

<style>
  /* Header base styles with proper padding */
  :global(header) {
    background-color: transparent;
    backdrop-filter: none;
    border-bottom: none;
    padding: 1.5rem 0;
    padding-top: 3rem;
    height: 100px;
    display: flex;
    align-items: center;
    box-shadow: none;
    transition:
      background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      padding 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      border-bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: background-color, height, padding, box-shadow, border-bottom;
    transform: translateZ(0);
  }

  /* Transparent state (not scrolled) */
  :global(header.header-transparent) {
    background-color: transparent;
    backdrop-filter: none;
    border-bottom: none;
  }

  /* Scrolled state - more compact header with smooth transitions */
  :global(header.header-scrolled) {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    padding: 1rem 0;
    padding-top: 1rem;
    height: 70px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  /* Logo sizing with optimized transitions */
  .logo-img {
    height: 100px;
    transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: height;
  }
  @media (max-width: 640px) {
    .logo-img {
      height: 60px;
    }
    :global(header.header-scrolled .logo-img) {
      height: 40px;
    }
  }

  :global(header.header-scrolled .logo-img) {
    height: 50px;
  }

  /* Navigation link styles - white by default */
  .nav-link {
    position: relative;
    padding: 0.75rem 1rem;
    color: white;
    font-weight: 500;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.9;
    display: inline-block;
    text-decoration: none;
    will-change: color, opacity;
  }

  /* Scrolled state - dark text */
  :global(header.header-scrolled .nav-link) {
    color: #113946;
    text-shadow: none;
  }

  .nav-link.active {
    color: #dcb660;
    font-weight: 600;
    opacity: 1;
  }

  .nav-link.active::after {
    transform: translateX(-50%) scaleX(1);
    opacity: 1;
  }

  .nav-link-text {
    font-size: 1.25rem;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
    z-index: 1;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 24px;
    height: 2px;
    background-color: #dcb660;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    border-radius: 2px;
  }

  .nav-link:hover .nav-link-text,
  .nav-link.active .nav-link-text {
    color: #dcb660;
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    transform: translateX(-50%) scaleX(1);
    opacity: 1;
  }

  /* Mobile menu button - changes color when header is scrolled */
  .mobile-menu-btn {
    color: white;
    transition: all 0.3s ease;
  }

  :global(header.header-scrolled .mobile-menu-btn) {
    color: #113946 !important;
  }

  .mobile-menu-btn:hover {
    color: #dcb660;
  }

  /* Language buttons - white by default */
  .language-btn {
    color: white;
  }

  /* Scrolled state - dark color */
  :global(header.header-scrolled .language-btn) {
    color: #113946;
  }

  /* Smooth scrolling for the whole app */
  :global(html) {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }

  /* Mobile menu improvements */
  #mobile-menu-overlay {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overscroll-behavior: none;
    -webkit-overflow-scrolling: auto;
  }

  /* Better focus visibility */
  .nav-link:focus-visible,
  button:focus-visible {
    outline: 2px solid #dcb660;
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* Mobile menu links optimization */
  #mobile-menu-overlay .nav-link {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    -webkit-tap-highlight-color: transparent;
    color: white !important;
  }

  /* Language switcher visual feedback */
  button[aria-label*="Switch"] {
    position: relative;
  }

  button[aria-label*="Switch"]:hover {
    transform: scale(1.1);
  }

  button[aria-label*="Switch"]:active {
    transform: scale(0.95);
  }

  /* Performance optimizations */
  @media (prefers-reduced-motion: reduce) {
    /* Keep essential header transitions for functionality */
    header {
      transition: background-color 0.1s ease, backdrop-filter 0.1s ease, border-bottom 0.1s ease !important;
    }
    
    /* Disable decorative animations */
    .logo-img,
    .nav-link,
    .mobile-menu-btn,
    .language-btn {
      transition: none !important;
    }
  }
</style>