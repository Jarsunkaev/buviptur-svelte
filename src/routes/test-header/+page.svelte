<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Header from '$lib/components/Header.svelte';
  
  let scrollY = 0;
  
  // Generate some content
  const content = Array(50).fill(0).map((_, i) => ({
    id: i,
    title: `Section ${i + 1}`,
    text: 'Scroll down to test the header behavior.'
  }));
  
  onMount(() => {
    if (!browser) return;
    
    const updateScrollPosition = () => {
      scrollY = window.pageYOffset || document.documentElement.scrollTop;
      document.getElementById('scrollPosition').textContent = Math.round(scrollY);
      console.log('Scroll position:', scrollY);
    };
    
    // Initial update
    updateScrollPosition();
    
    // Add scroll listener to window
    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    
    // Check for overflow issues
    console.log('Document height:', document.documentElement.scrollHeight);
    console.log('Window height:', window.innerHeight);
    console.log('Is scrollable?', document.documentElement.scrollHeight > window.innerHeight);
    
    // Add some debug styles to check for overflow issues
    const style = document.createElement('style');
    style.textContent = `
      html, body { overflow: visible !important; }
      * { overflow: visible !important; }
    `;
    document.head.appendChild(style);
    
    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
      document.head.removeChild(style);
    };
  });
</script>

<div class="min-h-screen bg-gray-50">
  <Header />
  
  <div class="pt-24 px-4">
    <h1 class="text-3xl font-bold text-center mb-8">Scroll Test Page</h1>
    
    <div class="max-w-3xl mx-auto space-y-4">
      {#each content as item}
        <div class="p-6 bg-white rounded-lg shadow">
          <h2 class="text-xl font-semibold">{item.title}</h2>
          <p class="text-gray-600">Scroll position: {scrollY}px</p>
        </div>
      {/each}
    </div>
  </div>
  
  <div class="fixed bottom-4 right-4 bg-teal-100 p-4 rounded-lg shadow-lg z-50">
    <p class="text-sm font-medium text-teal-900">
      Current scroll position: <span id="scrollPosition">0</span>px
    </p>
  </div>
</div>
