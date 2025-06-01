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
  const scrollThreshold = 50;
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

  onMount(() => {
    // Optimized scroll handler with sticky header logic
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // Only update if scroll changed significantly
          if (Math.abs(scrollY - lastScrollY) > 5) {
            // Update scrolled state
            isScrolled = scrollY > scrollThreshold;
            
            // Sticky header logic - hide when scrolling down, show when scrolling up
            if (scrollY > lastScrollY && scrollY > 100) {
              // Scrolling down - hide header
              isHeaderVisible = false;
            } else if (scrollY < lastScrollY || scrollY <= scrollThreshold) {
              // Scrolling up or near top - show header
              isHeaderVisible = true;
            }
            
            lastScrollY = scrollY;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle visual viewport changes for mobile
    if (browser && 'visualViewport' in window) {
      window.visualViewport.addEventListener('resize', handleViewportChange, { passive: true });
    }

    // Close menu on navigation with header show
    const unsubscribe = page.subscribe(() => {
      closeMenu();
      // Always show header on page navigation
      isHeaderVisible = true;
    });

    // Initialize header state
    handleScroll();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      }
      
      // Reset styles on unmount
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
  class="fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-out flex items-start pt-2 lg:pt-3 h-auto min-h-[72px] lg:min-h-[88px]"
  class:bg-white={isScrolled}
  class:shadow-md={isScrolled}
  class:-translate-y-full={!isHeaderVisible && !isMenuOpen}
  style="background-color: {isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'}; backdrop-filter: {isScrolled ? 'blur(8px)' : 'none'}; transform: translate3d(0, {!isHeaderVisible && !isMenuOpen ? '-100%' : '0'}, 0);"
>
  <div class="container mx-auto px-4 sm:px-6 h-full flex items-center py-1">
    <nav class="flex items-center justify-between w-full h-full">
      <a href="/" class="flex items-center z-50" aria-label="BuVipTur Home">
        <div class="relative">
          <img
            src="/logo.PNG"
            alt="BuVipTur Logo"
            class="rounded-lg transition-all duration-300 ease-out h-16 sm:h-16 lg:h-20 object-contain"
            class:scale-110={!isScrolled}
            class:lg:scale-110={!isScrolled}
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
              class="w-8 h-8 flex items-center justify-center rounded-md overflow-hidden transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb660] {currentLang === lang.code ? 'ring-2 ring-[#dcb660] scale-110' : ''}"
              aria-label={`Switch to ${lang.name}`}
              title={lang.name}
            >
              {@html lang.flag}
            </button>
          {/each}
        </div>
      </div>

      <button
        class="lg:hidden z-50 p-2 -mr-2 transition-colors duration-300 {isScrolled ? 'text-gray-800' : 'text-white'}"
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
  /* Navigation link styles */
  .nav-link {
    position: relative;
    padding: 1rem 1.25rem;
    display: inline-block;
    text-decoration: none;
  }
  
  .nav-link-text {
    color: white !important;
    font-size: 1.25rem;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
    z-index: 1;
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0.75rem;
    left: 1.25rem;
    right: 1.25rem;
    height: 2px;
    background-color: #dcb660;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  .nav-link:hover .nav-link-text,
  .nav-link.active .nav-link-text {
    color: #dcb660 !important;
  }
  
  .nav-link:hover::after,
  .nav-link.active::after {
    transform: scaleX(1);
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

  /* Improve performance with hardware acceleration */
  header {
    will-change: transform, background-color;
    backface-visibility: hidden;
    perspective: 1000px;
    /* Ensure smooth sticky behavior */
    transform: translate3d(0, 0, 0);
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