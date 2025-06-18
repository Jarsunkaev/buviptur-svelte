<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { locale, waitLocale } from 'svelte-i18n';
  import CookieConsent from '$lib/components/CookieConsent.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.postcss';
  import '$lib/app.css';
  
  let isLoading = true;
  
  // Simple navigation handler
  if (browser) {
    document.addEventListener('click', (event) => {
      const anchor = event.target.closest('a');
      if (anchor && anchor.href && !anchor.target && !anchor.download) {
        const url = new URL(anchor.href);
        if (url.origin === window.location.origin) {
          event.preventDefault();
          window.location.href = url.href;
        }
      }
    });
    
    // Override SvelteKit's goto
    window.$goto = (url, options) => {
      if (options?.external) {
        return goto(url, options);
      }
      window.location.href = url;
      return new Promise(() => {});
    };
  }
  
  onMount(async () => {
    if (!browser) return;
    
    // Initialize i18n
    await waitLocale();
    
    // Set language
    const unsubscribe = locale.subscribe((lang) => {
      if (lang) document.documentElement.lang = lang;
    });
    
    // Set viewport height for mobile
    const setVH = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVH();
    
    // Handle resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setVH, 100);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initialize AOS
    try {
      const { default: AOS } = await import('aos');
      await import('aos/dist/aos.css');
      AOS.init({
        duration: 300,
        once: true,
        mirror: false,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      });
    } catch (e) {
      console.warn('AOS initialization failed:', e);
    }
    
    // Mark as loaded
    isLoading = false;
    document.body.classList.add('content-loaded');
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      unsubscribe();
      delete window.$goto;
    };
  });
</script>

<svelte:head>
  <title>BuVipTur - Premium Central Europe Tours</title>
  <meta name="description" content="Discover authentic Central Europe with BuVipTur. Expert guides, unique factory tours, cultural experiences across Hungary, Austria, Czech Republic, and beyond." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
  <meta name="theme-color" content="#113946" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
</svelte:head>

{#if isLoading}
  <div class="fixed inset-0 bg-white flex items-center justify-center z-50">
    <div class="text-center">
      <img src="/logo.PNG" alt="BuVipTur" class="h-20 mx-auto mb-4 animate-pulse" />
      <div class="w-8 h-8 border-4 border-[#dcb660] border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  </div>
{:else}
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
    <CookieConsent />
  </div>
{/if}

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
  
  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    min-height: 100dvh;
    background-color: white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* Removed overflow-x: hidden to ensure proper scroll detection */
  }
  
  :global(.content-loaded) {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }
  
  @media (max-width: 768px) {
    :global(html) {
      font-size: 15px;
    }
  }
</style>
