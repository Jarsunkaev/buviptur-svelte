<script>
    import '../lib/i18n'; // Import the i18n configuration
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { locale, t } from 'svelte-i18n';
    import '$lib/app.css';
    import CookieConsent from '$lib/components/CookieConsent.svelte';
    import ScrollToTopButton from '$lib/components/ScrollToTopButton.svelte';
    import '../app.postcss';
</script>

<!-- svelte-ignore css_unused_selector -->
<!-- svelte-ignore css_unused_selector -->
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</svelte:head>

<div class="min-h-screen flex flex-col">
    <div class="flex-grow">
      <slot />
    </div>
</div>

<style global>
  :global(html) {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }
  
  :global(body) {
    background-color: white;
    color: rgb(31, 41, 55);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  
  /* Prevent content from being hidden behind fixed header */
  :global(main) {
    scroll-margin-top: 5rem; /* Matches header height */
  }
  
  /* Smooth scrolling for anchor links */
  :global(html:focus-within) {
    scroll-behavior: smooth;
  }
</style>
<CookieConsent />
<ScrollToTopButton />