<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  // Props with default values - using local static images
  export let carouselImages = [
    '/above.webp',
    '/matyas.webp',
    '/matyasii.webp',
    '/parlament.webp',
    '/prague.webp',
    '/stefan.webp', 
    '/vajda.webp',
    '/var.webp'
  ];
  
  // Form data
  let name = '';
  let surname = '';
  let email = '';
  
  // Current carousel slide index
  let currentSlide = 0;
  const totalSlides = carouselImages.length;
  
  // Auto carousel
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  }
  
  function handleGetOffer() {
    const searchParams = new URLSearchParams({
      name,
      surname,
      email
    }).toString();
    goto(`/contact?${searchParams}`);
  }
  
  onMount(() => {
    // Carousel interval
    const carouselInterval = setInterval(nextSlide, 5000);
    
    return () => {
      clearInterval(carouselInterval);
    };
  });
</script>

<section class="relative h-screen flex items-center justify-center overflow-hidden">
  <!-- Full Background Carousel -->
  <div class="absolute inset-0 z-0">
    {#each carouselImages as image, i}
      <div 
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style="opacity: {i === currentSlide ? '1' : '0'}"
      >
        <img 
          src={image} 
          alt={`Budapest and Central Europe scenic view ${i+1}`} 
          class="w-full h-full object-cover"
          loading={i === 0 ? "eager" : "lazy"}
        />
        <!-- Multiple gradient overlays for better text readability -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#113946]/70 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#113946]/60 to-transparent"></div>
      </div>
    {/each}
    
    <!-- Subtle pattern overlay -->
    <div class="absolute inset-0 bg-black/10 z-10 opacity-30" 
         style="background-image: url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E');">
    </div>
  </div>
  
  <!-- Carousel Controls - Hidden on mobile, visible on md screens and up -->
  <button 
    class="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-[#dcb660] w-12 h-12 rounded-full items-center justify-center z-20 transition-all hover:scale-105 shadow-lg opacity-70 hover:opacity-100"
    on:click={prevSlide}
    aria-label="Previous slide"
  >
    <i class="fas fa-chevron-left text-lg"></i>
  </button>
  
  <button 
    class="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-[#dcb660] w-12 h-12 rounded-full items-center justify-center z-20 transition-all hover:scale-105 shadow-lg opacity-70 hover:opacity-100"
    on:click={nextSlide}
    aria-label="Next slide"
  >
    <i class="fas fa-chevron-right text-lg"></i>
  </button>
  
  <!-- Carousel Indicators -->
  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
    {#each Array(totalSlides) as _, i}
      <button 
        class="w-3 h-3 rounded-full transition-all duration-300 {i === currentSlide ? 'bg-[#dcb660] w-10' : 'bg-white/60 hover:bg-white/80'}"
        on:click={() => currentSlide = i}
        aria-label={`Go to slide ${i + 1}`}
      ></button>
    {/each}
  </div>
  
  <!-- Content Container -->
  <div class="container mx-auto px-4 sm:px-6 relative z-10 mt-16">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Left Content Area -->
      <div class="text-white max-w-xl" style="animation: fadeInUp 0.8s ease-out;">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-[#dcb660]/20 backdrop-blur-sm border border-[#dcb660]/30 mb-6">
          <span class="text-[#dcb660] font-medium">Discover Central Europe</span>
        </div>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Every Journey Is A <span class="text-[#dcb660]">Privilege</span>
        </h1>
        
        <p class="text-xl text-white/90 mb-8 max-w-lg">
          From local escapes to far-flung adventures across Central Europe, crafted with expertise and attention to detail.
        </p>
        
        <!-- Form Container -->
        <div class="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-xl">
          <h3 class="text-xl font-semibold mb-4">Start Your Journey</h3>
          
          <form class="space-y-4" on:submit|preventDefault={handleGetOffer}>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                  bind:value={name}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                  bind:value={surname}
                  required
                />
              </div>
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email Address"
                class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                bind:value={email}
                required
              />
            </div>
            
            <button
              type="submit"
              class="w-full bg-[#dcb660] text-[#113946] font-semibold py-3 px-6 rounded-lg hover:bg-[#dcb660]/90 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <span>Get Your Personalized Offer</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </form>
        </div>
      </div>
      
      <!-- Right side - Mobile visible highlights -->
      <div class="hidden lg:block">
        <div class="grid grid-cols-2 gap-4">
          {#each [
            { icon: 'fa-map-marked-alt', title: 'Expert Local Guides' },
            { icon: 'fa-building', title: 'Accommodation' },
            { icon: 'fa-globe-europe', title: 'Multi-Country Experiences' },
            { icon: 'fa-ship', title: 'Scenic Boat Cruises' }
          ] as highlight, i}
            <div 
              class="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4 flex items-center space-x-3 transform transition-all hover:-translate-y-1"
              style="animation: fadeInUp {0.8 + (i * 0.1)}s ease-out;"
            >
              <div class="w-12 h-12 bg-[#dcb660]/20 rounded-full flex items-center justify-center text-[#dcb660]">
                <i class="fas {highlight.icon}"></i>
              </div>
              <span class="text-white font-medium">{highlight.title}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Glass effect enhancement */
  .backdrop-blur-md {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  
  /* Input focus effect */
  input:focus {
    box-shadow: 0 0 0 2px rgba(220, 182, 96, 0.3);
  }
  
  /* Ensure images cover the entire viewport */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>