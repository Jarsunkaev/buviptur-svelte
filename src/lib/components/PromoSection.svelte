<script>
  export let promos = [];
</script>

<section class="py-20">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each promos as promo}
        <a href={promo.link} class="group relative overflow-hidden rounded-2xl aspect-[4/3]">
          <img 
            src={promo.image} 
            alt={promo.title}
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-6 text-white">
            <h3 class="text-2xl font-bold mb-2">{promo.title}</h3>
            <span class="inline-flex items-center text-sm">
              Learn More
              <i class="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
            </span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
