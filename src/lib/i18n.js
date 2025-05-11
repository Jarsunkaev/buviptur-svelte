import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

// Import translations
const en = {
  common: {
    cookieConsent: {
      message: 'This website uses cookies to ensure you get the best experience.',
      accept: 'Accept',
      decline: 'Decline',
      learnMore: 'Learn More'
    },
    navigation: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact'
    }
  }
};

const hu = {
  common: {
    cookieConsent: {
      message: 'Ez a weboldal sütiket használ a jobb felhasználói élmény érdekében.',
      accept: 'Elfogadom',
      decline: 'Elutasítom',
      learnMore: 'További információ'
    },
    navigation: {
      home: 'Főoldal',
      about: 'Rólunk',
      services: 'Szolgáltatások',
      contact: 'Kapcsolat'
    }
  }
};

// Register translations
addMessages('en', en);
addMessages('hu', hu);

// Initialize the i18n library
init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});
