<script>
  export let title;
  export let destinations = [];
</script>

<section class="py-20 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      <p class="text-lg text-gray-600">
        Explore our most popular destinations and start planning your next adventure
      </p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each destinations as destination}
        <div class="group relative overflow-hidden rounded-2xl aspect-[3/4]">
          <img 
            src={destination.image} 
            alt={destination.name}
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-6 text-white">
            <h3 class="text-2xl font-bold mb-2">{destination.name}</h3>
            <p class="text-white/80 mb-4">{destination.tours} tours available</p>
            <button class="bg-[#dcb660] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#dcb660]/90 transition-colors">
              Explore
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
