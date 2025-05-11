<!-- DatePicker.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let value = '';
  export let placeholder = '';
  export let minDate = 'today';
  export let className = '';
  
  let inputElement;
  let flatpickrInstance;
  
  onMount(async () => {
    if (typeof window !== 'undefined') {
      const flatpickr = (await import('flatpickr')).default;
      flatpickrInstance = flatpickr(inputElement, {
        dateFormat: 'Y-m-d',
        minDate,
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

<input
  type="text"
  bind:this={inputElement}
  {placeholder}
  class={className}
  readonly
/>
