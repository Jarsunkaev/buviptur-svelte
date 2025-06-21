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
      onChange: ([selectedDate]) => {
        if (selectedDate) {
          value = selectedDate.toISOString().split('T')[0];
        }
      }
    });
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
    class={`w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660] ${className}`}
    readonly
  />
  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
    </svg>
  </div>
</div>
