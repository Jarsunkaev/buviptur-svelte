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
      </div>
    </div>
    
    <div class="relative max-w-3xl mx-auto">
      <!-- Testimonial Cards -->
      <div class="relative h-[280px]">
        {#each testimonials as testimonial, i}
          <div 
            class="absolute inset-0 transition-opacity duration-500 ease-in-out bg-white rounded-xl shadow-md hover:shadow-lg"
            style="opacity: {i === currentSlide ? '1' : '0'}; z-index: {i === currentSlide ? '1' : '0'}"
          >
            <div class="p-6 h-full flex flex-col">
              <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-900">{testimonial.author}</h3>
                <p class="text-sm text-gray-600 mb-2">{testimonial.position}</p>
              </div>
              
              <div class="flex items-center mb-3">
                {#each Array(testimonial.rating) as _}
                  <i class="fas fa-star text-[#dcb660] text-sm"></i>
                {/each}
              </div>
              
              <h4 class="text-xl font-semibold text-gray-900 mb-4">{testimonial.title}</h4>
              <p class="text-gray-600 flex-grow">{testimonial.content}</p>
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Dots -->
      <div class="flex justify-center mt-6 sm:mt-8 space-x-1.5 sm:space-x-2" style="font-size: 0;">
        {#each Array(totalSlides) as _, i}
          <button 
            class="rounded-full transition-all duration-300 {i === currentSlide ? 'bg-[#dcb660]' : 'bg-gray-300'}"
            style="width: 6px; height: 6px; min-width: 6px; min-height: 6px; {i === currentSlide ? 'width: 16px; min-width: 16px;' : ''}"
            style:sm="width: 8px; height: 8px; min-width: 8px; min-height: 8px; {i === currentSlide ? 'width: 24px; min-width: 24px;' : ''}"
            on:click={() => currentSlide = i}
            aria-label={`Go to testimonial ${i + 1}`}
          ></button>
        {/each}
      </div>
    </div>
  </div>
</section> 