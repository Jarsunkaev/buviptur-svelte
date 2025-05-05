<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition'; // Import fade transition for mobile menu

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

  // Function to close menu and navigate
  function handleNavClick(event, section) {
    event.preventDefault(); // Prevent default anchor behavior
    
    // Ensure menu is closed and body scroll is restored BEFORE scrolling
    if (isMenuOpen) {
      isMenuOpen = false;
      document.body.style.overflow = '';
    }
    
    const targetElement = document.querySelector(section);
    if (targetElement) {
      // Add a small delay to ensure the menu is closed before scrolling
      setTimeout(() => {
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      }, 100);
    }
  }

  onMount(() => {
    // Header scroll effect
    const handleScroll = () => {
      isScrolled = window.scrollY > scrollThreshold;
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // Use passive listener for performance

    // Initialize header state on page load
    handleScroll();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Ensure body overflow is reset if component is destroyed while menu is open
      document.body.style.overflow = '';
    };
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</svelte:head>

<header
  class="fixed top-0 left-0 right-0 z-30 flex items-center transition-all duration-500 ease-out
         {isScrolled
           ? 'h-20 bg-white shadow-md'
           : 'h-24 bg-transparent'}"
>
  <div class="container mx-auto px-4 sm:px-6 h-full">
    <nav class="flex items-center justify-between w-full h-full">
      <a href="/" class="flex items-center z-50" aria-label="BuVipTur Home">
        <img
          src="/logo.PNG"
          alt="BuVipTur Logo"
          class="rounded-lg transition-all duration-500 ease-out
                 {isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'}"
        />
      </a>

      <div class="hidden lg:flex items-center space-x-12">
        {#each [
          { href: '#tours', label: 'Tours' },
          { href: '#destinations', label: 'Destinations' },
          { href: '#activities', label: 'Activities' },
          { href: '#about', label: 'About' },
          { href: '#contact', label: 'Contact' }
        ] as item}
          <a
            href={item.href}
            class="nav-link text-lg font-medium transition-all duration-300 relative
                   {isScrolled ? 'text-gray-800 hover:text-[#dcb660]' : 'text-white hover:text-[#dcb660]'}"
            on:click={(e) => handleNavClick(e, item.href)}
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
    >
      <div class="w-full h-full flex flex-col items-center justify-center">
        <nav class="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto px-4">
          {#each [
            { href: '#tours', label: 'Tours', delay: '0.1s' },
            { href: '#destinations', label: 'Destinations', delay: '0.2s' },
            { href: '#activities', label: 'Activities', delay: '0.3s' },
            { href: '#about', label: 'About', delay: '0.4s' },
            { href: '#contact', label: 'Contact', delay: '0.5s' }
          ] as item}
            <a
              href={item.href}
              class="nav-link text-2xl font-medium text-white hover:text-[#dcb660] transition-colors duration-300 animate-fadeIn w-full text-center py-3"
              style="animation-delay: {item.delay}"
              on:click={(e) => handleNavClick(e, item.href)}
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
  /* Ensure html has smooth scrolling if relying solely on anchor links */
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 6rem; /* Add padding to account for fixed header */
  }

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
</style>