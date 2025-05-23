<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';

  // State for header
  let isMenuOpen = false;
  let isScrolled = false;
  const scrollThreshold = 50; // Pixels to scroll before changing header state

  // Toggle mobile menu function
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }

  // Close mobile menu
  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  onMount(() => {
    // Header scroll effect
    const handleScroll = () => {
      isScrolled = window.scrollY > scrollThreshold;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Close menu on navigation
    const unsubscribe = page.subscribe(closeMenu);

    // Initialize header state on page load
    handleScroll();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
      document.body.style.overflow = '';
    };
  });

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/tours', label: 'Tours' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Get Offer' }
  ];
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</svelte:head>

<header
  class="fixed top-0 left-0 right-0 z-30 transition-all duration-500 ease-out
         {isScrolled
           ? 'h-20 bg-white shadow-md flex items-center'
           : 'h-28 bg-transparent flex items-start pt-2'}"
>
  <div class="container mx-auto px-4 sm:px-6 h-full flex items-center">
    <nav class="flex items-center justify-between w-full h-full">
      <a href="/" class="flex items-center z-50" aria-label="BuVipTur Home">
        <img
          src="/logo.PNG"
          alt="BuVipTur Logo"
          class="rounded-lg transition-all duration-500 ease-out
                 {isScrolled ? 'h-14 sm:h-16' : 'h-20 sm:h-24'}"
        />
      </a>

      <div class="hidden lg:flex items-center space-x-10">
        {#each navItems as item}
           <a
             href={item.href}
             class="nav-link text-xl font-medium transition-all duration-300 relative
                    {isScrolled ? 'text-gray-800 hover:text-[#dcb660]' : 'text-white hover:text-[#dcb660]'}
                    {$page.url.pathname === item.href ? 'active-link' : ''}
                    hover:-translate-y-0.5"
           >
             {item.label}
           </a>
         {/each}
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
      role="dialog"
      aria-modal="true"
      id="mobile-menu-overlay"
    >
      <div class="w-full h-full flex flex-col items-center justify-center">
        <nav class="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto px-4">
          {#each navItems as item, index}
            <a
              href={item.href}
              class="nav-link text-2xl font-medium text-white hover:text-[#dcb660] transition-colors duration-300 animate-fadeIn text-center py-3 
                     {$page.url.pathname === item.href ? 'active-link' : ''}"
              style="animation-delay: {(index + 1) * 0.1}s"
              on:click={closeMenu}
            >
              {item.label}
            </a>
          {/each}
        </nav>
      </div>
    </div>
  {/if}
</header>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .nav-link {
    position: relative;
    padding: 0.5rem 0; 
    overflow: hidden;
  }

  .nav-link::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #dcb660, #f0c674, #dcb660);
    transition: transform 0.3s ease-out;
  }

  .nav-link:hover::before {
    transform: translateX(100%);
  }

  .active-link {
    color: #dcb660 !important;
    font-weight: 600;
  }

  .active-link::before {
    transform: translateX(100%); 
  }

  .animate-fadeIn {
    opacity: 0;
    animation: fadeIn 0.4s ease-out forwards;
  }

  /* Improve focus visibility for accessibility */
  .nav-link:focus-visible {
    outline: 2px solid #dcb660;
    outline-offset: 2px;
    border-radius: 2px;
  }
  
  button:focus-visible {
    outline: 2px solid #dcb660;
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* MODIFICATION: Added CSS for mobile menu links */
  #mobile-menu-overlay .nav-link {
    display: inline-block;  
    /* py-3 class provides vertical padding, text-center remains from HTML */
    /* The parent <nav> is already using 'items-center', which will center these inline-block links */
  }
</style>