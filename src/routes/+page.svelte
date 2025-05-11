<script>
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
  import ScrollToTopButton from '$lib/components/ScrollToTopButton.svelte';
  
  // For responsive design
  let windowWidth;
  let isVisible = {};
  
  // Images and data
  const carouselImages = [
    'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&q=80',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&q=80',
    'https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80'
  ];

  // Main services/products overview
  const mainServices = [
    {
      title: "Guided Tours",
      description: "Experience the rich history and culture of Central Europe with our expert local guides who bring destinations to life with insider knowledge.",
      icon: "fa-map-marked-alt",
      image: "https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80",
      features: [
        "Small groups of max 12 travelers",
        "Expert university-educated guides",
        "Hidden gems and local experiences",
        "Flexible and customizable itineraries"
      ]
    },
    {
      title: "Industrial Heritage Tours",
      description: "Discover the fascinating industrial past and present of Hungary with exclusive access to working factories and historic industrial sites.",
      icon: "fa-industry",
      image: "https://images.unsplash.com/photo-1543013309-0d1f4edeb868?q=80",
      features: [
        "Behind-the-scenes factory access",
        "Meet master craftspeople",
        "Industrial heritage exploration",
        "Small groups for optimal experience"
      ]
    },
    {
      title: "Multi-Country Experience",
      description: "Seamlessly explore multiple European countries in one journey, experiencing the diverse cultures, cuisines, and landscapes of Central Europe.",
      icon: "fa-globe-europe",
      image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80",
      features: [
        "Hassle-free border crossings",
        "Cohesive multi-country itineraries",
        "Local guides in each location",
        "Comprehensive cultural immersion"
      ]
    },
    {
      title: "Scenic Boat Experiences",
      description: "See iconic cities from their historic waterways with our exclusive boat tours and cruises, offering unique perspectives on riverside treasures.",
      icon: "fa-ship",
      image: "https://images.unsplash.com/photo-1588263823647-ce3546d42bfe?q=80",
      features: [
        "Intimate small-group cruises",
        "Sunset and evening illumination tours",
        "Historical commentary",
        "Gourmet dining experiences"
      ]
    }
  ];
  
  // Support services that enhance the travel experience
  const supportServices = [
    {
      title: "Tailored Accommodation",
      description: "From boutique hotels to historic properties, we arrange accommodations that match your style, comfort needs, and budget.",
      icon: "fa-hotel",
      color: "#1a5f7a"
    },
    {
      title: "Expert Visa Assistance",
      description: "Navigate complex visa requirements with our specialized team providing guidance on documentation and application procedures.",
      icon: "fa-passport",
      color: "#228291"
    },
    {
      title: "Premium Transportation",
      description: "Travel in comfort with our modern vehicles and expert drivers while you enjoy the scenery between destinations.",
      icon: "fa-bus",
      color: "#2aa1b7"
    },
    {
      title: "Support",
      description: "Our dedicated team ensures your journey runs smoothly from start to finish.",
      icon: "fa-headset",
      color: "#113946"
    }
  ];
  
  // Tour categories
  const tourCategories = [
    {
      title: "Historical Tours",
      description: "From medieval castles to WWII sites",
      icon: "fa-landmark",
      image: "https://images.unsplash.com/photo-1583091618471-bf133efb0a9c?q=80"
    },
    {
      title: "Cultural Immersion",
      description: "Experience local traditions and lifestyle",
      icon: "fa-theater-masks",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80"
    },
    {
      title: "Culinary Journeys",
      description: "Taste authentic regional cuisines",
      icon: "fa-utensils",
      image: "https://images.unsplash.com/photo-1521017090404-1526ca339f53?q=80"
    },
    {
      title: "Factory Tours",
      description: "Behind-the-scenes industrial experiences",
      icon: "fa-industry",
      image: "https://images.unsplash.com/photo-1543013309-0d1f4edeb868?q=80"
    }
  ];
  
  // Destinations focus
  const destinations = [
    { name: "Budapest", country: "Hungary", highlight: "Cultural Heart of Hungary" },
    { name: "Vienna", country: "Austria", highlight: "City of Music & Dreams" },
    { name: "Prague", country: "Czech Republic", highlight: "The Golden City" },
    { name: "Bratislava", country: "Slovakia", highlight: "The Little Big City" }
  ];
  
  const testimonialsData = [
    {
      title: 'Great Work',
      content: "I think BuVipTur is the best tour company I've ever used. Amazing guides, easy to customize itineraries, and a quality experience from start to finish. The factory tour was incredible!",
      author: 'Sophie Anderson',
      position: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80',
      rating: 5
    },
    {
      title: 'Unforgettable Experience',
      content: 'We had the most amazing time on our castle tour. The guide was knowledgeable and passionate, showing us hidden spots tourists normally miss. Can\'t wait to book our next adventure!',
      author: 'David Chen',
      position: 'Software Engineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80',
      rating: 5
    }
  ];
  
  // Fade-in animation for sections
  function setupIntersectionObserver() {
    const sections = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          isVisible[sectionId] = true;
        }
      });
    }, { threshold: 0.15 });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  onMount(() => {
    setupIntersectionObserver();
  });
