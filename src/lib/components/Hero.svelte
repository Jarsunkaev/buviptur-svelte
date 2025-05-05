<script>
  import { onMount } from 'svelte';
  
  // Props
  export let carouselImages = [];
  
  // Current carousel slide index
  let currentSlide = 0;
  const totalSlides = carouselImages.length;
  
  // Categories for pills
  let categories = [
    { name: 'All', active: true },
    { name: 'Culture', active: false },
    { name: 'Food', active: false },
    { name: 'Nature', active: false },
    { name: 'Adventure', active: false }
  ];
  
  // Auto carousel
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  }
  
  // Select a category
  function selectCategory(index) {
    categories.forEach((cat, i) => {
      cat.active = (i === index);
    });
    categories = [...categories]; // Trigger reactivity
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
  
  <div class="container mx-auto px-4 sm:px-6 py-0 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
    <!-- Left Column - Hero Content -->
    <div class="hero-content relative z-10 text-white lg:text-left text-center order-2 lg:order-1">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeIn">
        Every Journey Is A <span class="text-[#dcb660]">Privilege</span>
      </h1>
      <p class="text-xl opacity-90 mb-8 animate-fadeIn animate-delay-100">From local escapes to far flung adventures</p>
      
      <!-- Category Pills -->
      <div class="flex justify-center lg:justify-start flex-wrap gap-3 category-pills pb-4 md:pb-0 animate-fadeIn animate-delay-200">
        {#each categories as category, i}
          <button 
            class="category-pill bg-white/15 backdrop-blur-sm border border-white/20 rounded-full py-2 px-6 text-white font-medium transition-all hover:shadow-lg {category.active ? 'bg-[#dcb660] text-teal-900 shadow-md' : 'hover:bg-[#dcb660]/70 hover:text-teal-900'}"
            on:click={() => selectCategory(i)}
          >
            {category.name}
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Right Column - Carousel -->
    <div class="hero-carousel relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2 animate-fadeIn animate-delay-100">
      <!-- Carousel Slides -->
      {#each carouselImages as image, i}
        <div class="carousel-slide absolute inset-0 transition-opacity duration-1000 ease-in-out rounded-2xl overflow-hidden"
             style="opacity: {i === currentSlide ? '1' : '0'}">
          <img 
            src={image} 
            alt="Travel destination" 
            class="w-full h-full object-cover"
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
  
  .category-pill {
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  .category-pill:hover {
    transform: translateY(-2px);
  }
</style>