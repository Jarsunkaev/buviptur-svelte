<!-- DatePicker.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { _ } from 'svelte-i18n';
  
  export let value = '';
  export let placeholder = '';
  export let minDate = 'today';
  export let className = '';
  export let required = false;
  
  let inputElement;
  let flatpickrInstance;
  
  const initFlatpickr = async () => {
    if (typeof window === 'undefined') return;
    
    // Clean up existing instance if it exists
    if (flatpickrInstance) {
      flatpickrInstance.destroy();
    }
    
    // Get current language
    const currentLang = document.documentElement.lang || 'en';
    
    // Import Flatpickr and its styles
    const flatpickr = (await import('flatpickr')).default;
    await import('flatpickr/dist/flatpickr.min.css');
    
    // Import locale if not English
    if (currentLang !== 'en') {
      try {
        const locale = await import(`flatpickr/dist/l10n/${currentLang}.js`);
        flatpickr.localize(locale.default[currentLang]);
      } catch (e) {
        console.warn(`Could not load Flatpickr locale for ${currentLang}, falling back to English`);
      }
    }
    
    flatpickrInstance = flatpickr(inputElement, {
      dateFormat: 'Y-m-d',
      minDate,
      static: true,
      allowInput: true,
      clickOpens: true,
      locale: currentLang,
      // Disable the default calendar icon
      disableMobile: 'true',
      // Position the calendar below the input
      position: 'auto',
      // Add custom class to the calendar container
      appendTo: inputElement.parentNode,
      onChange: ([selectedDate]) => {
        if (selectedDate) {
          value = selectedDate.toISOString().split('T')[0];
        }
      }
    });
    
    // Hide the default calendar icon
    const calendarIcon = inputElement.nextElementSibling?.querySelector('.flatpickr-calendar-icon');
    if (calendarIcon) {
      calendarIcon.style.display = 'none';
    }
  };
  
  onMount(async () => {
    await initFlatpickr();
    
    // Update when language changes
    const unsubscribe = _.subscribe(() => {
      initFlatpickr();
    });
    
    return () => {
      unsubscribe();
    };
  });
  
  onDestroy(() => {
    if (flatpickrInstance) {
      flatpickrInstance.destroy();
    }
  });
  
  // Update placeholder when prop changes
  $: if (inputElement) {
    inputElement.placeholder = placeholder;
  }
</script>

<div class="relative">
  <input
    type="text"
    bind:this={inputElement}
    {placeholder}
    {required}
    class={`w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660] pr-12 ${className}`}
    readonly
    data-input
  />
</div>
