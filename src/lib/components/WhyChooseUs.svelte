<script>
  export let title;
  export let benefits = [];
  export let stats = [];
  export let image;
</script>

<section class="py-20 bg-white">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Left Column - Image -->
      <div class="relative">
        <img 
          src={image} 
          alt="Why Choose Us"
          class="w-full h-[600px] object-cover rounded-2xl"
        />
        <div class="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
          <div class="grid grid-cols-2 gap-6">
            {#each stats as stat}
              <div class="text-center">
                <p class="text-3xl font-bold text-[#dcb660] mb-1">{stat.value}</p>
                <p class="text-gray-600 text-sm">{stat.label}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Right Column - Content -->
      <div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{title}</h2>
        <div class="space-y-8">
          {#each benefits as benefit}
            <div class="flex items-start">
              <div class="w-12 h-12 bg-[#dcb660]/10 rounded-full flex items-center justify-center text-[#dcb660] mr-4 flex-shrink-0">
                <i class="fas {benefit.icon} text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p class="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
