<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import DestinationsSection from '$lib/components/DestinationsSection.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import SubscribeSection from '$lib/components/SubscribeSection.svelte';
    import TourSection from '$lib/components/TourSection.svelte';
    import Button from '$lib/components/Button.svelte';
    import { onMount } from 'svelte';
    import { t, locale } from 'svelte-i18n';

    // Detailed tour with itinerary (from your screenshot) - using translations where available
    $: detailedTour = {
        title: 'Hungarian Heritage & Danube Bend Discovery',
        description: $t('tours.detailed.budapest.description') || 'Embark on a captivating journey through Hungary\'s most treasured historical sites. From the majestic Buda Castle to the charming Danube Bend towns, experience the rich heritage that shaped Central Europe.',
        duration: '2 Nights, 3 Days',
        image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=1000',
        languages: ['English', 'Hungarian', 'Turkish'],
        itinerary: [
            {
                day: 1,
                title: 'DAY 1',
                activities: [
                    { icon: 'fa-plane-arrival', text: 'Arrival in Budapest' },
                    { icon: 'fa-castle', text: 'Buda Castle and Fisherman\'s Bastion' },
                    { icon: 'fa-landmark', text: 'Explore Hungarian Parliament and St. Stephan\'s Basilica' },
                    { icon: 'fa-shopping-bag', text: 'Vaci Street and Great Market Hall' },
                    { icon: 'fa-ship', text: 'Danube River Cruise' }
                ]
            },
            {
                day: 2,
                title: 'DAY 2',
                activities: [
                    { icon: 'fa-bus', text: 'Hungarian Heritage Day Trip to' },
                    { icon: 'fa-church', text: 'Esztergom, Visegrád Castle, and' },
                    { icon: 'fa-map-marker-alt', text: 'Szentendre' },
                    { icon: 'fa-home', text: 'Return to Budapest' }
                ]
            },
            {
                day: 3,
                title: 'DAY 3',
                activities: [
                    { icon: 'fa-monument', text: 'See Heroes\' Square on a guided tour' },
                    { icon: 'fa-tree', text: 'Margaret Island' }
                ]
            }
        ]
    };

    // Tour categories with translations
    $: tourTypes = [
        {
            title: $t('tours.categories.historical.title') || 'Historical Budapest Tours',
            description: $t('tours.categories.historical.description') || 'Discover the rich history of Budapest through our expertly guided tours of iconic landmarks and hidden historical gems.',
            languages: ['English', 'Hungarian', 'Turkish'],
            image: 'https://images.unsplash.com/photo-1583091618471-bf133efb0a9c?q=80',
            highlights: $t('tours.categories.historical.highlights') || [
                'Buda Castle guided tour',
                'Parliament building visit',
                'Historical thermal baths',
                'Medieval Buda exploration'
            ],
            featured: true,
            duration: $t('tours.categories.historical.duration') || '4-6 hours'
        },
        {
            title: $t('tours.categories.cultural.title') || 'Cultural Immersion Experience',
            description: $t('tours.categories.cultural.description') || 'Experience authentic Hungarian culture through local traditions, cuisine, and artisan workshops.',
            languages: ['English', 'Hungarian', 'Turkish'],
            image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80',
            highlights: $t('tours.categories.cultural.highlights') || [
                'Traditional cooking classes',
                'Local artisan workshops',
                'Folk music performances',
                'Market and food tours'
            ],
            duration: $t('tours.categories.cultural.duration') || '5-7 hours'
        },
        {
            title: $t('tours.categories.multiCountry.title') || 'Vienna Imperial Day Trip',
            description: $t('tours.categories.multiCountry.description') || 'Step into the grandeur of the Austrian Empire with our exclusive day trip to Vienna.',
            languages: ['English', 'Hungarian', 'Turkish'],
            image: 'https://images.unsplash.com/photo-1516550893232-fe054840d3c2?q=80',
            highlights: $t('tours.categories.multiCountry.highlights') || [
                'Schönbrunn Palace visit',
                'Historic Old Town Vienna',
                'Traditional Viennese coffeehouse',
                'Mozart\'s Vienna walking tour'
            ],
            featured: true,
            duration: $t('tours.categories.multiCountry.duration') || 'Full day'
        },
        {
            title: 'Prague Castle & Old Town Discovery',
            description: 'Journey to the magical city of Prague and explore its stunning castle complex and charming old town squares.',
            languages: ['English', 'Hungarian', 'Turkish'],
            image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80',
            highlights: [
                'Prague Castle complex tour',
                'Old Town Square & Astronomical Clock',
                'Charles Bridge walk',
                'Traditional Czech beer tasting'
            ],
            duration: 'Full day'
        }
    ];

    // Fixed language mapping - use translation keys instead of complex conditionals
    $: tourLanguages = [
        { 
            key: 'english',
            name: $t('tours.languages.english.name'), 
            flag: $t('tours.languages.english.flag'), 
            available: true 
        },
        { 
            key: 'hungarian',
            name: $t('tours.languages.hungarian.name'), 
            flag: $t('tours.languages.hungarian.flag'), 
            available: true 
        },
        { 
            key: 'turkish',
            name: $t('tours.languages.turkish.name'), 
            flag: $t('tours.languages.turkish.flag'), 
            available: true 
        }
    ];

    // Language mapping for tour categories - maps display names to translation keys
    const languageMapping = {
        'English': 'english',
        'Hungarian': 'hungarian', 
        'Turkish': 'turkish'
    };

    // Why Choose Us content with translations
    $: benefits = [
        {
            icon: 'fa-users',
            title: $t('tours.whyChoose.smallGroups.title'),
            description: $t('tours.whyChoose.smallGroups.description')
        },
        {
            icon: 'fa-map-marked-alt',
            title: $t('tours.whyChoose.hiddenGems.title'),
            description: $t('tours.whyChoose.hiddenGems.description')
        },
        {
            icon: 'fa-clipboard-check',
            title: $t('tours.whyChoose.flexibility.title'),
            description: $t('tours.whyChoose.flexibility.description')
        },
    ];

    // Helper function to get language data for tour categories
    function getLanguageForTour(langName) {
        const langKey = languageMapping[langName];
        return tourLanguages.find(l => l.key === langKey) || { name: langName, flag: '🏳️' };
    }

    let animationClasses = {
        fadeIn: '',
        slideUp: '',
        scaleIn: ''
    };

    onMount(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    if (target.classList.contains('animate-on-scroll')) {
                        target.classList.add('animate');
                    }
                    // Also trigger for tour cards
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll, .tour-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(el);
        });

        // Set animation classes after mount
        animationClasses = {
            fadeIn: 'opacity-0 animate-on-scroll transition-all duration-1000 ease-out',
            slideUp: 'opacity-0 translate-y-8 animate-on-scroll transition-all duration-1000 ease-out',
            scaleIn: 'opacity-0 scale-95 animate-on-scroll transition-all duration-1000 ease-out'
        };

        return () => observer.disconnect();
    });

    function handleImageError(event) {
        event.target.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80';
    }
