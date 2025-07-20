<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  // If you need to programmatically navigate, use SvelteKit's goto.
  // For standard <a> tags, SvelteKit handles client-side navigation automatically.
  // import { goto } from '$app/navigation';

  // Import locale and waitLocale for i18n initialization
  import { locale, waitLocale } from 'svelte-i18n';

  import CookieConsent from '$lib/components/CookieConsent.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  // Import your global CSS files
  import '../app.postcss'; // Tailwind CSS or your main postcss file
  import '$lib/app.css'; // Your custom global CSS

  let isLoading = true; // For initial page loader (splash screen)

  // Handle scroll to top on navigation
  const scrollToTop = () => {
    if (!browser) return;
    // Use document.documentElement for better cross-browser support
    const html = document.documentElement;
    const body = document.body;
    
    // Scroll to top immediately
    html.scrollTop = 0;
    body.scrollTop = 0;
    
    // Add a small delay and scroll again to ensure it works
    requestAnimationFrame(() => {
      html.scrollTop = 0;
      body.scrollTop = 0;
      
      // One more time for good measure
      setTimeout(() => {
        html.scrollTop = 0;
        body.scrollTop = 0;
      }, 100);
    });
  };

  // Handle navigation events
  const handleNavigation = ({ to }) => {
    if (!browser || !to) return;
    
    // Only scroll to top if this is a navigation to a different route
    if (window.location.pathname !== to.url.pathname) {
      scrollToTop();
    }
  };

  // Subscribe to navigation events
  const unsubscribeBefore = beforeNavigate(handleNavigation);
  const unsubscribeAfter = afterNavigate(handleNavigation);
  
  // Handle initial page load
  onMount(() => {
    if (browser) {
      // Add a small delay to ensure the page is fully loaded
      const timer = setTimeout(() => {
        scrollToTop();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  });

  onMount(async () => {
    // Only run client-side specific code in the browser
    if (!browser) return;

    // --- Svelte-i18n Initialization ---
    // Wait for the locale to be set from the browser's language or a user preference
    await waitLocale();

    // Subscribe to locale changes to update the HTML lang attribute
    const unsubscribeLocale = locale.subscribe((lang) => {
      if (lang) {
        document.documentElement.lang = lang;
      }
    });

    // --- Page Loading Animation Cleanup ---
    // Remove the loading state after all initial setup is complete
    isLoading = false;
    // Add a class to the body to potentially trigger a fade-in animation for content
    document.body.classList.add('content-loaded');

    // --- Cleanup function for onDestroy ---
    return () => {
      onDestroy(() => {
        if (unsubscribeLocale) unsubscribeLocale();
        if (unsubscribeBefore) unsubscribeBefore();
        if (unsubscribeAfter) unsubscribeAfter();
      });
      // No other global event listeners (like 'resize') or global variables (like window.$goto)
      // are managed by this layout, so no further cleanup is needed here.
    };
  });
</script>

<svelte:head>
  <title>BuVipTur - Premium Central Europe Tours</title>
  <meta name="description" content="Discover authentic Central Europe with BuVipTur. Expert guides, unique factory tours, cultural experiences across Hungary, Austria, Czech Republic, and beyond." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
  <meta name="theme-color" content="#113946" />

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
      <slot /> </main>
    <Footer />
    <CookieConsent />
  </div>
{/if}

<style>
  /* Global styles applied to the html and body elements */
  :global(html) {
    scroll-behavior: smooth; /* Smooth scrolling for anchor links */
  }

  :global(body) {
    margin: 0;
    padding: 0;
    /* Use modern viewport units for height to ensure full page coverage */
    min-height: 100vh; /* Fallback for older browsers */
    min-height: 100dvh; /* Dynamic Viewport Height - preferred for mobile browsers with dynamic toolbars */
    background-color: white; /* Default background color */
    -webkit-font-smoothing: antialiased; /* Better font rendering on macOS/iOS */
    -moz-osx-font-smoothing: grayscale; /* Better font rendering on Firefox/Linux */
  }

  /* Class for fading in content after initial load */
  :global(.content-loaded) {
    opacity: 1;
    transition: opacity 0.3s ease-in-out; /* Smooth transition for content reveal */
  }

  /* Responsive font size for smaller screens */
  @media (max-width: 768px) {
    :global(html) {
      font-size: 15px; /* Adjust base font size for better mobile readability */
    }
  }
</style>