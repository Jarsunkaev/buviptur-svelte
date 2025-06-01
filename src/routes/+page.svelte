<script>
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import OptimizedImage from '$lib/components/OptimizedImage.svelte';
  
  // Debug: Log the base URL for image paths
  let baseUrl = '';
  if (typeof window !== 'undefined') {
    baseUrl = window.location.origin;
    console.log('Base URL:', baseUrl);
  }
  
  // Lazy load heavy components
  let TestimonialsSection;
  
  // For responsive design
  let windowWidth;
  let isVisible = {};
  
  // Touch tracking variables for mobile swipe
  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let swiping = false;
  
  // Handle touch events for swiping
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    swiping = true;
  }
  
  function handleTouchMove(e) {
    if (!swiping) return;
    touchEndX = e.touches[0].clientX;
  }
  
  function handleTouchEnd() {
    if (!swiping) return;
    
    const swipeDistance = touchEndX - touchStartX;
    const threshold = 50;
    
    if (swipeDistance > threshold) {
      prevSlide();
    } else if (swipeDistance < -threshold) {
      nextSlide();
    }
    
    swiping = false;
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % supportServices.length;
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + supportServices.length) % supportServices.length;
  }
  
  // OPTIMIZED: Local carousel images (WebP format, optimized sizes)
  const carouselImages = [
    '/above.webp',
    '/matyas.webp', 
    '/matyasii.webp',
    '/parlament.webp',
    '/prague.webp',
    '/stefan.webp',
    '/vajda.webp',
    '/var.webp'
  ];

  // Using local WebP images for better performance
  $: mainServices = [
    {
      id: "guidedTours",
      title: $t('home.services.services.0.title') || "Guided Tours",
      description: $t('home.services.services.0.description') || "Experience the rich history and culture of Central Europe with our expert local guides who bring destinations to life with insider knowledge.",
      icon: "fa-map-marked-alt",
      imageSrc: "/guided.webp",
      features: $t('home.services.services.0.features') || [
        "Small groups of max 12 travelers",
        "Expert university-educated guides", 
        "Hidden gems and local experiences",
        "Flexible and customizable itineraries"
      ]
    },
    {
      id: "multiCountry", 
      title: $t('home.services.services.1.title') || "Multi-Country Experience",
      description: $t('home.services.services.1.description') || "Seamlessly explore multiple European countries in one journey, experiencing the diverse cultures, cuisines, and landscapes of Central Europe.",
      icon: "fa-globe-europe",
      imageSrc: "/country.webp",
      features: $t('home.services.services.1.features') || [
        "Hassle-free border crossings",
        "Cohesive multi-country itineraries", 
        "Local guides in each location",
        "Comprehensive cultural immersion"
      ]
    },
    {
      id: "boatExperiences",
      title: $t('home.services.services.2.title') || "Scenic Boat Experiences", 
      description: $t('home.services.services.2.description') || "See iconic cities from their historic waterways with our exclusive boat tours and cruises, offering unique perspectives on riverside treasures.",
      icon: "fa-ship",
      imageSrc: "/river.webp",
      features: $t('home.services.services.2.features') || [
        "Intimate small-group cruises",
        "Sunset and evening illumination tours",
        "Historical commentary", 
        "Gourmet dining experiences"
      ]
    }
  ];
  
  // Support services that enhance the travel experience (SEPARATE from main services)
  $: supportServices = [
    {
      title: $t('home.supportServices.accommodation.title') || "Customized Accommodation",
      description: $t('home.supportServices.accommodation.description') || "From boutique hotels to historic properties, we arrange accommodations that match your style, comfort needs, and budget.",
      icon: "fa-hotel",
      color: "#1a5f7a"
    },
    {
      title: $t('home.supportServices.visa.title') || "Expert Visa Assistance",
      description: $t('home.supportServices.visa.description') || "Navigate complex visa requirements with ease through our expert team's guidance on documentation and procedures.",
      icon: "fa-passport",
      color: "#228291"
    },
    {
      title: $t('home.supportServices.transportation.title') || "Premium Transportation",
      description: $t('home.supportServices.transportation.description') || "Travel in comfort with our modern vehicles and expert drivers, enjoying the scenery between destinations.",
      icon: "fa-bus",
      color: "#2aa1b7"
    },
    {
      title: $t('home.supportServices.support.title') || "24/7 Support",
      description: $t('home.supportServices.support.description') || "Our dedicated team ensures your journey runs smoothly from start to finish.",
      icon: "fa-headset",
      color: "#113946"
    }
  ];
  
  // Destinations focus - make it reactive to translations
  $: destinations = [
    {
      country: $t('home.destinations.countries.hungary') || "Hungary",
      cities: [
        { 
          name: $t('home.destinations.cities.budapest') || "Budapest", 
          highlight: $t('home.destinations.highlights.budapest') || "Cultural Heart of Hungary" 
        },
        { 
          name: $t('home.destinations.cities.szentendre') || "Szentendre", 
          highlight: $t('home.destinations.highlights.szentendre') || "Artistic Riverside Town" 
        },
        { 
          name: $t('home.destinations.cities.visegrad') || "Visegrád", 
          highlight: $t('home.destinations.highlights.visegrad') || "Royal Castle on the Danube" 
        }
      ]
    },
    {
      country: $t('home.destinations.countries.austria') || "Austria",
      cities: [
        { 
          name: $t('home.destinations.cities.vienna') || "Vienna", 
          highlight: $t('home.destinations.highlights.vienna') || "City of Music & Dreams" 
        },
        { 
          name: $t('home.destinations.cities.salzburg') || "Salzburg", 
          highlight: $t('home.destinations.highlights.salzburg') || "Mozart's Birthplace" 
        }
      ]
    },
    {
      country: $t('home.destinations.countries.czechRepublic') || "Czech Republic",
      cities: [
        { 
          name: $t('home.destinations.cities.prague') || "Prague", 
          highlight: $t('home.destinations.highlights.prague') || "The Golden City" 
        },
        { 
          name: $t('home.destinations.cities.karlovyVary') || "Karlovy Vary", 
          highlight: $t('home.destinations.highlights.karlovyVary') || "Historic Spa Town" 
        }
      ]
    },
    {
      country: $t('home.destinations.countries.slovakia') || "Slovakia",
      cities: [
        { 
          name: $t('home.destinations.cities.bratislava') || "Bratislava", 
          highlight: $t('home.destinations.highlights.bratislava') || "The Little Big City" 
        }
      ]
    }
  ];
  
  // OPTIMIZED: Smaller testimonial images
  const testimonialsData = [
    {
      title: 'Great Work',
      content: "I think BuVipTur is the best tour company I've ever used. Amazing guides, easy to customize itineraries, and a quality experience from start to finish. The factory tour was incredible!",
      author: 'Sophie Anderson',
      position: 'Marketing Manager',
      imageId: '1580489944761-15a19d654956',
      rating: 5
    },
    {
      title: 'Unforgettable Experience',
      content: 'We had the most amazing time on our castle tour. The guide was knowledgeable and passionate, showing us hidden spots tourists normally miss. Can\'t wait to book our next adventure!',
      author: 'David Chen',
      position: 'Software Engineer',
      imageId: '1507003211169-0a1dd7228f2d',
      rating: 5
    }
  ];
  
  // OPTIMIZED: Intersection Observer with better performance
  function setupIntersectionObserver() {
    if (typeof window === 'undefined') return;
    
    const sections = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          isVisible[sectionId] = true;
          // Stop observing once visible to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.05, // Lower threshold for faster triggering
      rootMargin: '100px' // Trigger before element is fully visible
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return observer;
  }
  
  onMount(async () => {
    // Set up intersection observer
    setupIntersectionObserver();
    
    // Lazy load TestimonialsSection
    try {
      TestimonialsSection = (await import('$lib/components/TestimonialsSection.svelte')).default;
    } catch (error) {
      console.warn('Failed to load TestimonialsSection:', error);
    }
    
    // Optional: auto-rotate slides every 5 seconds
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>{$t('meta.title') || 'BuVipTur'} - {$t('meta.tagline') || 'Premium Central Europe Tours'}</title>
  <meta name="description" content={$t('meta.description') || 'Discover authentic Central Europe with BuVipTur. Expert guides, unique factory tours, cultural experiences across Hungary, Austria, Czech Republic, and beyond.'} />
  
  <!-- OPTIMIZED: Preload critical resources -->
  <link rel="preload" href="/above.webp" as="image">
  <link rel="dns-prefetch" href="//images.unsplash.com">
  
  <!-- OPTIMIZED: Reduced FontAwesome to only what we need -->
  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/fontawesome.min.css" as="style" on:load={(e) => { e.target.onload = null; e.target.rel = 'stylesheet'; }}>
  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/solid.min.css" as="style" on:load={(e) => { e.target.onload = null; e.target.rel = 'stylesheet'; }}>
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} />

<div class="min-h-screen flex flex-col">
  <Header />
  
  <main class="flex-grow">
    <!-- Hero Section -->
    <Hero {carouselImages} />
    
    <!-- Journey Promise Section -->
    <section class="py-16 bg-gradient-to-b from-teal-900 to-teal-800 text-white relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div class="absolute -right-24 top-0 w-96 h-96 bg-[#dcb660] rounded-full blur-3xl"></div>
        <div class="absolute -left-24 bottom-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-8 text-[#dcb660]">{$t('home.journeyPromise.title')}</h2>
          <p class="text-xl leading-relaxed mb-10">
            {$t('home.journeyPromise.description')}
          </p>
          <div class="flex justify-center gap-6 flex-wrap">
            <a href="/tours" class="px-8 py-3 bg-[#dcb660] text-teal-900 font-bold rounded-full hover:bg-white transition-colors shadow-lg">
              {$t('home.journeyPromise.cta')}
            </a>
            <a href="/services" class="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-teal-900 transition-colors shadow-lg">
              {$t('home.journeyPromise.cta2')}
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Main Services Showcase - Fixed Image Container Sizes -->
    <section id="services-showcase" class="py-20 bg-white animate-on-scroll">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-teal-900 mb-4">{$t('home.services.title')}</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {$t('home.services.subtitle')}
          </p>
        </div>
        
        <div class="space-y-24">
          {#each mainServices as service, i}
            <div class="service-container flex flex-col lg:flex-row {i % 2 === 1 ? 'lg:flex-row-reverse' : ''} gap-12 items-stretch">
              <!-- Image Section with Fixed Container -->
              <div class="service-image-wrapper w-full lg:w-1/2 transform transition-all duration-700 translate-y-4" 
                   class:translate-y-0={isVisible['services-showcase']} 
                   style="transition-delay: {i * 150}ms">
                
                <!-- Fixed height container to prevent layout shifts -->
                <div class="image-container relative overflow-hidden rounded-2xl shadow-xl bg-gray-200">
                  <!-- Placeholder background while image loads -->
                  <div class="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center z-1">
                    <div class="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                      <i class="fas {service.icon} text-2xl text-gray-600"></i>
                    </div>
                  </div>
                  
                  <!-- Service image -->
                  <div class="relative w-full h-64 md:h-96 bg-gray-200 overflow-hidden rounded-lg">
                    <img
                      src={service.imageSrc}
                      alt={service.title}
                      class="absolute inset-0 w-full h-full object-cover"
                      loading="eager"
                      width="800"
                      height="600"
                    />
                  </div>
                  
                  <!-- Overlay gradients -->
                  <div class="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent z-10"></div>
                  
                  <!-- Icon overlay -->
                  <div class="absolute top-6 left-6 w-16 h-16 bg-[#dcb660] text-white rounded-full flex items-center justify-center shadow-lg z-20">
                    <i class="fas {service.icon} text-2xl"></i>
                  </div>
                </div>
              </div>
              
              <!-- Content Section with Equal Height -->
              <div class="service-content-wrapper w-full lg:w-1/2 transform transition-all duration-700 translate-y-4 flex flex-col justify-center" 
                   class:translate-y-0={isVisible['services-showcase']} 
                   style="transition-delay: {(i * 150) + 100}ms">
                
                <div class="content-inner flex flex-col justify-center h-full">
                  <h3 class="text-3xl font-bold text-teal-900 mb-6 relative">
                    {service.title}
                    <span class="absolute -bottom-2 left-0 w-20 h-1 bg-[#dcb660]"></span>
                  </h3>
                  <p class="text-lg text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                  
                  <div class="features-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {#each service.features as feature}
                      <div class="feature-item flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                        <i class="fas fa-check-circle text-[#dcb660] mr-3 flex-shrink-0"></i>
                        <span class="text-gray-700 text-sm lg:text-base">{feature}</span>
                      </div>
                    {/each}
                  </div>
                  
                  <a href="/services" class="learn-more-link inline-flex items-center text-[#dcb660] font-semibold hover:text-teal-800 transition-colors duration-300">
                    <span>{$t('home.services.learnMore') || 'Learn More About Our Services'}</span>
                    <i class="fas fa-arrow-right ml-2 transition-transform duration-300 hover:translate-x-1"></i>
                  </a>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
    
    <!-- Support Services Section - Swipeable on Mobile (SEPARATE 4 SERVICES) -->
    <section id="support-services" class="relative py-16 md:py-24 overflow-hidden animate-on-scroll">
      <!-- Map Background -->
      <div class="absolute inset-0 z-0">
        <!-- OPTIMIZED: Use a smaller, optimized background image -->
        <div class="absolute inset-0 bg-[url('/map.webp')] bg-cover bg-center opacity-30"></div>
        <div class="absolute inset-0 bg-white/60"></div>
        <div class="absolute inset-0 bg-[#113946]/10"></div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <!-- Section Heading -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-[#dcb660]/10 border border-[#dcb660]/30 mb-4">
            <span class="text-[#dcb660] font-semibold">{$t('home.supportServices.title')}</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-[#113946] mb-4">
            {$t('home.supportServices.title')}
          </h2>
          <p class="text-lg md:text-xl text-[#113946]/80 max-w-2xl mx-auto">
            {$t('home.supportServices.subtitle')}
          </p>
        </div>
        
        <!-- Desktop: Horizontal Services Grid -->
        <div class="max-w-4xl mx-auto hidden md:block">
          <div class="grid grid-cols-2 gap-6">
            {#each supportServices as service, i}
              <div 
                class="transform transition-all duration-700 translate-y-4"
                class:translate-y-0={isVisible['support-services']}
                style="transition-delay: {i * 100}ms"
              >
                <div class="relative bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-[#113946]/10 h-full hover:shadow-md transition-all hover:-translate-y-1 duration-300 overflow-hidden">
                  <!-- Background Icon -->
                  <div class="absolute -right-4 -bottom-4 opacity-10 text-[#113946]">
                    <i class="fas {service.icon} text-8xl"></i>
                  </div>
                  
                  <!-- Icon Header -->
                  <div class="flex items-center mb-6 z-10 relative">
                    <div class="w-14 h-14 bg-gradient-to-br from-[#113946] to-[#1e4b5a] rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <i class="fas {service.icon} text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-[#113946]">{service.title}</h3>
                  </div>
                  
                  <div class="w-12 h-0.5 bg-[#dcb660] mb-4"></div>
                  
                  <p class="text-[#113946]/80 text-base leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Mobile: Swipeable Carousel -->
        <div 
          class="max-w-sm mx-auto md:hidden relative"
          on:touchstart={handleTouchStart}
          on:touchmove={handleTouchMove}
          on:touchend={handleTouchEnd}
        >
          <div class="overflow-hidden">
            <div 
              class="flex transition-transform duration-300 ease-out"
              style="transform: translateX(-{currentSlide * 100}%);"
            >
              {#each supportServices as service, i}
                <div class="w-full flex-shrink-0 px-2">
                  <div 
                    class="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-[#113946]/10 transform transition-all duration-700 translate-y-4"
                    class:translate-y-0={isVisible['support-services']}
                    style="transition-delay: {i * 100}ms"
                  >
                    <!-- Icon Header -->
                    <div class="flex items-center mb-4">
                      <div class="w-12 h-12 bg-[#113946] rounded-full flex items-center justify-center text-white mr-4">
                        <i class="fas {service.icon} text-xl"></i>
                      </div>
                      <h3 class="text-lg font-bold text-[#113946]">{service.title}</h3>
                    </div>
                    
                    <div class="w-12 h-0.5 bg-[#dcb660] mb-4"></div>
                    
                    <p class="text-[#113946]/80">
                      {service.description}
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
          
          <!-- Mobile Pagination Indicator -->
          <div class="flex justify-center mt-6 space-x-1.5" style="font-size: 0;">
            {#each supportServices as _, i}
              <button 
                class="rounded-full transition-all duration-300 {i === currentSlide ? 'bg-[#dcb660]' : 'bg-[#113946]/30'}"
                style="width: 6px; height: 6px; min-width: 6px; min-height: 6px; {i === currentSlide ? 'width: 16px; min-width: 16px;' : ''}"
                on:click={() => currentSlide = i}
                aria-label={`Go to service ${i + 1}`}
              ></button>
            {/each}
          </div>
          
          <!-- Mobile Swipe Hint -->
          <div class="text-center mt-4 text-sm text-[#113946]/60 italic">
            <span>Swipe to see more</span>
            <div class="flex justify-center mt-1">
              <i class="fas fa-arrow-left text-xs mr-3"></i>
              <i class="fas fa-arrow-right text-xs"></i>
            </div>
          </div>
        </div>
        
        <!-- CTA Button -->
        <div class="mt-10 text-center">
          <a 
            href="/services" 
            class="inline-flex items-center px-8 py-3 bg-[#dcb660] text-[#113946] font-medium rounded-lg hover:bg-[#113946] hover:text-white transition-colors shadow-sm"
          >
            <span>{$t('common.viewAllServices') || 'View All Services'}</span>
            <i class="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
    
    <!-- Destinations Highlight - Map-inspired Design -->
    <section id="destinations" class="py-20 bg-gray-50 animate-on-scroll relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-teal-900 mb-4">{$t('home.destinations.title')}</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {$t('home.destinations.subtitle')}
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {#each destinations as destination, i}
            <div 
              class="transform transition-all duration-700 translate-y-4" 
              class:translate-y-0={isVisible['destinations']}
              style="transition-delay: {i * 150}ms"
            >
              <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-900 to-teal-800 p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                <!-- Decorative elements -->
                <div class="absolute top-0 left-0 w-full h-full opacity-10">
                  <div class="absolute inset-0 bg-[#dcb660] rounded-full blur-3xl transform scale-75 translate-x-1/4 -translate-y-1/4"></div>
                </div>
                
                <div class="relative z-10">
                  <h3 class="text-2xl font-bold text-white mb-4">{destination.country}</h3>
                  <div class="space-y-3">
                    {#each destination.cities as city, j}
                      <div class="flex items-start group">
                        <i class="fas fa-map-marker-alt text-[#dcb660] mt-1 mr-3 text-sm"></i>
                        <div>
                          <h4 class="font-medium text-white">{city.name}</h4>
                          <p class="text-sm text-teal-100 italic">{city.highlight}</p>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
        
        <div class="mt-16 text-center">
          <a 
            href="/contact" 
            class="inline-flex items-center px-8 py-3 bg-[#dcb660] text-white rounded-lg hover:bg-[#dcb660]/90 transition-colors shadow-md"
          >
            <span>{$t('home.destinations.planJourney')}</span>
            <i class="fas fa-paper-plane ml-2"></i>
          </a>
        </div>
      </div>
    </section>
    
    <!-- OPTIMIZED: Lazy loaded Testimonials -->
    {#if TestimonialsSection}
      <svelte:component 
        this={TestimonialsSection}
        title={$t('home.testimonials.title')} 
        averageRating={parseFloat($t('home.testimonials.rating')) || 4.9} 
        reviewCount={$t('home.testimonials.reviewCount')} 
        certificationText={$t('home.testimonials.certification')} 
        testimonials={testimonialsData} 
      />
    {:else}
      <!-- Loading placeholder for testimonials -->
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center">
            <div class="animate-pulse bg-gray-300 h-8 w-64 mx-auto mb-8 rounded"></div>
            <div class="animate-pulse bg-gray-200 h-32 w-full max-w-4xl mx-auto rounded"></div>
          </div>
        </div>
      </section>
    {/if}
  </main>
  
</div>

<style>
  /* OPTIMIZED: Use transform for better performance */
  .translate-y-4 {
    transform: translateY(1rem);
    will-change: transform;
  }
  
  .translate-y-0 {
    transform: translateY(0);
    will-change: auto;
  }
  
  /* OPTIMIZED: Reduce animation overhead */
  .animate-on-scroll {
    contain: layout style paint;
  }
  
  /* OPTIMIZED: Hardware acceleration only when needed */
  .transform {
    transform: translateZ(0);
  }
  
  /* Scrollbar styling for category horizontal scroll on mobile */
  @media (max-width: 1024px) {
    ::-webkit-scrollbar {
      height: 6px;
    }
    
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #dcb660;
      border-radius: 3px;
    }
  }

  /* OPTIMIZED: Efficient animations */
  .transition-all {
    transition-property: transform, opacity, box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* OPTIMIZED: Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .transition-all,
    .animate-pulse {
      transition: none !important;
      animation: none !important;
    }
    
    .transform {
      transform: none !important;
    }
  }
  
  /* OPTIMIZED: Improve rendering performance */
  .container {
    contain: layout style;
  }
  
  /* OPTIMIZED: Better image loading */
  .image-content {
    content-visibility: auto;
    contain-intrinsic-size: 400px 300px;
  }
</style>