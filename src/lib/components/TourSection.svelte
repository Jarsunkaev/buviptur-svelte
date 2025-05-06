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
    
    let cardElement;
    
    import { onMount } from 'svelte';
    
    onMount(() => {
      const observer = new IntersectionObserver(handleIntersection, { 
        threshold: 0.1 
      });
      
      if (cardElement) {
        observer.observe(cardElement);
      }
      
      return () => {
        if (cardElement) {
          observer.unobserve(cardElement);
        }
      };
    });
</script>

<section class="py-20 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      <p class="text-lg text-gray-600">
        Discover our most popular tours and experiences in Budapest
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each tours as tour}
        <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="relative">
            <img 
              src={tour.image} 
              alt={tour.title}
              class="w-full h-48 object-cover"
            />
            {#if tour.badge}
              <span class="absolute top-4 right-4 bg-[#dcb660] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {tour.badge}
              </span>
            {/if}
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
            <p class="text-gray-600 mb-4">{tour.location}</p>
            
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <i class="fas fa-star text-[#dcb660] mr-1"></i>
                <span class="font-semibold">{tour.rating}</span>
                <span class="text-gray-500 ml-1">({tour.reviews} reviews)</span>
              </div>
              <span class="text-gray-600">{tour.duration}</span>
            </div>
            
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-[#dcb660]">${tour.price}</span>
              <button class="bg-[#dcb660] text-white px-4 py-2 rounded-lg hover:bg-[#dcb660]/90 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>