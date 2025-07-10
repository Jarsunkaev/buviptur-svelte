<script>
  import { onMount, onDestroy } from 'svelte';
  import { t } from 'svelte-i18n';
  import AOS from 'aos';
  import 'aos/dist/aos.css';
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
  
  // Destinations mobile scroll state
  let destinationScrollLeft = 0;
  let destinationScrollWidth = 0;
  let destinationClientWidth = 0;
  
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
  
  // Handle destination scroll for mobile indicators
  function handleDestinationScroll(e) {
    destinationScrollLeft = e.target.scrollLeft;
    destinationScrollWidth = e.target.scrollWidth - e.target.clientWidth;
  }
  
  // OPTIMIZED: Local carousel images (WebP format, optimized sizes)
  const carouselImages = [
    '/above.webp',
    '/matyas.webp',
    '/budapest.webp',
    '/parlament.webp',
    '/prague.webp',
    '/stefan.webp',
    '/vajda.webp',
    '/var.webp'
  ];
  
  // Keep hero mounted in memory
  let heroMounted = false;
  
  $: mainServices = [
    {
      id: "guidedTours",
      title: $t('home.services.services.0.title') || "Guided Tours",
      description: $t('home.services.services.0.description') || "Experience the rich history and culture of Central Europe with our expert local guides who bring destinations to life with insider knowledge.",
      icon: "fa-map-marked-alt",
      imageSrc: "/guided.webp",
      features: (() => {
        const features = $t('home.services.services.0.features');
        return Array.isArray(features) ? features : [
          "Small groups of max 12 travelers",
          "Expert university-educated guides",
          "Hidden gems and local experiences",
          "Flexible and customizable itineraries"
        ];
      })()
    },
    {
      id: "multiCountry",
      title: $t('home.services.services.1.title') || "Multi-Country Tours",
      description: $t('home.services.services.1.description') || "Seamlessly explore multiple European countries in one journey, experiencing the diverse cultures, cuisines, and landscapes of Central Europe.",
      icon: "fa-globe-europe",
      imageSrc: "/country.webp",
      features: (() => {
        const features = $t('home.services.services.1.features');
        return Array.isArray(features) ? features : [
          "Hassle-free border crossings",
          "Cohesive multi-country itineraries",
          "Local guides in each location",
          "Comprehensive cultural immersion"
        ];
      })()
    },
    {
      id: "riverCruises",
      title: $t('home.services.services.2.title') || "River Cruises",
      description: $t('home.services.services.2.description') || "See iconic cities from their historic waterways with our exclusive boat tours and cruises, offering unique perspectives on riverside treasures.",
      icon: "fa-ship",
      imageSrc: "/river.webp",
      features: (() => {
        const features = $t('home.services.services.2.features');
        return Array.isArray(features) ? features : [
          "Intimate small-group cruises",
          "Sunset and evening illumination tours",
          "Historical commentary",
          "Gourmet dining experiences"
        ];
      })()
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
  
  // Destinations focus - make it reactive to translations with enhanced data
  // Use your updated local WebP images for each country
  $: destinations = [
    {
      country: $t('home.destinations.countries.hungary') || "Hungary",
      image: "/magyar.webp",
      cities: [
        {
          name: $t('home.destinations.cities.budapest') || "Budapest",
          highlight: $t('home.destinations.highlights.budapest') || "Cultural Heart",
          icon: "fa-heart"
        },
        {
          name: $t('home.destinations.cities.szentendre') || "Szentendre",
          highlight: $t('home.destinations.highlights.szentendre') || "Artistic Town",
          icon: "fa-palette"
        },
        {
          name: $t('home.destinations.cities.visegrad') || "Visegrád",
          highlight: $t('home.destinations.highlights.visegrad') || "Royal Castle",
          icon: "fa-crown"
        },
        {
          name: $t('home.destinations.cities.esztergom') || "Esztergom",
          highlight: $t('home.destinations.highlights.esztergom') || "Basilica City",
          icon: "fa-church"
        }
      ]
    },
    {
      country: $t('home.destinations.countries.austria') || "Austria",
      image: "/ausztria.webp",
      cities: [
        {
          name: $t('home.destinations.cities.vienna') || "Vienna",
          highlight: $t('home.destinations.highlights.vienna') || "City of Music",
          icon: "fa-music"
        },
        {
          name: $t('home.destinations.cities.salzburg') || "Salzburg",
          highlight: $t('home.destinations.highlights.salzburg') || "Mozart's Birth",
          icon: "fa-star"
        }
      ]
    },
    {
      country: $t('home.destinations.countries.czechRepublic') || "Czech Republic",
      image: "/cseh.webp",
      cities: [
        {
          name: $t('home.destinations.cities.prague') || "Prague",
          highlight: $t('home.destinations.highlights.prague') || "The Golden City",
          icon: "fa-gem"
        },
        {
          name: $t('home.destinations.cities.karlovyVary') || "Karlovy Vary",
          highlight: $t('home.destinations.highlights.karlovyVary') || "Historic Spa",
          icon: "fa-hot-tub"
        }
      ]
    },
    {
      country: $t('home.destinations.countries.slovakia') || "Slovakia",
      image: "/pozsony.webp",
      cities: [
        {
          name: $t('home.destinations.cities.bratislava') || "Bratislava",
          highlight: $t('home.destinations.highlights.bratislava') || "Little Big City",
          icon: "fa-city"
        }
      ]
    }
  ];
  
  // Calculate active destination slide for mobile
  $: activeDestinationSlide = destinationScrollWidth > 0
    ? Math.round((destinationScrollLeft / destinationScrollWidth) * (destinations.length - 1))
    : 0;
  
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
  
  // Parallax effect for images
  function handleMouseMove(e) {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    const cards = document.querySelectorAll('.destination-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 30;
      const moveY = (y - centerY) / 30;
      
      const img = card.querySelector('img');
      if (img) {
        img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
      }
    });
  }
  
  function resetParallax() {
    const imgs = document.querySelectorAll('.destination-card img');
    imgs.forEach(img => {
      img.style.transform = 'scale(1.1) translate(0, 0)';
    });
  }
  
  // Handle AOS refresh when page is fully loaded
  function handleContentLoaded() {
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.refresh();
    }
  }
  
  onMount(async () => {
    // Keep hero mounted in memory
    heroMounted = true;
    // Lazy load testimonials
    import('$lib/components/TestimonialsSection.svelte')
      .then(module => {
        TestimonialsSection = module.default;
      })
      .catch(error => {
        console.warn('Failed to load TestimonialsSection:', error);
      });
    
    // Set up intersection observer
    setupIntersectionObserver();
    
    // Set up event listeners for parallax effect
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', resetParallax);
      
      // Handle AOS refresh after content is loaded
      if (document.readyState === 'complete') {
        handleContentLoaded();
      } else {
        window.addEventListener('load', handleContentLoaded);
      }
    }
    
    // Auto-rotate slides every 5 seconds
    const interval = setInterval(nextSlide, 5000);
    
    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', resetParallax);
        window.removeEventListener('load', handleContentLoaded);
      }
    };
  });
  
  onDestroy(() => {
    // Cleanup hero when component is destroyed
    heroMounted = false;
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
  
  <!-- Hero Section (outside main to prevent unmounting) -->
  {#if heroMounted}
    <Hero {carouselImages} />
  {/if}
  
  <main class="flex-grow">
    
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
                    <div class="w-16 h-16 bg-gray-4 rounded-full flex items-center justify-center">
                      <i class="fas {service.icon} text-2xl text-gray-600"></i>
                    </div>
                  </div>
                  
                  <!-- Service image -->
                  <div class="relative w-full h-64 md:h-96 bg-gray-200 overflow-hidden rounded-lg">
                    <!-- Only first image is loaded eagerly, others are lazy loaded -->
                    <img
                      src={service.imageSrc}
                      alt={service.title}
                      class="absolute inset-0 w-full h-full object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
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
                  <p class="text-lg text-gray-6 mb-8 leading-relaxed">{service.description}</p>
                  
                  <div class="features-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {#each service.features as feature}
                      <div class="feature-item flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                        <i class="fas fa-check-circle text-[#dcb660] mr-3 flex-shrink-0"></i>
                        <span class="text-gray-700 text-sm lg:text-base">{feature}</span>
                      </div>
                    {/each}
                  </div>
                  
                  <a href="/services" class="learn-more-link inline-flex items-center justify-center min-w-[280px] px-6 py-3 bg-[#dcb660] text-teal-900 font-semibold rounded-lg hover:bg-teal-800 hover:text-white transition-colors duration-300">
                    <span class="whitespace-nowrap">{$t('home.services.learnMore') || 'Learn More About Our Services'}</span>
                    <i class="fas fa-arrow-right ml-3 transition-transform duration-300 group-hover:translate-x-1"></i>
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
        <div class="text-center mb-12 px-4">
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
        <div class="w-full mx-auto md:hidden relative pb-16"
          on:touchstart={handleTouchStart}
          on:touchmove={handleTouchMove}
          on:touchend={handleTouchEnd}
        >
          <div class="overflow-visible px-2">
            <div
              class="flex transition-transform duration-300 ease-out"
              style="transform: translateX(-{currentSlide * 100}%);"
            >
              {#each supportServices as service, i}
                <div class="w-full flex-shrink-0 px-2">
                  <div
                    class="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-[#113946]/10 h-full flex flex-col min-h-[260px] text-center items-center"
                    class:translate-y-0={isVisible['support-services']}
                    style="transition-delay: {i * 100}ms;"
                  >
                    <!-- Icon Header -->
                    <div class="flex flex-col items-center mb-4 w-full">
                      <div class="w-12 h-12 bg-gradient-to-br from-[#113946] to-[#1e4b5a] rounded-full flex-shrink-0 flex items-center justify-center text-white mb-3">
                        <i class="fas {service.icon} text-lg"></i>
                      </div>
                      <h3 class="text-lg font-bold text-[#113946] leading-tight">{service.title}</h3>
                    </div>
                    
                    <div class="w-12 h-0.5 bg-[#dcb660] mb-4 mx-auto"></div>
                    
                    <p class="text-sm sm:text-base text-[#113946]/80 flex-grow px-2">
                      {service.description}
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
          
          <!-- Mobile Pagination Indicator -->
          <div class="flex justify-center mt-8 space-x-2" style="font-size: 0;">
            {#each supportServices as _, i}
              <button
                class="rounded-full transition-all duration-300 {i === currentSlide ? 'bg-[#dcb660]' : 'bg-[#113946]/30'}"
                style="width: 8px; height: 8px; min-width: 8px; min-height: 8px; {i === currentSlide ? 'width: 20px; min-width: 20px;' : ''}"
                on:click={() => currentSlide = i}
                aria-label={`Go to service ${i + 1}`}
              ></button>
            {/each}
          </div>
          
          <!-- Mobile Swipe Hint -->
          <div class="text-center mt-4 text-sm text=[#113946]/60">
            <span class="inline-block bg-white/50 px-3 py-1 rounded-full">Swipe to see more</span>
            <div class="flex justify-center mt-2">
              <i class="fas fa-arrow-left text-xs text-[#113946]/60 mr-3"></i>
              <i class="fas fa-arrow-right text-xs text-[#113946]/60"></i>
            </div>
          </div>
        </div>
        
        <!-- CTA Button -->
        <div class="mt-20 text-center">
          <a
            href="/services"
            class="inline-flex items-center justify-center min-w-[220px] px-8 py-3.5 bg-[#dcb660] text-[#113946] font-semibold rounded-lg hover:bg-[#113946] hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            <span class="whitespace-nowrap">{$t('common.viewAllServices') || 'View All Services'}</span>
            <i class="fas fa-arrow-right ml-3 transition-transform duration-300 group-hover:translate-x-1"></i>
          </a>
        </div>
      </div>
    </section>
    
    <!-- Destinations Word Cloud -->
    <section id="destinations" class="py-16 bg-gradient-to-b from-white to-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px=8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {$t('home.destinations.title') || 'Destinations We Serve'}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {$t('home.destinations.subtitle') || 'Explore our handpicked destinations across Europe'}
          </p>
        </div>
        
        <!-- Country Images Grid - 2x2 on mobile, single row on desktop -->
        <div class="w-full max-w-7xl mx-auto px-4 mb-12">
          <div class="grid grid-cols-2 md:flex md:flex-nowrap md:justify-center gap-4 md:gap-6">
            {#each destinations as dest}
              <div class="w-full md:w-56 lg:w-64 flex-shrink-0 relative overflow-hidden rounded-xl aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <img
                  src={dest.image}
                  alt={dest.country}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width="256"
                  height="341"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-3 md:p-4">
                  <h3 class="text-white font-bold text-base md:text-lg text-center">{dest.country}</h3>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Enhanced City Pills with Word Cloud Effect -->
        <div class="relative max-w-6xl mx-auto py-8 px-4">
          <div class="word-cloud-container flex flex-wrap justify-center items-center gap-2 sm:gap-3 px-2">
            {#each destinations.flatMap((d, i) => d.cities.map(city => ({ ...city, country: d.country, index: i }))) as city, i}
              <div
                class="word-cloud-tag group relative overflow-hidden
                       bg-white rounded-full px-5 py-2.5 sm:px-6 sm:py-3 shadow-sm
                       hover:shadow transition-all duration-300 border border-gray-100
                       hover:border-teal-100 transform hover:-translate-y-0.5
                       will-change-transform inline-flex flex-col items-center
                       m-1.5 sm:m-2 cursor-default select-none"
                style={`
                  --delay: ${i * 50}ms;
                  --rotate: ${(Math.random() * 8) - 4}deg;
                  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) var(--delay) both;
                  transform: rotate(var(--rotate));
                `}
              >
                <div class="flex flex-col items-center justify-center text-center">
                  <span class="text-lg sm:text-xl font-medium text-teal-900 group-hover:text-teal-700 transition-colors leading-tight">
                    {city.name}
                  </span>
                  <span class="text-sm sm:text-base text-teal-600/90 mt=0.5 sm:mt-1 leading-tight">
                    {city.highlight}
                  </span>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <style>
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .word-cloud-tag {
            will-change: transform, opacity;
            backface-visibility: hidden;
            user-select: none;
            pointer-events: none;
          }
        </style>
        
        <!-- CTA Button -->
        <div class="text-center mt-8">
          <a href="/contact" class="inline-flex items-center justify-center min-w-[260px] text-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3.5 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <span>{$t('home.destinations.cta') || 'Plan Your Journey'}</span>
            <i class="fas fa-arrow-right ml-3 transition-transform duration-300 group-hover:translate-x-1"></i>
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
  /* Journey path styling */
  .journey-path {
    background: linear-gradient(90deg,
      transparent 0%,
      #dcb660 10%,
      #dcb660 90%,
      transparent 100%);
    height: 3px;
    position: relative;
  }
  
  .journey-path::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(220, 182, 96, 0.3) 20%,
      rgba(220, 182, 96, 0.3) 80%,
      transparent 100%);
    transform: translateY(-50%);
  }
  
  /* Destination stop animations */
  .destination-stop {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
    cursor: pointer;
  }
  
  .destination-stop:hover {
    transform: translateY(-8px) scale(1.02);
  }
  
  /* Word Cloud Tag Styles */
  .word-cloud-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 0;
  }
  
  .word-cloud-tag {
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    transform: translateZ(0);
    backface-visibility: hidden;
    white-space: nowrap;
    cursor: pointer;
    will-change: transform;
    transform: none !important;
  }
  
  .word-cloud-tag:hover {
    transform: translateY(-2px) scale(1.05) !important;
    box-shadow: 0 8px 15px rgba(0,0,0,0.1) !important;
    z-index: 5;
  }
  
  /* Floating animation */
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    100% { transform: translateY(-5px) rotate(1deg); }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .word-cloud-tag {
      font-size: 0.8rem !important;
      padding: 0.35rem 0.7rem !important;
      margin: 0.15rem !important;
    }
    
    .word-cloud-container {
      gap: 0.25rem;
      padding: 0.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .word-cloud-tag {
      font-size: 0.75rem !important;
      padding: 0.3rem 0.6rem !important;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 639px) {
    .destination-card {
      min-height: 260px;
    }
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