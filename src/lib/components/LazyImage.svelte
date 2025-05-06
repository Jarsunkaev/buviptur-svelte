<script>
    import { onMount } from 'svelte';

    export let src = '';
    export let alt = '';
    export let width = '100%';
    export let height = 'auto';
    export let classes = '';
    export let placeholder = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" fill="%23f0f0f0"><rect width="100%" height="100%" fill="%23f0f0f0"/></svg>';

    let imgElement;
    let loaded = false;
    let error = false;

    function handleLoad() {
        loaded = true;
        console.log(`Image loaded successfully: ${src}`);
    }

    function handleError(event) {
        error = true;
        console.error(`Failed to load image: ${src}`, event);
    }

    onMount(() => {
        if (imgElement && imgElement.complete) {
            loaded = true;
        }
    });
</script>

<div 
    class="lazy-image-container relative overflow-hidden {classes}"
    style="width: {width}; height: {height};"
>
    {#if !loaded || error}
        <img 
            src={placeholder} 
            alt="Loading..." 
            class="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm"
        />
    {/if}

    <img 
        bind:this={imgElement}
        {src} 
        {alt} 
        loading="lazy"
        on:load={handleLoad}
        on:error={handleError}
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 {loaded ? 'opacity-100' : 'opacity-0'} {error ? 'hidden' : ''}"
    />
</div>
