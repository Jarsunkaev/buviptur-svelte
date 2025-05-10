<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import DestinationsSection from '$lib/components/DestinationsSection.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import SubscribeSection from '$lib/components/SubscribeSection.svelte';
    import TourSection from '$lib/components/TourSection.svelte';
    import Button from '$lib/components/Button.svelte';
    import LazyImage from '$lib/components/LazyImage.svelte';
    import { onMount } from 'svelte';

    // Tour categories with expanded details
    const tourTypes = [
        {
            title: 'Historical Tours',
            description: 'Dive deep into the rich history of Central Europe. Our expert guides bring centuries of stories to life, from medieval castles to World War II sites.',
            languages: ['English', 'Turkish', 'German', 'French'],
            image: 'https://images.unsplash.com/photo-1583091618471-bf133efb0a9c?q=80',
            highlights: [
                'Medieval Castle Tours in Hungary',
                'Habsburg Empire Historical Routes',
                'World War II Memorial Sites',
                'Ancient Roman Archaeological Tours'
            ],
            featured: true,
            duration: '1-5 days',
            startingPrice: 99
        },
        {
            title: 'Cultural Immersion Tours',
            description: 'Experience the authentic local culture, traditions, and daily life in Central European countries. Connect with local communities and understand their unique heritage.',
            languages: ['English', 'Turkish', 'French', 'Spanish'],
            image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80',
            highlights: [
                'Traditional Craft Workshops',
                'Local Cuisine and Cooking Classes',
                'Folk Music and Dance Experiences',
                'Community Interaction Programs'
            ],
            duration: '1-3 days',
            startingPrice: 89
        },
        {
            title: 'EU Multi-Country Tours',
            description: 'Explore multiple European countries in one comprehensive journey. Our multi-country tours offer a seamless travel experience across borders, highlighting the distinct character of each nation.',
            languages: ['English', 'Turkish', 'Spanish', 'Italian'],
            image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80',
            highlights: [
                'Hungary-Austria-Slovakia Circuit',
                'Czech Republic-Germany-Poland Route',
                'Balkans Cultural Expedition',
                'Western European Capital Cities Tour'
            ],
            featured: true,
            duration: '7-14 days',
            startingPrice: 199
        },
        {
            title: 'Specialized Thematic Tours',
            description: 'Tailored tours for specific interests, including wine tours, architectural journeys, and industrial heritage explorations. These unique experiences dive deep into your particular passions.',
            languages: ['English', 'Turkish', 'Italian', 'German'],
            image: 'https://images.unsplash.com/photo-1542301388-529ae0bc7d2a?q=80',
            highlights: [
                'Wine Tasting Routes in Hungary',
                'Architectural Photography Tours',
                'Industrial Heritage and Factory Tours',
                'Art and Museum Exploration'
            ],
            duration: '1-4 days',
            startingPrice: 129
        }
    ];

    // Available languages with flags
    const tourLanguages = [
        { name: 'English', flag: '🇬🇧', available: true },
        { name: 'Turkish', flag: '🇹🇷', available: true },
        { name: 'German', flag: '🇩🇪', available: true },
        { name: 'French', flag: '🇫🇷', available: true },
        { name: 'Spanish', flag: '🇪🇸', available: true },
        { name: 'Italian', flag: '🇮🇹', available: true },
        { name: 'Russian', flag: '🇷🇺', available: false },
        { name: 'Japanese', flag: '🇯🇵', available: false }
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
            price: 125,
            badge: 'BESTSELLER'
        },
        {
            title: 'Factory Heritage Exploration',
            image: 'https://images.unsplash.com/photo-1518329643691-4ebe15596706?q=80',
            location: 'Budapest, Hungary',
            rating: 4.9,
            reviews: 186,
            duration: '1 day',
            price: 89,
            badge: 'NEW'
        },
        {
            title: 'Hungarian Culinary Journey',
            image: 'https://images.unsplash.com/photo-1521017090404-1526ca339f53?q=80',
            location: 'Budapest, Hungary',
            rating: 4.7,
            reviews: 152,
            duration: '1 day',
            price: 75
        },
        {
            title: 'Vienna Day Trip',
            image: 'https://images.unsplash.com/photo-1516550893232-fe054840d3c2?q=80',
            location: 'Vienna, Austria',
            rating: 4.6,
            reviews: 97,
            duration: '1 day',
            price: 145,
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

    // Initialize flatpickr datepicker
    let flatpickrInstance = null;
    onMount(() => {
        const initFlatpickr = async () => {
            if (typeof window !== 'undefined') {
                try {
                    const module = await import('flatpickr');
                    const flatpickr = module.default;
                    const tourDateInput = document.getElementById('tourDate');
                    
                    if (tourDateInput) {
                        flatpickrInstance = flatpickr(tourDateInput, {
                            dateFormat: 'Y-m-d',
                            minDate: 'today',
                            disable: [
                                function(date) {
                                    // Disable Mondays (1) in this example
                                    return date.getDay() === 1;
                                }
                            ]
                        });
                    }
                } catch (error) {
                    console.error('Failed to load flatpickr:', error);
                }
            }
        };

        initFlatpickr();

        return () => {
            // Cleanup function to destroy flatpickr instance
            if (flatpickrInstance) {
                flatpickrInstance.destroy();
            }
        };
    });
</script>

<svelte:head>
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
                <Button 
                    variant="primary"
                    size="lg"
                    href="#featured-tours"
                >
                    View Featured Tours
                </Button>
                <Button 
                    variant="outline"
                    size="lg"
                    href="#tour-categories"
                >
                    Explore Categories
                </Button>
            </div>
        </div>
    </section>

    <!-- Tour filter section -->
    <section class="py-8 bg-gray-50 sticky top-20 z-20 shadow-md">
        <div class="container mx-auto px-4">
            <div class="flex flex-wrap items-center justify-center gap-4">
                <button 
                    class={`px-6 py-2 rounded-full transition-all ${activeFilter === 'all' ? 'bg-[#dcb660] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    on:click={() => filterTours('all')}
                >
                    All Tours
                </button>
                <button 
                    class={`px-6 py-2 rounded-full transition-all ${activeFilter === 'historical' ? 'bg-[#dcb660] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    on:click={() => filterTours('historical')}
                >
                    Historical
                </button>
                <button 
                    class={`px-6 py-2 rounded-full transition-all ${activeFilter === 'cultural' ? 'bg-[#dcb660] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    on:click={() => filterTours('cultural')}
                >
                    Cultural
                </button>
                <button 
                    class={`px-6 py-2 rounded-full transition-all ${activeFilter === 'factory' ? 'bg-[#dcb660] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    on:click={() => filterTours('factory')}
                >
                    Factory & Industrial
                </button>
                <button 
                    class={`px-6 py-2 rounded-full transition-all ${activeFilter === 'multi-country' ? 'bg-[#dcb660] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    on:click={() => filterTours('multi-country')}
                >
                    Multi-Country
                </button>
            </div>
        </div>
    </section>

    <!-- Featured Tours Section -->
    <section id="featured-tours" class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Tours</h2>
                <p class="text-lg text-gray-600">
                    Our most popular experiences, curated to showcase the best of Central Europe.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {#each featuredTours as tour}
                    <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
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
                                <button 
                                    class="bg-[#dcb660] text-white px-4 py-2 rounded-lg hover:bg-[#dcb660]/90 transition-colors"
                                    on:click={toggleBookingForm}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
            
            <div class="text-center mt-12">
                <Button 
                    variant="secondary"
                    size="lg"
                    href="#"
                >
                    View All Tours <i class="fas fa-arrow-right ml-2"></i>
                </Button>
            </div>
        </div>
    </section>

    <!-- Tour Categories Section -->
    <section id="tour-categories" class="py-16 bg-gray-50">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-[#113946] mb-4">Explore Our Unique Tour Experiences</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Immerse yourself in the heart of Central Europe with our meticulously crafted tours, offering deep cultural insights and unforgettable experiences.
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {#each tourTypes as tour}
                    <div class="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-[1.02]">
                        <div class="relative">
                            <img 
                                src={tour.image} 
                                alt={tour.title} 
                                class="w-full h-64 object-cover" 
                            />
                            {#if tour.featured}
                                <div class="absolute top-4 right-4 bg-[#dcb660] text-white px-3 py-1 rounded-full text-sm">
                                    Featured
                                </div>
                            {/if}
                            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                                <h3 class="text-2xl font-bold mb-2">{tour.title}</h3>
                                <div class="flex justify-between">
                                    <span>Starting at <strong class="text-[#dcb660]">${tour.startingPrice}</strong></span>
                                    <span>{tour.duration}</span>
                                </div>
                            </div>
                        </div>
                        <div class="p-6">
                            <p class="text-gray-600 mb-4">{tour.description}</p>
                            <div class="mb-4">
                                <h4 class="font-semibold text-[#113946] mb-2">Available Languages:</h4>
                                <div class="flex space-x-2">
                                    {#each tour.languages as lang}
                                        <span class="text-lg">
                                            {tourLanguages.find(l => l.name === lang)?.flag} {lang}
                                        </span>
                                    {/each}
                                </div>
                            </div>
                            <div class="mb-4">
                                <h4 class="font-semibold text-[#113946] mb-2">Tour Highlights:</h4>
                                <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                                    {#each tour.highlights as highlight}
                                        <li class="flex items-start">
                                            <i class="fas fa-check-circle text-[#dcb660] mt-1 mr-2"></i>
                                            <span>{highlight}</span>
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                            <div class="text-center mt-6">
                                <Button 
                                    variant="primary"
                                    size="md"
                                    href="#"
                                >
                                    Explore {tour.title}
                                </Button>
                            </div>
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
            
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {#each tourLanguages as language}
                    <div class="bg-white rounded-xl p-4 shadow-md border-2 {language.available ? 'border-[#dcb660]' : 'border-gray-200'} flex flex-col items-center hover:shadow-lg transition-shadow">
                        <span class="text-4xl mb-2">{language.flag}</span>
                        <h3 class="text-lg font-bold text-gray-900">{language.name}</h3>
                        <span class="text-sm {language.available ? 'text-green-600' : 'text-gray-400'}">
                            {language.available ? 'Available' : 'Coming Soon'}
                        </span>
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
                                <option value={tour.title}>{tour.title} - ${tour.price}</option>
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

    <SubscribeSection
        title="Get Tour Updates"
        description="Subscribe to receive new tour announcements, seasonal special offers, and travel tips."
    />
</main>
<Footer />