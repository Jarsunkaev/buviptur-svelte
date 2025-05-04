<script>
  export let title;
  export let subtitle;
  export let activities = [];
</script>

<section class="py-20 bg-white">
  <div class="container mx-auto px-4">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      <p class="text-lg text-gray-600">{subtitle}</p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {#each activities as activity}
        <div class="bg-gray-50 rounded-xl p-6 text-center hover:bg-[#dcb660]/10 transition-colors group">
          <div class="w-16 h-16 mx-auto mb-4 bg-[#dcb660]/10 rounded-full flex items-center justify-center text-[#dcb660] group-hover:bg-[#dcb660]/20 transition-colors">
            <i class="fas {activity.icon} text-2xl"></i>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{activity.title}</h3>
          <p class="text-[#dcb660] font-bold">{activity.count}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
