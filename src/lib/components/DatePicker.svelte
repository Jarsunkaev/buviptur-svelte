<!-- DatePicker.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let value = '';
  export let placeholder = 'Select a date';
  export let minDate = 'today';
  export let className = '';
  export let required = false;
  
  let inputElement;
  let flatpickrInstance;
  
  onMount(async () => {
    if (typeof window !== 'undefined') {
      // Import Flatpickr and its styles
      const flatpickr = (await import('flatpickr')).default;
      await import('flatpickr/dist/flatpickr.min.css');
      
      flatpickrInstance = flatpickr(inputElement, {
        dateFormat: 'Y-m-d',
        minDate,
        static: true,
        allowInput: true,
        clickOpens: true,
        onChange: ([selectedDate]) => {
          if (selectedDate) {
            value = selectedDate.toISOString().split('T')[0];
          }
        }
      });
    }
  });
  
  onDestroy(() => {
    if (flatpickrInstance) {
      flatpickrInstance.destroy();
    }
  });
</script>

<div class="relative">
  <input
    type="text"
    bind:this={inputElement}
    {placeholder}
    {required}
    class={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660] ${className}`}
    readonly
  />
  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  </div>
</div>
