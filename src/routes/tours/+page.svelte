<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import { onMount } from 'svelte';
    import { t, locale } from 'svelte-i18n';
    import { fade, fly } from 'svelte/transition';
    import { languages } from '$lib/i18n/index.js';

    // Modal state
    let showModal = false;
    let selectedTour = null;

    // Tour data
    $: tours = [
        {
            id: 'budapest',
            title: $t('tours.detailed.budapest.title') || 'Hungarian Heritage & Danube Bend Discovery',
            subtitle: $t('tours.detailed.budapest.subtitle') || 'Budapest - Esztergom - Visegrád - Szentendre',
            description: $t('tours.detailed.budapest.description') || 'Embark on a captivating journey through Hungary\'s most treasured historical sites. From the majestic Buda Castle to the charming Danube Bend towns, experience the rich heritage that shaped Central Europe.',
            duration: $t('tours.detailed.budapest.duration') || '2 Nights, 3 Days',
            mainImage: 'parli.webp',
            languages: languages,
            summary: $t('tours.detailed.budapest.summary') || 'Experience the best of Hungary\'s rich cultural heritage and stunning Danube bend landscapes in this comprehensive 3-day adventure.',
            destinations: $t('tours.detailed.budapest.destinations') || 'Budapest • Esztergom • Visegrád • Szentendre',
            itinerary: [
                {
                    day: 1,
                    title: $t('tours.detailed.budapest.day1.title') || 'Day 1',
                    image: 'maty.webp',
                    activities: [
                        $t('tours.detailed.budapest.day1.activities.arrival') || 'Arrival in Budapest',
                        $t('tours.detailed.budapest.day1.activities.castle') || 'Buda Castle and Fisherman\'s Bastion',
                        $t('tours.detailed.budapest.day1.activities.parliament') || 'Explore Hungarian Parliament and St. Stephen\'s Basilica',
                        $t('tours.detailed.budapest.day1.activities.shopping') || 'Vaci Street and Great Market Hall',
                        $t('tours.detailed.budapest.day1.activities.cruise') || 'Danube River Cruise'
                    ]
                },
                {
                    day: 2,
                    title: $t('tours.detailed.budapest.day2.title') || 'Day 2',
                    image: 'eszti.webp',
                    activities: [
                        $t('tours.detailed.budapest.day2.activities.dayTrip') || 'Hungarian Heritage Day Trip',
                        $t('tours.detailed.budapest.day2.activities.esztergom') || 'Visit Esztergom Basilica',
                        $t('tours.detailed.budapest.day2.activities.visegrad') || 'Explore Visegrád Castle',
                        $t('tours.detailed.budapest.day2.activities.szentendre') || 'Discover charming Szentendre town',
                        $t('tours.detailed.budapest.day2.activities.return') || 'Return to Budapest'
                    ]
                },
                {
                    day: 3,
                    title: $t('tours.detailed.budapest.day3.title') || 'Day 3',
                    image: 'margit.webp',
                    activities: [
                        $t('tours.detailed.budapest.day3.activities.heroes') || 'Heroes\' Square guided tour',
                        $t('tours.detailed.budapest.day3.activities.margaret') || 'Relaxing walk through Margaret Island'
                    ]
                }
            ]
        },
        {
            id: 'centralEurope5',
            title: $t('tours.detailed.centralEurope5.title') || '5-Day Central Europe Tour',
            subtitle: $t('tours.detailed.centralEurope5.subtitle') || 'Budapest  Bratislava  Vienna',
            description: $t('tours.detailed.centralEurope5.description') || 'Discover 3 countries in just 5 unforgettable days! From the thermal baths of Budapest, through the charming streets of Bratislava, to the imperial elegance of Vienna.',
            duration: $t('tours.detailed.centralEurope5.duration') || '5 Days / 4 Nights',
            mainImage: '/5-day.webp',
            languages: languages.filter(lang => ['en', 'tr'].includes(lang.code)),
            summary: $t('tours.detailed.centralEurope5.summary') || 'Experience the best of Central Europe with this comprehensive 5-day adventure across Hungary, Slovakia, and Austria.',
            destinations: $t('tours.detailed.centralEurope5.destinations') || 'Budapest • Bratislava • Vienna',
            route: $t('tours.detailed.centralEurope5.route') || 'Budapest  Bratislava  Vienna',
            startingPoint: $t('tours.detailed.centralEurope5.startingPoint') || 'Budapest',
            endingPoint: $t('tours.detailed.centralEurope5.endingPoint') || 'Vienna',
            included: $t('tours.detailed.centralEurope5.included') || [
                '4 nights hotel accommodation (with breakfast)',
                'All private transfers (including airport & intercity)',
                'Professional guide services (English / Turkish)',
                'City tours in Budapest, Bratislava, and Vienna'
            ],
            itinerary: [
                {
                    day: 1,
                    title: $t('tours.detailed.centralEurope5.day1.title') || 'Day 1 – Arrival & Budapest City Tour',
                    image: 'maty.webp',
                    activities: $t('tours.detailed.centralEurope5.day1.activities') || [
                        'Arrival: Budapest Airport / Train Station',
                        'Transfer: Private vehicle transfer to your hotel',
                        'City Tour Highlights:',
                        'Buda Castle',
                        'Fisherman\'s Bastion',
                        'Matthias Church',
                        'Chain Bridge',
                        'Hungarian Parliament Building (exterior view)',
                        'Evening: Optional Danube River Cruise'
                    ]
                },
                {
                    day: 2,
                    title: $t('tours.detailed.centralEurope5.day2.title') || 'Day 2 – Budapest Culture & Thermal Experience',
                    image: 'heroes.webp',
                    activities: $t('tours.detailed.centralEurope5.day2.activities') || [
                        'After breakfast:',
                        'Heroes\' Square',
                        'Széchenyi Thermal Baths (entry included)',
                        'Andrassy Avenue & Budapest Opera House',
                        'Afternoon: Free time for shopping or café break',
                        'Evening: Dinner at an elegant local restaurant'
                    ]
                },
                {
                    day: 3,
                    title: $t('tours.detailed.centralEurope5.day3.title') || 'Day 3 – Slovakia: Bratislava Day Trip',
                    image: 'pozsony.webp',
                    activities: $t('tours.detailed.centralEurope5.day3.activities') || [
                        'Early Morning Departure: 2.5-hour journey by private vehicle',
                        'Bratislava Tour Highlights:',
                        'Bratislava Castle',
                        'Old Town Center',
                        'St. Martin\'s Cathedral',
                        'Michael\'s Gate',
                        'Lunch: Riverside restaurant by the Danube',
                        'Evening: Transfer to Vienna (approx. 1 hour)'
                    ]
                },
                {
                    day: 4,
                    title: $t('tours.detailed.centralEurope5.day4.title') || 'Day 4 – Vienna Classics',
                    image: 'ausztria.webp',
                    activities: $t('tours.detailed.centralEurope5.day4.activities') || [
                        'Panoramic Vienna Tour:',
                        'Schönbrunn Palace & Gardens',
                        'Panoramic ride along Ringstraße',
                        'St. Stephen\'s Cathedral',
                        'Vienna State Opera',
                        'Museum Option: Belvedere Palace or Kunsthistorisches Museum',
                        'Evening: Traditional Viennese coffee and Sachertorte experience'
                    ]
                },
                {
                    day: 5,
                    title: $t('tours.detailed.centralEurope5.day5.title') || 'Day 5 – Free Time & Departure',
                    image: 'margaret.webp',
                    activities: $t('tours.detailed.centralEurope5.day5.activities') || [
                        'Morning: Free time for shopping, souvenirs, or a city walk',
                        'Transfer: Private vehicle transfer to the airport'
                    ]
                }
            ]
        },
        {
            id: 'centralEurope3',
            title: $t('tours.detailed.centralEurope3.title') || '3-Day Central Europe Tour',
            subtitle: $t('tours.detailed.centralEurope3.subtitle') || 'Budapest  Bratislava  Budapest',
            description: $t('tours.detailed.centralEurope3.description') || 'Discover 2 countries in just 3 unforgettable days! From the thermal baths of Budapest, through the charming streets of Bratislava.',
            duration: $t('tours.detailed.centralEurope3.duration') || '3 Days / 2 Nights',
            mainImage: '/3-day.webp',
            languages: languages.filter(lang => ['en', 'tr'].includes(lang.code)),
            summary: $t('tours.detailed.centralEurope3.summary') || 'Experience the best of Central Europe with this 3-day adventure across Hungary and Slovakia.',
            destinations: $t('tours.detailed.centralEurope3.destinations') || 'Budapest • Bratislava',
            route: $t('tours.detailed.centralEurope3.route') || 'Budapest  Bratislava  Budapest',
            startingPoint: $t('tours.detailed.centralEurope3.startingPoint') || 'Budapest',
            endingPoint: $t('tours.detailed.centralEurope3.endingPoint') || 'Budapest',
            included: $t('tours.detailed.centralEurope3.included') || [
                '2 nights hotel accommodation (with breakfast)',
                'All private transfers (including airport & intercity)',
                'Professional guide services (English / Turkish)',
                'City tours in Budapest and Bratislava'
            ],
            itinerary: [
                {
                    day: 1,
                    title: $t('tours.detailed.centralEurope3.day1.title') || 'Day 1 – Arrival & Budapest City Tour',
                    image: 'maty.webp',
                    activities: $t('tours.detailed.centralEurope3.day1.activities') || [
                        'Arrival: Budapest Airport / Train Station',
                        'Transfer: Private vehicle transfer to your hotel',
                        'City Tour Highlights:',
                        'Buda Castle',
                        'Fisherman\'s Bastion',
                        'Matthias Church',
                        'Chain Bridge',
                        'Hungarian Parliament Building (exterior view)',
                        'Evening: Optional Danube River Cruise'
                    ]
                },
                // SWAPPED: Day 3 comes before Day 2
                {
                    day: 3,
                    title: $t('tours.detailed.centralEurope3.day3.title') || 'Day 3 – Budapest Culture & Departure',
                    image: 'heroes.webp',
                    activities: $t('tours.detailed.centralEurope3.day3.activities') || [
                        'Morning: Budapest Culture and Thermal Experience',
                        'Heroes\' Square',
                        'Széchenyi Thermal Baths (entry included)',
                        'Andrassy Avenue & Budapest Opera House',
                        'Afternoon: Free time for shopping or café break',
                        'Evening: Dinner at an elegant local restaurant'
                    ]
                },
                {
                    day: 2,
                    title: $t('tours.detailed.centralEurope3.day2.title') || 'Day 2 – Slovakia: Bratislava Day Trip',
                    image: 'pozsony.webp',
                    activities: $t('tours.detailed.centralEurope3.day2.activities') || [
                        'Early Morning Departure: 2.5-hour journey by private vehicle',
                        'Bratislava Tour Highlights:',
                        'Bratislava Castle',
                        'Old Town Center',
                        'St. Martin\'s Cathedral',
                        'Michael\'s Gate',
                        'Lunch: Riverside restaurant by the Danube',
                        'Evening: Return to Budapest'
                    ]
                }
            ]
        }
    ];

    // Language data with direct emoji flags
    const tourLanguages = [
        { 
            key: 'english',
            name: 'English',
            flag: '',
            available: true
        },
        { 
            key: 'hungarian',
            name: 'Magyar',
            flag: '',
            available: true
        },
        { 
            key: 'turkish',
            name: 'Türkçe',
            flag: '',
            available: true
        }
    ];

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

    // Modal functions
    function openModal(tour) {
        selectedTour = tour;
        showModal = true;
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }

    function closeModal() {
        showModal = false;
        selectedTour = null;
        // Restore body scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }

    // Close modal on escape key
    function handleKeydown(event) {
        if (event.key === 'Escape' && showModal) {
            closeModal();
        }
    }

    onMount(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Get all fade-up elements
        const fadeElements = document.querySelectorAll('.fade-up');
        
        // Apply fade-up animation
        fadeElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            observer.observe(element);
        });

        return () => observer.disconnect();
    });

    function handleImageError(event) {
        event.target.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80';
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:head>
    <title>{$t('tours.title')} - BuVipTur</title>
    <meta name="description" content={$t('tours.meta.description')} />
    <!-- Add the line-clamp plugin for Tailwind CSS if not already included -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            // ... your other theme extensions
          }
        },
        plugins: [
          require('@tailwindcss/line-clamp'),
        ],
      }
    </script>
    <style>
        .hero-overlay {
            background: linear-gradient(135deg, rgba(17, 57, 70, 0.3) 0%, rgba(220, 182, 96, 0.2) 100%);
        }
        
        .tour-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border: 2px solid rgba(220, 182, 96, 0.2);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .tour-card:hover {
            border-color: #dcb660;
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(220, 182, 96, 0.2);
        }

        .tour-card-image {
            transition: transform 0.3s ease;
        }

        .tour-card:hover .tour-card-image {
            transform: scale(1.05);
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #dcb660 0%, #c9a552 100%);
            transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
            background: linear-gradient(135deg, #c9a552 0%, #b8943d 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(220, 182, 96, 0.4);
        }
        
        .language-chip {
            background: rgba(220, 182, 96, 0.1);
            border: 1px solid rgba(220, 182, 96, 0.3);
            transition: all 0.2s ease;
        }
        
        .language-chip:hover {
            background: rgba(220, 182, 96, 0.2);
            border-color: #dcb660;
        }

        /* Modal Styles */
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }

        .modal-content {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(220, 182, 96, 0.3);
            border-radius: 24px;
            max-width: 90vw;
            max-height: 90vh;
            width: 100%;
            max-width: 800px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        }

        .modal-header {
            background: linear-gradient(135deg, rgba(220, 182, 96, 0.1), rgba(17, 57, 70, 0.05));
            padding: 4rem 2rem 2rem 2rem; /* Increased top padding from 3rem to 4rem */
            border-bottom: 1px solid rgba(220, 182, 96, 0.2);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }

        .modal-body {
            /* Use flex-grow to make it fill available space and handle its own scrolling */
            flex-grow: 1; 
            overflow-y: auto;
            overflow-x: hidden;
            padding: 0;
            min-height: 0; /* Important for flex items with overflow */
        }

        .modal-close {
            position: fixed;
            top: 1rem;
            right: 1rem;
            background: rgba(220, 182, 96, 0.1);
            border: 1px solid rgba(220, 182, 96, 0.3);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            z-index: 1020;
        }

        .modal-close:hover {
            background: rgba(220, 182, 96, 0.2);
            transform: scale(1.1);
        }

        .day-section-modal {
            background: rgba(248, 249, 250, 0.6);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(220, 182, 96, 0.1);
            margin: 1.5rem; /* Default margin */
            border-radius: 16px;
            overflow: hidden;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
            .modal-content {
                max-width: 98vw;
                max-height: 80vh;
                border-radius: 16px;
            }
            
            .modal-header {
                padding: 1rem;
            }
            
            .tour-card {
                margin-bottom: 1rem;
            }

            .day-section-modal {
                margin-left: 0;
                margin-right: 0;
                margin-top: 0.75rem;
                margin-bottom: 0.75rem;
                width: 100%;
            }
        }

        /* Modal body scrollable area */
        .modal-body {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 0 1.5rem 1.5rem;
            scrollbar-width: thin;
            scrollbar-color: rgba(220, 182, 96, 0.5) rgba(220, 182, 96, 0.1);
        }

        /* Webkit scrollbar styling */
        .modal-body::-webkit-scrollbar {
            width: 8px;
        }

        .modal-body::-webkit-scrollbar-track {
            background: rgba(220, 182, 96, 0.1);
            border-radius: 4px;
            margin: 10px 0;
        }

        .modal-body::-webkit-scrollbar-thumb {
            background: rgba(220, 182, 96, 0.5);
            border-radius: 4px;
        }

        .modal-body::-webkit-scrollbar-thumb:hover {
            background: rgba(220, 182, 96, 0.7);
        }
        
        /* Ensure header stays at top */
        .modal-header {
            flex-shrink: 0;
        }

        .day-image {
            transition: transform 0.3s ease;
        }

        .day-image:hover {
            transform: scale(1.02);
        }

        .activity-bullet {
            position: relative;
            padding-left: 1rem;
        }
        
        .activity-bullet::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 2px;
            background: #dcb660;
            border-top: 2px dashed #dcb660;
        }
    </style>
