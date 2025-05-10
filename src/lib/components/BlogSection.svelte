<script>
  export let title;
  export let articles = [];
</script>

<section class="py-20 bg-white">
  <div class="container mx-auto px-4">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      <p class="text-lg text-gray-600">
        Discover travel tips, guides, and stories from our expert team
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each articles as article}
        <article class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img 
            src={article.image} 
            alt={article.title}
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <div class="flex items-center text-sm text-gray-600 mb-4">
              <span>{article.date}</span>
              <span class="mx-2">•</span>
              <span>By {article.author}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
            <p class="text-gray-600 mb-4">{article.excerpt}</p>
            <a href="/blog/{article.slug}" class="text-[#dcb660] font-semibold hover:text-[#dcb660]/80 transition-colors inline-flex items-center">
              Read More
              <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section> 