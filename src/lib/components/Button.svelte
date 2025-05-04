<script>
    export let variant = 'primary'; // primary, secondary, outline
    export let size = 'md'; // sm, md, lg
    export let href = null; // If provided, renders as an anchor instead of button
    export let type = 'button'; // button, submit, reset (only used when not an anchor)
    export let disabled = false;
    export let classes = ''; // Additional custom classes
    
    const baseClasses = 'rounded-lg inline-flex items-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dcb660]';
    
    // Variant classes
    const variantClasses = {
      primary: 'bg-[#dcb660] hover:bg-[#dcb660]/90 text-white shadow-lg hover:shadow-xl',
      secondary: 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 shadow-md hover:shadow-lg',
      outline: 'bg-transparent hover:bg-gray-100 text-[#dcb660] border border-[#dcb660]',
    };
    
    // Size classes
    const sizeClasses = {
      sm: 'text-sm px-3 py-2',
      md: 'px-6 py-3',
      lg: 'text-lg px-8 py-4',
    };
    
    // Disabled classes
    const disabledClasses = 'opacity-60 cursor-not-allowed pointer-events-none';
    
    // Combine all classes
    $: buttonClasses = `
      ${baseClasses} 
      ${variantClasses[variant]} 
      ${sizeClasses[size]} 
      ${disabled ? disabledClasses : 'hover:-translate-y-1'} 
      ${classes}
    `;
  </script>
  
  {#if href}
    <a {href} class={buttonClasses} disabled={disabled} {...$$restProps}>
      <slot />
    </a>
  {:else}
    <button {type} {disabled} class={buttonClasses} {...$$restProps}>
      <slot />
    </button>
  {/if}