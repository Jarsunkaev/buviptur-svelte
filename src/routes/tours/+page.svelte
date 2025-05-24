<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import DestinationsSection from '$lib/components/DestinationsSection.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import SubscribeSection from '$lib/components/SubscribeSection.svelte';
    import TourSection from '$lib/components/TourSection.svelte';
    import Button from '$lib/components/Button.svelte';
    import ScrollToTopButton from '$lib/components/ScrollToTopButton.svelte';
    import { onMount } from 'svelte';

    // Tour categories with expanded details
    const tourTypes = [
        {
            title: 'Historical Tours',
            description: 'Dive deep into the rich history of Central Europe. Our expert guides bring centuries of stories to life, from medieval castles to World War II sites.',
            languages: ['English', 'Hungarian', 'Turkish'],
            image: 'https://images.unsplash.com/photo-1583091618471-bf133efb0a9c?q=80',
            highlights: [
                'Medieval Castle Tours in Hungary',
                'Habsburg Empire Historical Routes',
                'World War II Memorial Sites',
                'Ancient Roman Archaeological Tours'
            ],
            featured: true,
            duration: '1-5 days'
        },
        {
            title: 'Cultural Immersion Tours',
            description: 'Experience the authentic local culture, traditions, and daily life in Central European countries. Connect with local communities and understand their unique heritage.',
            languages: ['English', 'Hungarian', 'Turkish'],
            image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80',
            highlights: [
                'Traditional Craft Workshops',
                'Local Cuisine and Cooking Classes',
                'Folk Music and Dance Experiences',
                'Community Interaction Programs'
            ],
            duration: '1-3 days'
        },
        {
            title: 'EU Multi-Country Tours',
            description: 'Explore multiple European countries in one comprehensive journey. Our multi-country tours offer a seamless travel experience across borders, highlighting the distinct character of each nation.',
            languages: ['English', 'Hungarian', 'Turkish'],
            image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80',
            highlights: [
                'Hungary-Austria-Slovakia Circuit',
                'Czech Republic-Germany-Poland Route',
                'Balkans Cultural Expedition',
                'Western European Capital Cities Tour'
            ],
            featured: true,
            duration: '7-14 days'
        }
    ];

    // Available languages with flags
    const tourLanguages = [
        { name: 'English', flag: '🇬🇧', available: true },
        { name: 'Hungarian', flag: '🇭🇺', available: true },
        { name: 'Turkish', flag: '🇹🇷', available: true }
    ];

    // Sample tour data
    const featuredTours = [
        {
            title: 'Budapest Castle Tour',
            image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80',
            location: 'Budapest, Hungary',
            rating: 4.8,
            reviews: 243,
            duration: '1 day',
            badge: 'BESTSELLER'
        },
        {
            title: 'Factory Heritage Exploration',
            image: 'https://images.unsplash.com/photo-1518329643691-4ebe15596706?q=80',
            location: 'Budapest, Hungary',
            rating: 4.9,
            reviews: 186,
            duration: '1 day',
            badge: 'NEW'
        },
        {
            title: 'Hungarian Culinary Journey',
            image: 'https://images.unsplash.com/photo-1521017090404-1526ca339f53?q=80',
            location: 'Budapest, Hungary',
            rating: 4.7,
            reviews: 152,
            duration: '1 day'
        },
        {
            title: 'Vienna Day Trip',
            image: 'https://images.unsplash.com/photo-1516550893232-fe054840d3c2?q=80',
            location: 'Vienna, Austria',
            rating: 4.6,
            reviews: 97,
            duration: '1 day',
            badge: 'POPULAR'
        }
    ];

    // Tour testimonials
    const testimonials = [
        {
            title: 'Incredible Castle Experience',
            content: "The Budapest Castle Tour exceeded all my expectations. Our guide was incredibly knowledgeable about Hungarian history and showed us hidden spots tourists never find. The small group size made it feel like a private tour!",
            author: 'James Wilson',
            position: 'London, UK',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80',
            rating: 5
        },
        {
            title: 'Factory Tour Highlight of Our Trip',
            content: 'The industrial heritage tour gave us such a unique perspective on Budapest. Seeing active factories and learning about the craftsmanship was fascinating. Our guide made complex manufacturing processes easy to understand.',
            author: 'Maria González',
            position: 'Barcelona, Spain',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80',
            rating: 5
        }
    ];

    // Why Choose Us content
    const benefits = [
        {
            icon: 'fa-users',
            title: 'Small Group Sizes',
            description: 'With maximum 12 travelers per tour, you will enjoy personal attention and an intimate experience.'
        },
        {
            icon: 'fa-map-marked-alt',
            title: 'Hidden Gems Access',
            description: 'Our local connections give you access to places and experiences you will not find in guidebooks.'
        },
        {
            icon: 'fa-clipboard-check',
            title: 'Flexibility & Customization',
            description: 'We tailor each tour to match your interests, pace, and preferences for a truly personalized journey.'
        },
    ];

    const stats = [
        { value: '100+', label: 'Unique Tours' },
        { value: '12', label: 'Max Group Size' },
        { value: '48', label: 'Local Guides' },
        { value: '9.8/10', label: 'Satisfaction Rate' }
    ];

    // Active filter
    let activeFilter = 'all';
    
    // Filter tours function
    function filterTours(filter) {
        activeFilter = filter;
        // In a real app, this would filter the displayed tours
    }

    // Tour booking form state
    let selectedTour = '';
    let tourDate = '';
    let participants = 2;
    let showBookingForm = false;
    
    function toggleBookingForm() {
        showBookingForm = !showBookingForm;
    }

    // Handle form submission
    function handleBookingSubmit() {
        // In a real app, this would process the booking
        alert('Booking submitted successfully! We will contact you soon.');
        showBookingForm = false;
    }

    // Handle image error
    function handleImageError(event) {
        event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" fill="%23f0f0f0"><rect width="100%" height="100%" fill="%23f0f0f0"/></svg>';
        event.target.alt = 'Image placeholder';
    }

    // Initialize flatpickr datepicker
    onMount(() => {
        if (typeof window !== 'undefined') {
            import('flatpickr').then(module => {
                const flatpickr = module.default;
                flatpickr('#tourDate', {
                    dateFormat: 'Y-m-d',
                    minDate: 'today',
                    disable: [
                        function(date) {
                            // Disable Mondays (1) in this example
                            return date.getDay() === 1;
                        }
                    ]
                });
            });
        }
    });
