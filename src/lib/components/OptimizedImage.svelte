<script>
    import { onMount } from 'svelte';
  
    export let src = '';
    export let alt = '';
    export let width = '100%';
    export let height = 'auto';
    export let classes = '';
    export let loading = 'lazy';
    export let sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    
    // Generate multiple image sizes for responsive loading
    export let baseUrl = '';
    export let imageId = '';
    
    let imgElement;
    let loaded = false;
    let error = false;
    let intersected = false;
    
    // Generate optimized image URLs
    function generateImageUrls(baseUrl, imageId) {
      if (!baseUrl || !imageId) return { webp: src, jpg: src };
      
      const baseUnsplash = `https://images.unsplash.com/photo-${imageId}?q=80&fit=crop`;
      
      return {
        webp: `${baseUnsplash}&fm=webp&w=800&h=600`,
        jpg: `${baseUnsplash}&fm=jpg&w=800&h=600`,
        webp_small: `${baseUnsplash}&fm=webp&w=400&h=300`,
        jpg_small: `${baseUnsplash}&fm=jpg&w=400&h=300`
      };
    }
    
    $: imageUrls = generateImageUrls(baseUrl, imageId);
    
    // Low quality image placeholder (base64 encoded 1x1 pixel)
    const placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+';
    
    function handleLoad() {
      loaded = true;
    }
  
    function handleError() {
      error = true;
      console.warn(`Failed to load image: ${src}`);
    }
    
    // Intersection Observer for better lazy loading
    onMount(() => {
      if (!imgElement || loading !== 'lazy') return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              intersected = true;
              observer.unobserve(entry.target);
            }
          });
        },
        { 
          rootMargin: '50px',
          threshold: 0.1
        }
      );
      
      observer.observe(imgElement);
      
      return () => observer.disconnect();
    });
  </script>
  
  <div 
    class="optimized-image-container relative overflow-hidden {classes}"
    style="width: {width}; height: {height};"
    bind:this={imgElement}
  >
    <!-- Placeholder while loading -->
    {#if !loaded}
      <div 
        class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
        style="background-image: url({placeholder}); background-size: cover;"
      >
        <div class="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin opacity-50"></div>
      </div>
    {/if}
  
    <!-- Main image with WebP support -->
    {#if loading === 'eager' || intersected}
      <picture>
        <!-- WebP sources for modern browsers -->
        {#if imageUrls.webp && imageUrls.webp !== src}
          <source 
            srcset="{imageUrls.webp_small} 400w, {imageUrls.webp} 800w"
            sizes={sizes}
            type="image/webp"
          />
        {/if}
        
        <!-- Fallback JPEG -->
        {#if imageUrls.jpg && imageUrls.jpg !== src}
          <source 
            srcset="{imageUrls.jpg_small} 400w, {imageUrls.jpg} 800w"
            sizes={sizes}
            type="image/jpeg"
          />
        {/if}
        
        <!-- Final fallback image -->
        <img 
          src={src}
          {alt}
          {loading}
          decoding="async"
          width="800"
          height="600"
          on:load={handleLoad}
          on:error={handleError}
          class="w-full h-full object-cover transition-opacity duration-300 {loaded ? 'opacity-100' : 'opacity-0'}"
          style="content-visibility: auto; contain-intrinsic-size: 800px 600px;"
        />
      </picture>
    {/if}
  
    <!-- Error state -->
    {#if error}
      <div class="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500">
        <div class="text-center">
          <i class="fas fa-image text-3xl mb-2 opacity-50"></i>
          <p class="text-sm">Image unavailable</p>
        </div>
      </div>
    {/if}
  </div>
  
  <style>
    .optimized-image-container {
      contain: layout style paint;
    }
    
    picture {
      display: block;
      width: 100%;
      height: 100%;
    }
    
    img {
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }
    
    @media (prefers-reduced-motion: reduce) {
      .transition-opacity {
        transition: none;
      }
      
      .animate-pulse,
      .animate-spin {
        animation: none;
      }
    }
  </style>