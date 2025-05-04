<script>
  export let title;
  export let description;
  
  let email = '';
  let isSubscribed = false;
  
  function handleSubmit() {
    // Here you would typically handle the form submission
    // For now, we'll just show a success message
    isSubscribed = true;
    email = '';
  }
</script>

<section class="py-20 bg-teal-900">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      <p class="text-lg text-white/80 mb-8">{description}</p>
      
      {#if isSubscribed}
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
          <i class="fas fa-check-circle text-3xl mb-4"></i>
          <p class="text-xl">Thank you for subscribing!</p>
          <p class="text-white/80 mt-2">We'll keep you updated with our latest news and offers.</p>
        </div>
      {:else}
        <form 
          on:submit|preventDefault={handleSubmit}
          class="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
        >
          <input 
            type="email" 
            bind:value={email}
            placeholder="Enter your email address"
            class="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40"
            required
          />
          <button 
            type="submit"
            class="bg-[#dcb660] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#dcb660]/90 transition-colors"
          >
            Subscribe
          </button>
        </form>
      {/if}
    </div>
  </div>
</section> 