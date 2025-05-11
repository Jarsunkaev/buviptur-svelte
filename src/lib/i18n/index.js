import { browser } from '$app/environment';
import { init, register, locale, getLocaleFromNavigator } from 'svelte-i18n';

// Register your translation files
register('en', () => import('./en.json'));
register('hu', () => import('./hu.json'));
register('tr', () => import('./tr.json'));

// Initialize the library
init({
  fallbackLocale: 'en',
  initialLocale: browser 
    ? window.localStorage.getItem('preferredLanguage') || getLocaleFromNavigator() 
    : 'en',
});

export { locale };