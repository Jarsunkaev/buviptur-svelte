<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { locale, t } from 'svelte-i18n';
  import { languages, setLanguage } from '$lib/i18n/index.js';

  // State for header
  let isMenuOpen = false;
  let isScrolled = false;
  let isHeaderVisible = true;
  let currentScrollY = 0;
  let lastScrollY = 0;

  // Get current language
  $: currentLang = $locale || 'en';

  // Simple language switching function
  function switchLanguage(newLang) {
    setLanguage(newLang);
  }

  // Toggle mobile menu function with improved body scroll lock
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      // Store current scroll position
      currentScrollY = window.scrollY;

      // Apply scroll lock styles
      document.documentElement.classList.add('menu-open');
      document.body.classList.add('menu-open');
      document.body.style.top = `-${currentScrollY}px`;

    } else {
      // Remove scroll lock
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.top = '';

      // Restore scroll position
      window.scrollTo(0, currentScrollY);
    }
  }

  // Close mobile menu
  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;

      // Remove scroll lock
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.top = '';

      // Restore scroll position
      window.scrollTo(0, currentScrollY);
    }
  }

  // Handle visual viewport changes for mobile
  function handleViewportChange() {
    if (window.visualViewport && window.visualViewport.height < window.innerHeight * 0.75) {
      closeMenu();
    }
  }

  // Simple scroll handler
  function handleScroll() {
    // Get scroll position from multiple sources for compatibility
    const scrollY = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    
      // Removed debug scroll position display
    
    // Update scrolled state - always show header, just change style
    const newIsScrolled = scrollY > 50;
    if (newIsScrolled !== isScrolled) {
      isScrolled = newIsScrolled;
      console.log('Scroll state changed:', { scrollY, isScrolled });
    }
    
    // Always keep header visible
    isHeaderVisible = true;
    
    lastScrollY = scrollY <= 0 ? 0 : scrollY; // Prevent negative scroll values
  }

  onMount(() => {
    if (!browser) return;
    
    console.log('Header mounted - adding scroll listeners');
    
    // Initial scroll state
    handleScroll();
    
    // Add scroll listener with passive: true for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add wheel and touchmove listeners as fallbacks
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    
    // Handle mobile viewport changes
    if ('visualViewport' in window) {
      window.visualViewport.addEventListener('resize', handleViewportChange, { passive: true });
    }
    
    // Handle page navigation
    const unsubscribe = page.subscribe(() => {
      closeMenu();
      isHeaderVisible = true;
      // Small delay to ensure DOM is updated
      setTimeout(handleScroll, 50);
    });
    
    // Debug info
    console.log('Scroll event listeners added');
    
    // Cleanup
    return () => {
      console.log('Header unmounting - removing listeners');
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      
      if ('visualViewport' in window) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      }
      
      unsubscribe();
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
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
  class:scrolled={isScrolled}
  aria-label="Main navigation"
  style="background-color: {isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'}; 
         backdrop-filter: {isScrolled ? 'blur(12px)' : 'none'}; 
         border-bottom: {isScrolled ? '1px solid rgba(0, 0, 0, 0.08)' : 'none'};
         transform: {!isHeaderVisible ? 'translateY(-100%)' : 'translateY(0)'};"
  data-scrolled={isScrolled}
  data-visible={isHeaderVisible}
  class:hidden={!isMenuOpen}
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
          <a
            href={item.href}
            class="nav-link"
            class:active={isActivePath(item.href)}
          >
            <span class="nav-link-text">{item.label}</span>
          </a>
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
      <div class="w-full h-full flex flex-col items-center justify-center overflow-hidden">
        <nav class="flex flex-col items-center space-y-8 w-full max-w-md mx-auto px-4">
          {#each navItems as item, index}
            <div class="relative w-full text-center">
              <a
                href={item.href}
                in:fly={{ y: 20, delay: index * 75, duration: 200 }}
                class="nav-link text-2xl font-medium text-white hover:text-[#dcb660] transition-colors duration-300 inline-block py-3 px-4
                       {isActivePath(item.href) ? 'active-link' : ''}"
                on:click={closeMenu}
              >
                {item.label}
              </a>
            </div>
          {/each}

          <div class="flex justify-center space-x-6 pt-4">
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
  /* Header base styles */
  header {
    padding: 1.5rem 0;
    height: 90px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease-out;
    will-change: transform, background-color, backdrop-filter, border-bottom;
    backface-visibility: hidden;
    perspective: 1000px;
    transform: translate3d(0, 0, 0);
  }

  /* Scrolled state - light background */
  header.scrolled {
    padding: 1rem 0;
    height: 70px;
  }

  /* Hidden state */
  header.hidden {
    transform: translate3d(0, -100%, 0);
  }

  /* Logo sizing */
  .logo-img {
    height: 70px;
    transition: height 0.3s ease-out;
  }

  header.scrolled .logo-img {
    height: 50px;
  }

  /* Navigation link styles - white by default */
  .nav-link {
    position: relative;
    padding: 0.75rem 1rem;
    color: white; /* Default text color over transparent/dark background */
    font-weight: 500;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.9;
    display: inline-block;
    text-decoration: none;
  }

  /* Scrolled state - dark text */
  header.scrolled .nav-link {
    color: #113946; /* Changed to dark color for contrast on white background */
    text-shadow: none;
  }

  .nav-link.active {
    color: #dcb660;
    font-weight: 600;
    opacity: 1;
  }

  .nav-link.active::after {
    transform: scaleX(1);
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

  /* Mobile menu button - white by default */
  .mobile-menu-btn {
    color: white; /* Default icon color over transparent/dark background */
  }

  /* Scrolled state - dark color */
  header.scrolled .mobile-menu-btn {
    color: #113946; /* Changed to dark color for contrast on white background */
  }

  /* Language buttons - white by default */
  .language-btn {
    color: white; /* Default icon color over transparent/dark background */
  }

  /* Scrolled state - dark color */
  header.scrolled .language-btn {
    color: #113946; /* Changed to dark color for contrast on white background */
  }

  /* Smooth scrolling for the whole app */
  :global(html) {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }

  /* CRITICAL: Better mobile menu scroll lock */
  :global(html.menu-open),
  :global(body.menu-open) {
    overflow: hidden !important;
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
    -webkit-overflow-scrolling: auto !important;
  }

  /* Mobile menu improvements */
  #mobile-menu-overlay {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    /* Prevent scrolling issues */
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
    padding: 0.75rem 0;
    -webkit-tap-highlight-color: transparent;
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
</style>