</script>

<svelte:head>
    <title>{$t('tours.title')} - BuVipTur</title>
    <meta name="description" content={$t('tours.meta.description')} />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <style>
        /* Custom animations and effects */
        .glassmorphism {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .gradient-overlay {
            background: linear-gradient(135deg, rgba(17, 57, 70, 0.8) 0%, rgba(220, 182, 96, 0.6) 100%);
        }
        
        .tour-card:hover .tour-image {
            transform: scale(1.05);
        }
        
        .itinerary-day {
            transition: all 0.3s ease;
        }
        
        .itinerary-day:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.12);
        }

        /* Clean day number styling */
        .day-number {
            background: linear-gradient(135deg, #dcb660 0%, #f4d06f 100%);
            box-shadow: 0 4px 15px rgba(220, 182, 96, 0.3);
        }

        .day-number-alt {
            background: linear-gradient(135deg, #113946 0%, #1a4f5f 100%);
            box-shadow: 0 4px 15px rgba(17, 57, 70, 0.3);
        }

        .day-number-final {
            background: linear-gradient(135deg, #dcb660 0%, #113946 100%);
            box-shadow: 0 4px 15px rgba(220, 182, 96, 0.4);
        }
    </style>
</svelte:head>

<Header />
<main class="bg-white">
    <!-- Hero Section -->
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">{$t('tours.title')}</h1>
            <p class="text-xl md:text-2xl mb-8">{$t('tours.subtitle')}</p>
        </div>
    </section>

    <!-- Tour Categories Section -->
    <section id="tour-categories" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-[#113946] mb-4">{$t('tours.categories.title')}</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    {$t('tours.categories.subtitle')}
                </p>
            </div>

            <!-- First Tour: Budapest Heritage with Detailed Itinerary -->
            <div class="space-y-32">
                <div class="tour-card flex flex-col lg:flex-row gap-12 items-stretch">
                    <!-- Image Section -->
                    <div class="w-full lg:w-1/2">
                        <div class="relative overflow-hidden rounded-2xl shadow-2xl h-[500px] group">
                            <img 
                                src={detailedTour.image} 
                                alt={detailedTour.title} 
                                class="tour-image w-full h-full object-cover transform transition-transform duration-700" 
                                loading="lazy"
                                on:error={handleImageError}
                            />
                            <!-- Gradient overlay -->
                            <div class="absolute inset-0 gradient-overlay opacity-60"></div>
                            
                            <!-- Duration pill (bottom left as requested) -->
                            <div class="absolute bottom-6 left-6">
                                <span class="glassmorphism text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg">
                                    <i class="fas fa-clock mr-2 text-[#dcb660]"></i>
                                    {detailedTour.duration}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Content Section -->
                    <div class="w-full lg:w-1/2 flex flex-col justify-center">
                        <div class="space-y-6">
                            <!-- Title -->
                            <div>
                                <h3 class="text-4xl font-bold text-[#113946] mb-4 relative">
                                    {detailedTour.title}
                                    <span class="absolute -bottom-2 left-0 w-20 h-1 bg-[#dcb660] rounded-full"></span>
                                </h3>
                                <p class="text-lg text-gray-600 leading-relaxed">
                                    {detailedTour.description}
                                </p>
                            </div>
                            
                            <!-- Language Section -->
                            <div class="mb-6">
                                <h4 class="font-semibold text-[#113946] mb-3 flex items-center">
                                    <i class="fas fa-language mr-2 text-[#dcb660]"></i> {$t('tours.languages.title')}
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    {#each detailedTour.languages as lang}
                                        {@const langData = getLanguageForTour(lang)}
                                        <span class="px-3 py-1 bg-gray-100 rounded-full text-gray-800 flex items-center">
                                            <span class="text-xl mr-2">{langData.flag}</span> 
                                            <span>{langData.name}</span>
                                        </span>
                                    {/each}
                                </div>
                            </div>
                            
                            <!-- Detailed Itinerary -->
                            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h4 class="text-2xl font-bold text-[#113946] mb-6 flex items-center">
                                    <i class="fas fa-route mr-3 text-[#dcb660]"></i>
                                    What you'll experience on your tour:
                                </h4>
                                
                                <div class="space-y-4">
                                    {#each detailedTour.itinerary as day, index}
                                        <div class="itinerary-day p-6 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-[#dcb660]/30">
                                            <div class="flex items-start space-x-4">
                                                <div class="flex-shrink-0">
                                                    <div class="w-12 h-12 {index === 0 ? 'day-number' : index === 1 ? 'day-number-alt' : 'day-number-final'} rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                        {day.day}
                                                    </div>
                                                </div>
                                                <div class="flex-1">
                                                    <h5 class="text-xl font-bold text-[#113946] mb-4">{day.title}</h5>
                                                    <div class="grid grid-cols-1 gap-3">
                                                        {#each day.activities as activity}
                                                            <div class="flex items-start space-x-3 p-3 rounded-lg bg-white/70 hover:bg-white transition-colors">
                                                                <i class="fas {activity.icon} text-[#dcb660] mt-1 flex-shrink-0"></i>
                                                                <span class="text-gray-700 leading-relaxed">{activity.text}</span>
                                                            </div>
                                                        {/each}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                            
                            <!-- CTA Button -->
                            <a 
                                href="/contact?tour={encodeURIComponent(detailedTour.title)}" 
                                class="inline-flex items-center px-8 py-4 bg-[#dcb660] text-white rounded-xl font-semibold text-lg hover:bg-[#dcb660]/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <span>{$t('tours.inquireAbout') || 'Inquire About'} {detailedTour.title}</span>
                                <i class="fas fa-arrow-right ml-3"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Other Tour Types with alternating layout -->
                {#each tourTypes as tour, i}
                    <div class="tour-card flex flex-col lg:flex-row {i % 2 === 0 ? 'lg:flex-row-reverse' : ''} gap-12 items-center">
                        <!-- Image Section -->
                        <div class="w-full lg:w-1/2">
                            <div class="relative overflow-hidden rounded-xl shadow-xl h-[350px]">
                                <img 
                                    src={tour.image} 
                                    alt={tour.title} 
                                    class="tour-image w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                                    loading="lazy"
                                    on:error={handleImageError}
                                />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                                
                                <!-- Duration pill (bottom left) -->
                                <div class="absolute bottom-0 left-0 w-full p-6">
                                    <span class="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm">
                                        {$t('tours.duration')}: {tour.duration}
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
                                    <i class="fas fa-language mr-2 text-[#dcb660]"></i> {$t('tours.languages.title')}
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    {#each tour.languages as lang}
                                        {@const langData = getLanguageForTour(lang)}
                                        <span class="px-3 py-1 bg-gray-100 rounded-full text-gray-800 flex items-center">
                                            <span class="text-xl mr-2">{langData.flag}</span> 
                                            <span>{langData.name}</span>
                                        </span>
                                    {/each}
                                </div>
                            </div>
                            
                            <!-- Highlights Section -->
                            <div class="mb-8">
                                <h4 class="font-semibold text-[#113946] mb-3 flex items-center">
                                    <i class="fas fa-map-marker-alt mr-2 text-[#dcb660]"></i> {$t('tours.categories.highlights')}
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
                                <span>{$t('tours.inquireAbout')} {tour.title}</span>
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
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{$t('tours.languages.title')}</h2>
                <p class="text-lg text-gray-600">
                    {$t('tours.languages.subtitle')}
                </p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {#each tourLanguages as language (language.key)}
                    <div class="bg-white rounded-xl p-4 shadow-md border-2 border-[#dcb660] flex flex-col items-center hover:shadow-lg transition-shadow">
                        <span class="text-4xl mb-2">{language.flag}</span>
                        <h3 class="text-lg font-bold text-gray-900">{language.name}</h3>
                        <span class="text-sm text-green-600">{$t('tours.languages.available')}</span>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Why Choose Us Section -->
    <WhyChooseUs 
        title={$t('tours.whyChoose.title')} 
        {benefits} 
        image="https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80"
    />

</main>