</svelte:head>

<Header />

<main class="bg-white">
    <!-- Hero Section -->
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {$t('tours.hero.title') || 'Discover Our Exclusive Tours'}
            </h1>
            <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {$t('tours.hero.subtitle') || 'Experience the best of Hungary with our carefully curated tours'}
            </p>
            <a href="#available-tours" class="bg-[#dcb660] hover:bg-[#c9a34e] text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 inline-block">
                {$t('tours.hero.seePackages') || 'See Tour Packages'}
            </a>
        </div>
    </section>

    <!-- Available Tours Section -->
    <section id="available-tours" class="py-12 sm:py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <!-- Section Header -->
            <div class="text-center mb-12 fade-up">
                <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#113946] mb-4">
                    {$t('tours.available.title') || 'Available Tours'}
                </h2>
                <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                    {$t('tours.available.subtitle') || 'Discover our carefully crafted tour packages designed to showcase the very best of Hungary'}
                </p>
            </div>

            <!-- Tour Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each tours as tour}
                    <div class="tour-card rounded-2xl p-4 shadow-lg fade-up h-full flex flex-col" on:click={() => openModal(tour)} on:keydown={(e) => e.key === 'Enter' && openModal(tour)} tabindex="0" role="button">
                        <!-- Card Image -->
                        <div class="relative overflow-hidden rounded-xl mb-4">
                            <img 
                                src={tour.mainImage} 
                                alt={tour.title}
                                class="tour-card-image w-full h-72 object-cover {['/5-day.webp','/3-day.webp'].includes(tour.mainImage) ? 'zoomed-out' : ''}"
                                loading="lazy"
                                on:error={handleImageError}
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div class="absolute top-3 right-3 bg-[#dcb660] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {tour.duration}
                            </div>
                        </div>

                        <!-- Card Content -->
                         <div class="flex flex-col flex-grow">
                             <div>
                                 <h3 class="text-xl font-bold text-[#113946] line-clamp-2">
                                     {tour.title}
                                 </h3>
                                 
                                 <p class="text-[#dcb660] font-semibold text-sm mt-1">
                                     {tour.destinations}
                                 </p>
                                 
                                 <p class="text-gray-600 text-sm leading-relaxed mt-2 line-clamp-3">
                                     {tour.summary}
                                 </p>
                             </div>

                             <!-- View Package Button -->
                             <div class="mt-auto pt-4">
                                 <button class="w-full btn-primary text-white font-semibold py-2.5 px-6 rounded-xl transition duration-300 text-sm">
                                     {$t('tours.card.viewPackage') || 'View Package'}
                                     <i class="fas fa-arrow-right ml-2"></i>
                                 </button>
                             </div>
                         </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>


    <!-- Modal -->
    {#if showModal && selectedTour}
        <div 
            class="modal-backdrop" 
            transition:fade={{ duration: 300 }}
            role="dialog" 
            aria-modal="true"
            aria-label="Tour package details"
        >
            <div 
                class="modal-content" 
                transition:fly={{ y: 50, duration: 400 }}
                role="document"
                aria-label="Tour package content"
            >
                <!-- Invisible clickable overlay that closes the modal -->
                <div 
                    class="absolute inset-0 -z-10"
                    on:click={closeModal}
                    on:keydown={(e) => e.key === 'Enter' && closeModal()}
                    tabindex="0"
                    role="button"
                    aria-label="Close modal"
                ></div>
                <!-- Close Button -->
                <button class="modal-close" on:click={closeModal} aria-label="Close modal">
                    <i class="fas fa-times text-[#113946]"></i>
                </button>

                <!-- Modal Body -->
                <div class="modal-body">
                    <!-- Modal Header Content -->
                    <div class="text-center p-8 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-b border-amber-200 -mx-6 -mt-6 pt-8">
                        <div class="h-8 mb-4">
                            <!-- Empty space where the pill was -->
                        </div>
                        <h2 class="text-3xl md:text-4xl font-bold text-[#113946] mb-3 leading-tight">{selectedTour.title}</h2>
                        <p class="text-xl text-[#dcb660] font-semibold mb-4">{selectedTour.subtitle}</p>
                        <p class="text-gray-700 leading-relaxed max-w-2xl mx-auto text-lg">{selectedTour.description}</p>
                        
                        <!-- Package Info -->
                        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                            <div class="flex items-center text-gray-700 bg-white/60 px-4 py-2 rounded-full shadow-sm">
                                <i class="fas fa-clock mr-2 text-[#dcb660]"></i>
                                <span class="font-semibold">{selectedTour.duration}</span>
                            </div>
                            <div class="flex flex-wrap gap-2 justify-center">
                                {#each selectedTour.languages as lang}
                                    <span class="language-chip px-3 py-1.5 rounded-full flex items-center justify-center text-sm bg-white/60 shadow-sm">
                                        <span class="mr-2 w-4 h-4 flex-shrink-0 flex items-center justify-center">{@html lang.flag}</span>
                                        <span class="flex items-center">{lang.name}</span>
                                    </span>
                                {/each}
                            </div>
                        </div>
                    </div>
                    <!-- What's Included Section for Central Europe Tours -->
                    {#if selectedTour.included}
                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 mb-6 mx-6 mt-16">
                            <h3 class="text-lg font-bold text-[#113946] mb-4">
                                {$t('tours.package.whatsIncluded') || 'What\'s Included'}
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {#each selectedTour.included as item}
                                    <div class="flex items-start space-x-3">
                                        <div class="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                                            <i class="fas fa-check text-white text-xs"></i>
                                        </div>
                                        <span class="text-gray-700 text-sm">{item}</span>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    <!-- Daily Itinerary -->
                    <div class="mb-6 px-6">
                        <h3 class="text-xl font-bold text-[#113946] text-center mb-6 {selectedTour.id === 'budapest' ? 'mt-8' : ''}">
                            {$t('tours.package.itinerary') || 'Your Adventure'}
                        </h3>

                        {#each selectedTour.itinerary as day, index}
                            <div class="day-section-modal rounded-2xl p-6 shadow-sm mb-6">
                                <div class="w-full">
                                    <!-- Content Side -->
                                    <div>
                                        <!-- Day Header -->
                                        <div class="flex items-center mb-4">
                                            <h4 class="text-xl font-bold text-[#113946]">{day.title}</h4>
                                        </div>
                                        
                                        <!-- Activities List -->
                                        <div class="space-y-3 pl-2">
                                            {#each day.activities as activity}
                                                <div class="activity-bullet text-gray-700 leading-relaxed">
                                                    {activity}
                                                </div>
                                            {/each}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>

                    <!-- Package CTA -->
                    <div class="text-center pt-6 border-t border-gray-200 px-6">
                        <p class="text-gray-600 mb-4">
                            {$t('tours.package.cta.subtitle') || 'Ready to experience this amazing journey?'}
                        </p>
                        <a 
                            href="/contact?tour={encodeURIComponent(selectedTour.title)}#top" 
                            class="btn-primary inline-flex items-center px-8 py-3 text-white rounded-xl font-semibold"
                            on:click|preventDefault={() => {
                                const href = `/contact?tour=${encodeURIComponent(selectedTour.title)}#top`;
                                closeModal();
                                setTimeout(() => window.location.href = href, 100);
                            }}
                        >
                            <span>{$t('tours.package.cta.button') || 'Book This Package'}</span>
                            <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</main>