</script>

<svelte:head>
  <title>BuVipTur - Extraordinary Central European Travel Experiences</title>
  <meta name="description" content="Discover Central Europe with BuVipTur's expert-guided tours, factory visits, river cruises, and seamless travel services. Unforgettable local experiences await." />
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} />

<div class="min-h-screen flex flex-col">
  <Header />
  
  <main class="flex-grow">
    <!-- Hero Section (Untouched as requested) -->
    <Hero {carouselImages} isMobile={windowWidth < 1024} />
    
    <!-- Journey Promise Section -->
    <section class="py-16 bg-gradient-to-b from-teal-900 to-teal-800 text-white relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div class="absolute -right-24 top-0 w-96 h-96 bg-[#dcb660] rounded-full blur-3xl"></div>
        <div class="absolute -left-24 bottom-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-8 text-[#dcb660]">Your Journey, Our Expertise</h2>
          <p class="text-xl leading-relaxed mb-10">
            BuVipTur specializes in creating authentic travel experiences across Central Europe, with a focus on Hungary's cultural treasures and industrial heritage. Whether you're seeking immersive local experiences, factory tours, castle explorations, or river cruises, our expert team crafts each journey with attention to detail and insider knowledge.
          </p>
          <div class="flex justify-center gap-6 flex-wrap">
            <a href="/tours" class="px-8 py-3 bg-[#dcb660] text-teal-900 font-bold rounded-full hover:bg-white transition-colors shadow-lg">
              Explore Tours
            </a>
            <a href="/services" class="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-teal-900 transition-colors shadow-lg">
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Main Services Showcase - Alternating Layout -->
    <section id="services-showcase" class="py-20 bg-white animate-on-scroll">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-teal-900 mb-4">Distinctive Travel Experiences</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in Central Europe with our signature experiences crafted to reveal the authentic heart of each destination.
          </p>
        </div>
        
        <div class="space-y-24">
          {#each mainServices as service, i}
            <div class="flex flex-col lg:flex-row {i % 2 === 1 ? 'lg:flex-row-reverse' : ''} gap-12 items-center">
              <!-- Image Section -->
              <div class="w-full lg:w-1/2 transform transition-all duration-700 translate-y-4" class:translate-y-0={isVisible['services-showcase']}  style="transition-delay: {i * 150}ms">
                <div class="relative overflow-hidden rounded-2xl shadow-xl">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    class="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-700" 
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent"></div>
                  <div class="absolute top-6 left-6 w-16 h-16 bg-[#dcb660] text-white rounded-full flex items-center justify-center shadow-lg">
                    <i class="fas {service.icon} text-2xl"></i>
                  </div>
                </div>
              </div>
              
              <!-- Content Section -->
              <div class="w-full lg:w-1/2 transform transition-all duration-700 translate-y-4" class:translate-y-0={isVisible['services-showcase']} style="transition-delay: {(i * 150) + 100}ms">
                <h3 class="text-3xl font-bold text-teal-900 mb-6 relative">
                  {service.title}
                  <span class="absolute -bottom-2 left-0 w-20 h-1 bg-[#dcb660]"></span>
                </h3>
                <p class="text-lg text-gray-600 mb-8">{service.description}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {#each service.features as feature}
                    <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow transition-shadow">
                      <i class="fas fa-check-circle text-[#dcb660] mr-3"></i>
                      <span class="text-gray-700">{feature}</span>
                    </div>
                  {/each}
                </div>
                
                <a href="/services" class="inline-flex items-center text-[#dcb660] font-semibold hover:text-teal-800 transition-colors">
                  <span>Learn more about our {service.title}</span>
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
    
    <!-- Support Services Section - Flowing Design -->
    <section id="support-services" class="py-20 bg-gray-50 animate-on-scroll">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-teal-900 mb-4">Comprehensive Travel Solutions</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            We handle all aspects of your journey so you can focus on creating memories.
          </p>
        </div>
        
        <div class="relative">
          <!-- Connecting line for desktop -->
          <div class="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-600 to-teal-900 transform -translate-x-1/2 z-0"></div>
          
          <div class="space-y-16 lg:space-y-24 relative z-10">
            {#each supportServices as service, i}
              <div class="transform transition-all duration-700 translate-y-4" class:translate-y-0={isVisible['support-services']} style="transition-delay: {i * 150}ms">
                <div class="flex flex-col lg:flex-row {i % 2 === 0 ? 'lg:items-start' : 'lg:flex-row-reverse lg:items-start'} gap-6 lg:gap-12">
                  <!-- Icon for larger screens -->
                  <div class="hidden lg:flex lg:w-1/2 {i % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}">
                    <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg" style="background-color: {service.color}">
                      <i class="fas {service.icon} text-3xl text-white"></i>
                    </div>
                  </div>
                  
                  <!-- Content box -->
                  <div class="lg:w-1/2 bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <!-- Icon for mobile -->
                    <div class="flex items-center mb-4 lg:hidden">
                      <div class="w-16 h-16 rounded-full flex items-center justify-center mr-4" style="background-color: {service.color}">
                        <i class="fas {service.icon} text-2xl text-white"></i>
                      </div>
                      <h3 class="text-2xl font-bold text-teal-900">{service.title}</h3>
                    </div>
                    
                    <!-- Title for desktop -->
                    <h3 class="hidden lg:block text-2xl font-bold text-teal-900 mb-4">{service.title}</h3>
                    
                    <p class="text-gray-600 text-lg">{service.description}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <div class="text-center mt-24">
          <a href="/services" class="inline-flex items-center px-8 py-3 bg-teal-800 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-md">
            <span>View All Our Services</span>
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
          <h2 class="text-3xl md:text-4xl font-bold text-teal-900 mb-4">Destinations We Serve</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the heart of Central Europe with our expertly crafted experiences.
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {#each destinations as destination, i}
            <div 
              class="transform transition-all duration-700 translate-y-4" 
              class:translate-y-0={isVisible['destinations']}
              style="transition-delay: {i * 150}ms"
            >
              <div class="relative overflow-hidden rounded-2xl aspect-square group bg-gradient-to-br from-teal-800 to-teal-900 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <!-- Decorative elements -->
                <div class="absolute top-0 left-0 w-full h-full opacity-10">
                  <div class="absolute inset-0 bg-[#dcb660] rounded-full blur-3xl transform scale-75 translate-x-1/4 -translate-y-1/4"></div>
                </div>
                
                <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 class="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                  <div class="w-12 h-1 bg-[#dcb660] rounded-full mb-3"></div>
                  <p class="text-white/80 mb-2">{destination.country}</p>
                  <p class="text-[#dcb660] font-medium text-sm mt-2 italic">"{destination.highlight}"</p>
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
            <span>Plan Your Journey</span>
            <i class="fas fa-paper-plane ml-2"></i>
          </a>
        </div>
      </div>
    </section>
    
    <!-- Testimonials -->
    <TestimonialsSection 
      title="What Our Travelers Say" 
      averageRating={4.9} 
      reviewCount="1000+" 
      certificationText="Certificate of Excellence" 
      testimonials={testimonialsData} 
    />
  </main>
  
  <Footer />
  <ScrollToTopButton />
</div>

<style>
  /* Custom animations */
  .translate-y-4 {
    transform: translateY(1rem);
  }
  
  .translate-y-0 {
    transform: translateY(0);
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
</style>