</script>

<svelte:head>
    <title>Our Tours - BuVipTur</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
</svelte:head>

<Header />
<main class="bg-white">
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">Our Tours</h1>
            <p class="text-xl md:text-2xl mb-8">Discover extraordinary journeys tailored to your wanderlust</p>
            <div class="flex flex-wrap gap-4 justify-center">
            
               
            </div>
        </div>
    </section>


    <!-- Tour Categories Section -->
    <!-- Tour Categories Section with Modern Alternating Layout -->
<section id="tour-categories" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-[#113946] mb-4">Explore Our Unique Tour Experiences</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Immerse yourself in the heart of Central Europe with our meticulously crafted tours, offering deep cultural insights and unforgettable experiences.
        </p>
      </div>
  
      <!-- Tour Types with alternating layout -->
      <div class="space-y-24">
        {#each tourTypes as tour, i}
          <div class="flex flex-col lg:flex-row {i % 2 === 1 ? 'lg:flex-row-reverse' : ''} gap-12 items-center">
            <!-- Image Section -->
            <div class="w-full lg:w-1/2">
              <div class="relative overflow-hidden rounded-xl shadow-xl h-[350px]">
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                  loading="lazy"
                  on:error={handleImageError}
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                {#if tour.featured}
                  <div class="absolute top-4 right-4 bg-[#dcb660] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Featured
                  </div>
                {/if}
                <div class="absolute bottom-0 left-0 w-full p-6">
                  <span class="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm">
                    Duration: {tour.duration}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Content Section -->
            <div class="w-full lg:w-1/2">
              <h3 class="text-3xl font-bold text-[#113946] mb-4 relative">
                {tour.title}
                <span class="absolute -bottom-2 left-0 w-16 h-1 bg-[#dcb660]"></span>
              </h3>
              <p class="text-lg text-gray-600 mb-6">{tour.description}</p>
              
              <!-- Language Section -->
              <div class="mb-6">
                <h4 class="font-semibold text-[#113946] mb-3 flex items-center">
                  <i class="fas fa-language mr-2 text-[#dcb660]"></i> Available Languages
                </h4>
                <div class="flex flex-wrap gap-3">
                  {#each tour.languages as lang}
                    <span class="px-3 py-1 bg-gray-100 rounded-full text-gray-800 flex items-center">
                      <span class="text-xl mr-2">{tourLanguages.find(l => l.name === lang)?.flag}</span> 
                      <span>{lang}</span>
                    </span>
                  {/each}
                </div>
              </div>
              
              <!-- Highlights Section -->
              <div class="mb-8">
                <h4 class="font-semibold text-[#113946] mb-3 flex items-center">
                  <i class="fas fa-map-marker-alt mr-2 text-[#dcb660]"></i> Tour Highlights
                </h4>
                <div class="grid grid-cols-1 gap-y-3">
                  {#each tour.highlights as highlight}
                    <div class="flex items-start bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <i class="fas fa-check-circle text-[#dcb660] mt-1 mr-3 flex-shrink-0"></i>
                      <span class="text-gray-700">{highlight}</span>
                    </div>
                  {/each}
                </div>
              </div>
              
              <!-- CTA Button -->
              <a 
                href="/contact?tour={encodeURIComponent(tour.title)}" 
                class="inline-flex items-center px-6 py-3 bg-[#dcb660] text-white rounded-lg hover:bg-[#dcb660]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <span>Inquire About {tour.title}</span>
                <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
    
    <!-- Tour Languages Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Tour Languages</h2>
                <p class="text-lg text-gray-600">
                    We offer tours in multiple languages to ensure you have the best possible experience.
                </p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {#each tourLanguages as language}
                    <div class="bg-white rounded-xl p-4 shadow-md border-2 border-[#dcb660] flex flex-col items-center hover:shadow-lg transition-shadow">
                        <span class="text-4xl mb-2">{language.flag}</span>
                        <h3 class="text-lg font-bold text-gray-900">{language.name}</h3>
                        <span class="text-sm text-green-600">Available</span>
                    </div>
                {/each}
            </div>
        </div>
    </section>
    
    <!-- Booking Modal -->
    {#if showBookingForm}
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" 
            on:click={toggleBookingForm}
            on:keydown={(e) => e.key === 'Escape' && toggleBookingForm()}
            role="dialog button"
            aria-modal="true"
            aria-label="Close booking form"
            tabindex="0"
        >
            <div 
                class="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl" 
                on:click|stopPropagation
                on:keydown|stopPropagation
            >
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">Quick Booking</h3>
                    <button 
                        on:click={toggleBookingForm} 
                        class="text-gray-600 hover:text-gray-900"
                        aria-label="Close booking form"
                    >
                        <i class="fas fa-times text-xl" aria-hidden="true"></i>
                    </button>
                </div>
                
                <form on:submit|preventDefault={handleBookingSubmit} class="space-y-6">
                    <div>
                        <label for="tourSelect" class="block text-sm font-medium text-gray-700 mb-1">Select Tour</label>
                        <select 
                            id="tourSelect" 
                            bind:value={selectedTour}
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                            required
                        >
                            <option value="">-- Select a Tour --</option>
                            {#each featuredTours as tour}
                                <option value={tour.title}>{tour.title}</option>
                            {/each}
                        </select>
                    </div>
                    
                    <div>
                        <label for="tourDate" class="block text-sm font-medium text-gray-700 mb-1">Tour Date</label>
                        <input 
                            type="text" 
                            id="tourDate" 
                            bind:value={tourDate} 
                            placeholder="Select date"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                            required
                        />
                    </div>
                    
                    <div>
                        <label for="participants" class="block text-sm font-medium text-gray-700 mb-1">Number of Participants</label>
                        <input 
                            type="number" 
                            id="participants" 
                            bind:value={participants} 
                            min="1" 
                            max="12"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                            required
                        />
                    </div>
                    
                    <div class="pt-4">
                        <button 
                            type="submit"
                            class="w-full bg-[#dcb660] text-white py-3 rounded-md hover:bg-[#c2a050] transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                        <p class="text-center text-sm text-gray-500 mt-4">
                            No payment required now - we'll contact you to confirm availability
                        </p>
                    </div>
                </form>
            </div>
        </div>
    {/if}

    <WhyChooseUs 
        title="Why Choose Our Tours" 
        benefits={benefits} 
        stats={stats} 
        image="https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80"
    />

    <TestimonialsSection 
        title="What Our Travelers Say" 
        averageRating={4.9} 
        reviewCount="1000+" 
        certificationText="Certificate of Excellence" 
        testimonials={testimonials} 
    />

</main>
<Footer />
<ScrollToTopButton />