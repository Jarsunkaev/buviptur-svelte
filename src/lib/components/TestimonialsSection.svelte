<script>
  import { onMount } from 'svelte';
  
  export let title;
  export let averageRating;
  export let reviewCount;
  export let certificationText;
  export let testimonials = [];
  
  let currentSlide = 0;
  const totalSlides = testimonials.length;
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  }
  
  onMount(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  });
</script>

<section class="py-20 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      <div class="flex items-center justify-center space-x-4 mb-4">
        <div class="flex items-center">
          <i class="fas fa-star text-[#dcb660]"></i>
          <span class="ml-1 font-semibold">{averageRating}</span>
        </div>
        <span class="text-gray-600">|</span>
        <span class="text-gray-600">{reviewCount} reviews</span>
        <span class="text-gray-600">|</span>
        <span class="text-[#dcb660] font-semibold">{certificationText}</span>
      </div>
    </div>
    
    <div class="relative max-w-4xl mx-auto">
      <!-- Testimonials Carousel -->
      <div class="overflow-hidden">
        <div class="flex transition-transform duration-500 ease-in-out" style="transform: translateX(-{currentSlide * 100}%)">
          {#each testimonials as testimonial}
            <div class="w-full flex-shrink-0 px-4">
              <div class="bg-white rounded-2xl p-8 shadow-lg">
                <div class="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    class="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 class="text-xl font-semibold text-gray-900">{testimonial.author}</h3>
                    <p class="text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
                <h4 class="text-xl font-bold text-gray-900 mb-4">{testimonial.title}</h4>
                <p class="text-gray-600 mb-6">{testimonial.content}</p>
                <div class="flex">
                  {#each Array(testimonial.rating) as _}
                    <i class="fas fa-star text-[#dcb660]"></i>
                  {/each}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Navigation Buttons -->
      <button 
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-[#dcb660]/10 transition-colors"
        on:click={prevSlide}
        aria-label="Previous testimonial"
      >
        <i class="fas fa-chevron-left text-[#dcb660]"></i>
      </button>
      
      <button 
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-[#dcb660]/10 transition-colors"
        on:click={nextSlide}
        aria-label="Next testimonial"
      >
        <i class="fas fa-chevron-right text-[#dcb660]"></i>
      </button>
      
      <!-- Dots -->
      <div class="flex justify-center mt-8 space-x-2">
        {#each Array(totalSlides) as _, i}
          <button 
            class="w-2 h-2 rounded-full transition-all duration-300 {i === currentSlide ? 'bg-[#dcb660] w-6' : 'bg-gray-300'}"
            on:click={() => currentSlide = i}
            aria-label={`Go to testimonial ${i + 1}`}
          ></button>
        {/each}
      </div>
    </div>
  </div>
</section> 