<script>
  export let title = '';
  export let tours = [];
  
  let visible = false;
  
  function handleIntersection(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      visible = true;
    }
  }
  
  let sectionElement;
  
  import { onMount } from 'svelte';
  
  onMount(() => {
    const observer = new IntersectionObserver(handleIntersection, { 
      threshold: 0.1 
    });
    
    if (sectionElement) {
      observer.observe(sectionElement);
    }
    
    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  });
</script>

<section 
  bind:this={sectionElement}
  class="py-20 bg-gray-50"
>
  <div class="container mx-auto px-4">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      <p class="text-lg text-gray-600">
        Discover our most popular tours and experiences in Budapest
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      {#each tours as tour, i}
        <div 
          class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
          style="animation-delay: {i * 0.1}s"
          class:animate-fade-in={visible}
        >
          <div class="relative">
            <img 
              src={tour.image} 
              alt={tour.title}
              class="w-full h-56 object-cover"
            />
            {#if tour.badge}
              <span class="absolute top-4 right-4 bg-[#dcb660] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                {tour.badge}
              </span>
            {/if}
            <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent h-20"></div>
          </div>
          
          <div class="p-6 flex-grow flex flex-col">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
            <p class="text-gray-600 mb-4 flex items-center">
              <i class="fas fa-map-marker-alt text-[#dcb660] mr-2"></i> 
              {tour.location}
            </p>
            
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                  <i class="fas fa-star text-[#dcb660] mr-1"></i>
                  <span class="font-semibold">{tour.rating}</span>
                </div>
                <span class="text-gray-500 ml-2 text-sm">({tour.reviews} reviews)</span>
              </div>
              <span class="text-gray-600 flex items-center">
                <i class="far fa-clock text-[#dcb660] mr-1"></i>
                {tour.duration}
              </span>
            </div>
            
            <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              <span class="text-2xl font-bold text-[#dcb660]">${tour.price}</span>
              <a 
                href="/contact?tour={encodeURIComponent(tour.title)}" 
                class="bg-[#dcb660] text-white px-4 py-2 rounded-lg hover:bg-[#dcb660]/90 transition-colors flex items-center"
              >
                Book Now
                <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
  }
  
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
</style>