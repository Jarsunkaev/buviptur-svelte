<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  // Props
  export let carouselImages = [];
  
  // Current carousel slide index
  let currentSlide = 0;
  const totalSlides = carouselImages.length;
  
  // Form data
  let name = '';
  let surname = '';
  let email = '';
  
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

<section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" style="background-color: var(--teal-900);">
  <!-- Background Elements -->
  <div class="absolute inset-0 overflow-hidden opacity-40">
    <div class="absolute -top-32 -right-32 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl"></div>
    <div class="absolute top-2/3 -left-32 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl"></div>
    <!-- Additional subtle background elements -->
    <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"></div>
    <div class="absolute top-1/3 left-1/3 w-48 h-48 bg-[#dcb660]/10 rounded-full blur-3xl"></div>
  </div>
  
  <div class="container mx-auto px-4 sm:px-6 py-0">
    <!-- Mobile Layout - Uses flex-col to stack elements -->
    <div class="flex flex-col lg:hidden items-center gap-8 md:gap-12">
      <!-- 1. Hero Content (Title and Text) -->
      <div class="hero-content relative z-10 text-white text-center flex flex-col items-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
          Every Journey Is A <span class="text-[#dcb660]">Privilege</span>
        </h1>
        <p class="text-xl opacity-90 mb-8 animate-fadeIn animate-delay-100">From local escapes to far flung adventures</p>
      </div>
      
      <!-- 2. Carousel -->
      <div class="hero-carousel relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl animate-fadeIn animate-delay-100">
        <!-- Carousel Slides -->
        {#each carouselImages as image, i}
          <div class="carousel-slide absolute inset-0 transition-opacity duration-1000 ease-in-out rounded-2xl overflow-hidden"
               style="opacity: {i === currentSlide ? '1' : '0'}">
            <img 
              src={image} 
              alt="Travel destination" 
              class="w-full h-full object-cover"
              loading="eager"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-teal-900/50"></div>
          </div>
        {/each}
        
        <!-- Carousel Controls -->
        <button class="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-[#dcb660] w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110 shadow-lg"
                on:click={prevSlide}
                aria-label="Previous slide">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-[#dcb660] w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110 shadow-lg"
                on:click={nextSlide}
                aria-label="Next slide">
          <i class="fas fa-chevron-right"></i>
        </button>
        
        <!-- Carousel Indicators -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {#each Array(totalSlides) as _, i}
            <button class="w-2 h-2 rounded-full transition-all duration-300 {i === currentSlide ? 'bg-[#dcb660] w-8' : 'bg-white/50'}"
                    on:click={() => currentSlide = i}
                    aria-label={`Go to slide ${i + 1}`}></button>
          {/each}
        </div>
        
        <!-- Modern abstract decorative element -->
        <div class="absolute -right-12 -bottom-12 w-40 h-40 bg-[#dcb660]/20 rounded-full blur-xl z-0"></div>
      </div>
      
      <!-- 3. Mini Contact Form -->
      <form class="w-full max-w-md space-y-4 animate-fadeIn animate-delay-200 mx-auto" on:submit|preventDefault={handleGetOffer}>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="First Name"
              class="w-full px-4 py-3 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
              bind:value={name}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              class="w-full px-4 py-3 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
              bind:value={surname}
              required
            />
          </div>
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            class="w-full px-4 py-3 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
            bind:value={email}
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-[#dcb660] text-teal-900 font-semibold py-3 px-6 rounded-lg hover:bg-[#dcb660]/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <span>Get Your Offer</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </form>
    </div>
    
    <!-- Desktop Layout - Uses grid with specific column arrangement -->
    <div class="hidden lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
      <!-- Left Column - Hero Content -->
      <div class="hero-content relative z-10 text-white lg:text-left order-1 flex flex-col items-start">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeIn">
          Every Journey Is A <span class="text-[#dcb660]">Privilege</span>
        </h1>
        <p class="text-xl opacity-90 mb-8 animate-fadeIn animate-delay-100">From local escapes to far flung adventures</p>
        
        <!-- Mini Contact Form -->
        <form class="w-full max-w-md space-y-4 animate-fadeIn animate-delay-200" on:submit|preventDefault={handleGetOffer}>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                class="w-full px-4 py-3 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                bind:value={name}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                class="w-full px-4 py-3 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
                bind:value={surname}
                required
              />
            </div>
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              class="w-full px-4 py-3 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-[#dcb660] transition-all"
              bind:value={email}
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-[#dcb660] text-teal-900 font-semibold py-3 px-6 rounded-lg hover:bg-[#dcb660]/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <span>Get Your Offer</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </form>
      </div>
      
      <!-- Right Column - Carousel -->
      <div class="hero-carousel relative h-[450px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl order-2 animate-fadeIn animate-delay-100">
        <!-- Carousel Slides -->
        {#each carouselImages as image, i}
          <div class="carousel-slide absolute inset-0 transition-opacity duration-1000 ease-in-out rounded-2xl overflow-hidden"
               style="opacity: {i === currentSlide ? '1' : '0'}">
            <img 
              src={image} 
              alt="Travel destination" 
              class="w-full h-full object-cover"
              loading="eager"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-teal-900/50"></div>
          </div>
        {/each}
        
        <!-- Carousel Controls -->
        <button class="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-[#dcb660] w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110 shadow-lg"
                on:click={prevSlide}
                aria-label="Previous slide">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-[#dcb660] w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110 shadow-lg"
                on:click={nextSlide}
                aria-label="Next slide">
          <i class="fas fa-chevron-right"></i>
        </button>
        
        <!-- Carousel Indicators -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {#each Array(totalSlides) as _, i}
            <button class="w-2 h-2 rounded-full transition-all duration-300 {i === currentSlide ? 'bg-[#dcb660] w-8' : 'bg-white/50'}"
                    on:click={() => currentSlide = i}
                    aria-label={`Go to slide ${i + 1}`}></button>
          {/each}
        </div>
        
        <!-- Modern abstract decorative element -->
        <div class="absolute -right-12 -bottom-12 w-40 h-40 bg-[#dcb660]/20 rounded-full blur-xl z-0"></div>
      </div>
    </div>
  </div>
  

</section>

<style>
  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .animate-delay-100 {
    animation-delay: 0.1s;
  }
  
  .animate-delay-200 {
    animation-delay: 0.2s;
  }
  
  /* Modern styling for hero section */
  .hero-carousel {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }
  

</style>