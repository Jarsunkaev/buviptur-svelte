<script>
    import { onMount } from 'svelte';
    
    // State for header
    let isMenuOpen = false;
    let isScrolled = false;
    
    // Toggle mobile menu function
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      // Prevent body scroll when menu is open
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
    
    onMount(() => {
      // Header scroll effect
      const handleScroll = () => {
        isScrolled = window.scrollY > 50;
      };
      
      window.addEventListener('scroll', handleScroll);
      
      // Initialize header state on page load
      handleScroll();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        // Reset body overflow when component is destroyed
        document.body.style.overflow = '';
      };
    });
  </script>
  
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}">
    <div class="container mx-auto px-4">
      <nav class="flex items-center justify-between h-24">
        <!-- Logo -->
        <a href="/" class="flex items-center">
          <img 
            src="/logo.PNG" 
            alt="BuVipTur Logo" 
            class="transition-all duration-500 ease-in-out rounded-lg {isScrolled ? 'h-14' : 'h-20'}"
          />
        </a>
        
        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-12">
          <a href="#tours" class="nav-link text-xl font-medium transition-colors {isScrolled ? 'text-gray-700 text-lg hover:text-[#dcb660]' : 'text-white hover:text-[#dcb660]'}">Tours</a>
          <a href="#destinations" class="nav-link text-xl font-medium transition-colors {isScrolled ? 'text-gray-700 text-lg hover:text-[#dcb660]' : 'text-white hover:text-[#dcb660]'}">Destinations</a>
          <a href="#activities" class="nav-link text-xl font-medium transition-colors {isScrolled ? 'text-gray-700 text-lg hover:text-[#dcb660]' : 'text-white hover:text-[#dcb660]'}">Activities</a>
          <a href="#about" class="nav-link text-xl font-medium transition-colors {isScrolled ? 'text-gray-700 text-lg hover:text-[#dcb660]' : 'text-white hover:text-[#dcb660]'}">About</a>
          <a href="#contact" class="nav-link text-xl font-medium transition-colors {isScrolled ? 'text-gray-700 text-lg hover:text-[#dcb660]' : 'text-white hover:text-[#dcb660]'}">Contact</a>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          class="lg:hidden {isScrolled ? 'text-gray-700' : 'text-white'}"
          on:click={toggleMenu}
          aria-label="Toggle menu"
        >
          <i class="fas {isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl"></i>
        </button>
      </nav>
    </div>
    
    <!-- Full Screen Mobile Menu -->
    {#if isMenuOpen}
      <div 
        class="fixed inset-0 bg-teal-900/95 backdrop-blur-md z-40 lg:hidden flex items-center justify-center"
        class:animate-fadeIn={isMenuOpen}
      >
        <div class="container mx-auto px-4 relative h-full flex flex-col">
          <!-- Close Button -->
          <button 
            class="absolute top-8 right-6 text-white hover:text-[#dcb660] transition-colors p-2"
            on:click={toggleMenu}
            aria-label="Close menu"
          >
            <i class="fas fa-times text-3xl"></i>
          </button>
          
          <!-- Mobile Navigation Links -->
          <div class="flex-1 flex flex-col justify-center space-y-8 text-center">
            {#each ['Tours', 'Destinations', 'Activities', 'About', 'Contact'] as item, i}
              <a 
                href="#{item.toLowerCase()}" 
                class="nav-link text-3xl font-medium text-white hover:text-[#dcb660] transition-colors animate-fadeIn"
                style="animation-delay: {i * 0.1}s"
                on:click={toggleMenu}
              >
                {item}
              </a>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </header>
  
  <style>
    /* CSS Animations and Transitions */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    /* Ensure the header doesn't collapse */
    header {
      min-height: 80px;
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }

    /* Navigation link underline animation */
    .nav-link {
      position: relative;
      text-decoration: none;
      transition: all 0.3s ease-in-out;
      opacity: 0;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: #dcb660;
      transition: width 0.3s ease-in-out;
    }

    .nav-link:hover::after {
      width: 100%;
    }

    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }
  </style>