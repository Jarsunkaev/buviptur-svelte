<script>
  import '../lib/i18n'; // Import the i18n configuration
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { locale, t } from 'svelte-i18n';
  import '$lib/app.css';
  import CookieConsent from '$lib/components/CookieConsent.svelte';
  import ScrollToTopButton from '$lib/components/ScrollToTopButton.svelte';
  import '../app.postcss';
  
  // Detect if user prefers reduced motion
  let prefersReducedMotion = false;
  
  onMount(() => {
      if (browser) {
          // Check for reduced motion preference
          prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          
          // Add smooth scrolling class only if reduced motion is not preferred
          if (!prefersReducedMotion) {
              document.documentElement.classList.add('smooth-scroll');
          }
          
          // Fix for iOS overscroll effect that can cause layout issues
          document.body.style.overscrollBehavior = 'none';
          
          // Add class for fade-in animations on page load
          setTimeout(() => {
              document.body.classList.add('content-loaded');
          }, 50);
      }
  });
</script>

<!-- svelte-ignore css_unused_selector -->
<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#113946">
</svelte:head>

<div class="site-wrapper min-h-screen flex flex-col opacity-0 transition-opacity duration-500" class:opacity-100={browser}>
  <div class="flex-grow">
      <slot />
  </div>
</div>

<style global>
  :global(html) {
      font-size: 16px;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
  }
  
  :global(html.smooth-scroll) {
      scroll-behavior: smooth;
  }
  
  :global(body) {
      background-color: white;
      color: rgb(31, 41, 55);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      overflow-x: hidden;
      width: 100%;
      position: relative;
  }
  
  /* Prevent content from being hidden behind fixed header */
  :global(main) {
      scroll-margin-top: 5rem; /* Matches header height */
  }
  
  /* Mobile optimizations */
  @media (max-width: 640px) {
      :global(html) {
          font-size: 15px; /* Slightly smaller base font on mobile */
      }
  }
  
  /* Improve scrolling performance */
  :global(.site-wrapper) {
      will-change: opacity;
  }
  
  /* Fade-in animation for page content */
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
  
  /* Better touch handling for iOS */
  @supports (-webkit-touch-callout: none) {
      :global(body) {
          /* Prevent pull-to-refresh on iOS */
          overscroll-behavior-y: none;
          /* Add padding for the home indicator on newer iPhones */
          padding-bottom: env(safe-area-inset-bottom);
      }
  }
  
  /* Smooth transitions for all interactive elements */
  :global(a, button, input, select, textarea) {
      transition: all 0.2s ease;
  }
  
  /* Hide scrollbar but keep functionality */
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
</style>
<CookieConsent />
<ScrollToTopButton />