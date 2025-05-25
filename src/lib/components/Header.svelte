<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';

  // Language switching
  const languages = [
    { 
      code: 'hu', 
      name: 'Magyar', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="#fff" d="M1 11H31V21H1z"></path><path d="M5,4H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" fill="#be373c"></path><path d="M5,20H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" transform="rotate(180 16 24)" fill="#4f6f52"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>'
    },
    { 
      code: 'en', 
      name: 'English', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect><path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff"></path><path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932"></path><path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932"></path><path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff"></path><rect x="13" y="4" width="6" height="24" fill="#fff"></rect><rect x="1" y="13" width="30" height="6" fill="#fff"></rect><rect x="14" y="4" width="4" height="24" fill="#b92932"></rect><rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932"></rect><path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932"></path><path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z" fill="#b92932"></path></svg>'
    },
    { 
      code: 'tr', 
      name: 'Türkçe', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#d12d24"></rect><path fill="#fff" d="M19.807 16L21 14.358 19.069 14.985 17.876 13.342 17.876 15.373 15.945 16 17.876 16.627 17.876 18.658 19.069 17.015 21 17.642 19.807 16z"></path><path d="M15.953,19.325c-1.837,1.65-4.663,1.5-6.314-.337s-1.5-4.663,.337-6.314c1.837-1.65,4.663-1.5,6.314,.337-.442-.699-1.035-1.292-1.734-1.734-2.608-1.65-6.06-.874-7.711,1.734-1.65,2.608-.874,6.06,1.734,7.711,2.608,1.65,6.06,.874,7.711-1.734-.106,.118-.219,.231-.337,.337Z" fill="#fff"></path></svg>'
    }
  ];

  function switchLanguage(lang) {
    if (browser) {
      const currentPath = $page.url.pathname;
      const newPath = `/${lang}${currentPath.substring(3)}`;
      goto(newPath);
    }
  }

  // State for header
  let isMenuOpen = false;
  let isScrolled = false;
  const scrollThreshold = 50; // Pixels to scroll before changing header state

  // Toggle mobile menu function
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      // Apply styles to prevent scrolling
      document.documentElement.classList.add('menu-open');
      document.body.classList.add('menu-open');
      // Restore scroll position after styles are applied
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 0);
    } else {
      // Remove the menu-open class to re-enable scrolling
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      // Small delay to ensure smooth transition
      setTimeout(() => {
        // Force a reflow to ensure styles are applied
        document.body.offsetHeight;
      }, 10);
    }
  }

  // Close mobile menu
  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      // Remove the menu-open class to re-enable scrolling
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      // Small delay to ensure smooth transition
      setTimeout(() => {
        // Force a reflow to ensure styles are applied
        document.body.offsetHeight;
      }, 10);
    }
  }

  onMount(() => {
    // Use requestAnimationFrame for smoother scroll handling
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          isScrolled = window.scrollY > scrollThreshold;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Close menu on navigation
    const unsubscribe = page.subscribe(() => {
      closeMenu();
      // Small delay to ensure smooth navigation
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        });
      }, 50);
    });

    // Initialize header state on page load
    handleScroll();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
      // Reset styles on unmount
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.position = '';
      document.body.style.position = '';
      document.body.style.width = '';
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
  class="fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-out flex items-start pt-2 lg:pt-3 h-auto min-h-[72px] lg:min-h-[88px]"
  class:bg-white={isScrolled}
  class:shadow-md={isScrolled}
  style="background-color: {isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'}; backdrop-filter: {isScrolled ? 'blur(8px)' : 'none'}"
>
  <div class="container mx-auto px-4 sm:px-6 h-full flex items-center py-1">
    <nav class="flex items-center justify-between w-full h-full">
      <a href="/" class="flex items-center z-50" aria-label="BuVipTur Home">
        <img
          src="/logo.PNG"
          alt="BuVipTur Logo"
          class="rounded-lg transition-all duration-300 ease-out h-12 sm:h-14 lg:h-16"
          class:scale-125={!isScrolled}
          class:lg:scale-125={!isScrolled}
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
        
        <div class="flex items-center space-x-2 ml-4">
          {#each languages as lang}
            <button
              on:click={() => switchLanguage(lang.code)}
              class="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb660]"
              aria-label={`Switch to ${lang.name}`}
              title={lang.name}
            >
              {@html lang.icon}
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
      role="dialog"
      aria-modal="true"
      id="mobile-menu-overlay"
    >
      <div class="w-full h-full flex flex-col items-center justify-center">
        <nav class="flex flex-col items-center space-y-8 w-full max-w-md mx-auto px-4">
          {#each navItems as item, index}
            <div class="relative w-full text-center">
              <a
                href={item.href}
                in:fly={{ y: 20, delay: index * 75, duration: 200 }}
                class="nav-link text-2xl font-medium text-white hover:text-[#dcb660] transition-colors duration-300 inline-block py-3 px-4
                       {$page.url.pathname === item.href ? 'active-link' : ''}"
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
                class="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb660]"
                aria-label={`Switch to ${lang.name}`}
                title={lang.name}
              >
                {@html lang.icon}
              </button>
            {/each}
          </div>
        </nav>
      </div>
    </div>
  {/if}
</header>

<style>
  /* Smooth scrolling for the whole app */
  :global(html) {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
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
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #dcb660, #f0c674, #dcb660);
    transition: all 0.3s ease-out;
    transform: translateX(-50%);
  }

  .nav-link:hover::before {
    width: 100%;
  }

  .active-link {
    color: #dcb660 !important;
    font-weight: 600;
  }

  .active-link::before {
    width: 100%;
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

  /* Mobile menu links with better spacing */
  #mobile-menu-overlay .nav-link {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding: 0.75rem 0;
  }
  
  /* Glass effect for mobile menu */
  #mobile-menu-overlay {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
</style>