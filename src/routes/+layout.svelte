<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { locale, waitLocale } from 'svelte-i18n';
  import '$lib/i18n'; // Import the i18n configuration
  import CookieConsent from '$lib/components/CookieConsent.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.postcss';
  import '$lib/app.css';
  
  // Detect if user prefers reduced motion
  let prefersReducedMotion = false;
  let isLoading = true;
  
  onMount(async () => {
    if (browser) {
      // Wait for i18n to be loaded
      await waitLocale();
      
      // Update HTML lang attribute when locale changes
      const unsubscribe = locale.subscribe((lang) => {
        if (lang) {
          document.documentElement.setAttribute('lang', lang);
        }
      });
      
      // Check for reduced motion preference
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Add smooth scrolling class only if reduced motion is not preferred
      if (!prefersReducedMotion) {
        document.documentElement.classList.add('smooth-scroll');
      }
      
      // CRITICAL: Better mobile viewport handling
      const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
      };
      
      // Set initial viewport height
      setVH();
      
      // Handle viewport changes with throttling
      let resizeTimeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setVH, 100);
      };
      
      window.addEventListener('resize', handleResize, { passive: true });
      
      // Handle visual viewport changes (modern mobile browsers)
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize, { passive: true });
      }
      
      // Better mobile scroll behavior
      document.body.style.overscrollBehavior = 'none';
      
      // Show content after i18n is loaded
      isLoading = false;
      
      // Add class for fade-in animations on page load
      setTimeout(() => {
        document.body.classList.add('content-loaded');
      }, 50);
      
      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', handleResize);
        }
        clearTimeout(resizeTimeout);
        unsubscribe();
      };
    }
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no, interactive-widget=resizes-content">
  <meta name="theme-color" content="#113946">
</svelte:head>

<!-- Loading screen while i18n initializes -->
{#if isLoading}
  <div class="fixed inset-0 bg-white flex items-center justify-center z-50">
    <div class="text-center">
      <img src="/logo.PNG" alt="BuVipTur" class="h-20 mx-auto mb-4 animate-pulse" />
      <div class="w-8 h-8 border-4 border-[#dcb660] border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  </div>
{:else}
  <!-- Main content wrapper with proper stacking context -->
  <div class="site-wrapper min-h-screen flex flex-col opacity-0 transition-opacity duration-500 relative" 
       class:opacity-100={browser && !isLoading}
       style="min-height: 100vh; min-height: 100dvh; display: flex; flex-direction: column; isolation: isolate; position: relative;">
    <Header />
    <main class="flex-grow flex flex-col relative">
      <slot />
    </main>
    <Footer />
  </div>

  <CookieConsent />
{/if}

<style global>
  :global(html) {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    overscroll-behavior: none;
    height: 100%;
    height: 100vh;
    height: 100dvh;
  }
  
  :global(html.smooth-scroll) {
    scroll-behavior: smooth;
  }
    
  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    min-height: 100dvh;
    background-color: white;
    color: rgb(31, 41, 55);
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-direction: column;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    width: 100%;
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch;
  }
    
  @supports (height: 100dvh) {
    :global(html),
    :global(body) {
      min-height: 100dvh;
    }
    
    :global(.min-h-screen) {
      min-height: 100dvh !important;
    }
  }
    
  :global(main) {
    scroll-margin-top: 5rem;
  }
    
  @media (max-width: 640px) {
    :global(html) {
      font-size: 15px;
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
    }
    
    :global(body) {
      min-height: 100vh;
      min-height: calc(var(--vh, 1vh) * 100);
    }
    
    :global(input),
    :global(select),
    :global(textarea) {
      font-size: 16px !important;
    }
  }
    
  :global(.site-wrapper) {
    will-change: opacity;
    transform: translateZ(0);
  }
    
  :global(body.content-loaded .animate-on-load) {
    animation: fadeInUp 0.8s ease-out forwards;
  }
    
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
    
  @supports (-webkit-touch-callout: none) {
    :global(body) {
      overscroll-behavior-y: none;
      padding-bottom: env(safe-area-inset-bottom);
    }
    
    :global(.site-wrapper) {
      min-height: -webkit-fill-available;
    }
  }
    
  :global(html.menu-open),
  :global(body.menu-open) {
    overflow: hidden !important;
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
    -webkit-overflow-scrolling: auto !important;
  }
    
  :global(a),
  :global(button),
  :global(input),
  :global(select),
  :global(textarea) {
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }
    
  @media (min-width: 1024px) {
    :global(body) {
      scrollbar-width: thin;
      scrollbar-color: #dcb660 transparent;
    }
    
    :global(::-webkit-scrollbar) {
      width: 8px;
    }
    
    :global(::-webkit-scrollbar-track) {
      background: transparent;
    }
    
    :global(::-webkit-scrollbar-thumb) {
      background-color: #dcb660;
      border-radius: 20px;
    }
  }
    
  :global(.hero-section) {
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
  }
  
  @media (max-width: 768px) {
    :global(.hero-section) {
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
    }
  }
  
  /* Loading animation styles */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
</style>