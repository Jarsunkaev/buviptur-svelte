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

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</svelte:head>

<div class="min-h-screen">
    <slot />
</div>
<CookieConsent />
<ScrollToTopButton />