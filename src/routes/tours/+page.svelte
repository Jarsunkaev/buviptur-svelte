<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import { onMount } from 'svelte';
    import { t, locale } from 'svelte-i18n';
    import { fade, fly } from 'svelte/transition';

    // Modal state
    let showModal = false;
    let selectedTour = null;

    // Detailed tour data
    $: detailedTour = {
        title: $t('tours.detailed.budapest.title') || 'Hungarian Heritage & Danube Bend Discovery',
        subtitle: $t('tours.detailed.budapest.subtitle') || 'Budapest - Esztergom - Visegrád - Szentendre',
        description: $t('tours.detailed.budapest.description') || 'Embark on a captivating journey through Hungary\'s most treasured historical sites. From the majestic Buda Castle to the charming Danube Bend towns, experience the rich heritage that shaped Central Europe.',
        duration: $t('tours.detailed.budapest.duration') || '2 Nights, 3 Days',
        mainImage: 'parli.webp',
        languages: [
            $t('tours.languages.english.name') || 'English',
            $t('tours.languages.hungarian.name') || 'Hungarian', 
            $t('tours.languages.turkish.name') || 'Turkish'
        ],
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
    };

    // Language data with direct emoji flags
    const tourLanguages = [
        { 
            key: 'english',
            name: 'English',
            flag: '🇬🇧',
            available: true
        },
        { 
            key: 'hungarian',
            name: 'Magyar',
            flag: '🇭🇺',
            available: true
        },
        { 
            key: 'turkish',
            name: 'Türkçe',
            flag: '🇹🇷',
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
    }

    function closeModal() {
        showModal = false;
        selectedTour = null;
        // Restore body scroll
        document.body.style.overflow = '';
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
            padding: 2rem;
            border-bottom: 1px solid rgba(220, 182, 96, 0.2);
            position: sticky;
            top: 0;
            z-index: 10;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            flex-shrink: 0; /* Prevent header from shrinking */
        }

        .modal-body {
            /* Use flex-grow to make it fill available space and handle its own scrolling */
            flex-grow: 1; 
            overflow-y: auto;
            padding: 0;
            min-height: 0; /* Important for flex items with overflow */
        }

        .modal-close {
            position: absolute;
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
            z-index: 20;
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
                max-width: 95vw;
                max-height: 95vh;
                border-radius: 16px;
            }
            
            .modal-header {
                padding: 1.5rem;
            }
            
            .tour-card {
                margin-bottom: 1rem;
            }

            .day-section-modal {
                /* Make day cards wider on mobile by reducing horizontal margin */
                margin-left: 0.5rem;
                margin-right: 0.5rem;
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
            position: relative;
            z-index: 10;
        }
        
        /* Ensure CTA stays at bottom */
        .package-cta {
            flex-shrink: 0;
            background: white;
            position: sticky;
            bottom: 0;
            padding: 1rem 0;
            margin: 0 -1.5rem;
            padding: 1rem 1.5rem;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
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
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Empty column on the left for medium and larger screens -->
                <div class="hidden md:block"></div>
                
                <!-- Hungarian Heritage Tour Card - Centered in the middle column -->
                <div class="tour-card rounded-2xl p-6 shadow-lg fade-up" on:click={() => openModal(detailedTour)} on:keydown={(e) => e.key === 'Enter' && openModal(detailedTour)} tabindex="0" role="button">
                    <!-- Card Image -->
                    <div class="relative overflow-hidden rounded-xl mb-4">
                        <img 
                            src={detailedTour.mainImage} 
                            alt={detailedTour.title}
                            class="tour-card-image w-full h-48 object-cover"
                            loading="lazy"
                            on:error={handleImageError}
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div class="absolute top-3 right-3 bg-[#dcb660] text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {detailedTour.duration}
                        </div>
                    </div>

                    <!-- Card Content -->
                    <div class="space-y-3">
                        <h3 class="text-xl font-bold text-[#113946] line-clamp-2">
                            {detailedTour.title}
                        </h3>
                        
                        <p class="text-[#dcb660] font-semibold text-sm">
                            {detailedTour.destinations}
                        </p>
                        
                        <p class="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                            {detailedTour.summary}
                        </p>

                        <!-- Languages -->
                        <div class="flex flex-wrap gap-2 pt-2">
                            {#each tourLanguages as lang}
                                <span class="language-chip px-2 py-1 rounded-full flex items-center text-xs">
                                    <span class="mr-1">{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </span>
                            {/each}
                        </div>

                        <!-- View Package Button -->
                        <div class="pt-4">
                            <button class="w-full btn-primary text-white font-semibold py-3 px-6 rounded-xl transition duration-300 text-sm">
                                {$t('tours.card.viewPackage') || 'View Package'}
                                <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
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

                <!-- Modal Header -->
                <div class="modal-header">
                    <div class="text-center">
                        <div class="inline-block bg-[#dcb660] text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
                            {$t('tours.package.featured') || 'Featured Tour Package'}
                        </div>
                        <h2 class="text-2xl md:text-3xl font-bold text-[#113946] mb-2">{selectedTour.title}</h2>
                        <p class="text-lg text-[#dcb660] font-semibold mb-2">{selectedTour.subtitle}</p>
                        <p class="text-gray-600 leading-relaxed">{selectedTour.description}</p>
                        
                        <!-- Package Info -->
                        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                            <div class="flex items-center text-gray-700">
                                <i class="fas fa-clock mr-2 text-[#dcb660]"></i>
                                <span class="font-semibold">{selectedTour.duration}</span>
                            </div>
                            <div class="flex flex-wrap gap-2 justify-center">
                                {#each tourLanguages as lang}
                                    <span class="language-chip px-3 py-1 rounded-full flex items-center text-sm">
                                        <span class="mr-2">{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </span>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Body -->
                <div class="modal-body">
                    <!-- Daily Itinerary -->
                    <div class="p-0 pt-6 space-y-6">
                        <h3 class="text-xl font-bold text-[#113946] text-center mb-6">
                            {$t('tours.package.itinerary') || 'Your 3-Day Adventure'}
                        </h3>

                        {#each selectedTour.itinerary as day, index}
                            <div class="day-section-modal rounded-2xl p-6 shadow-sm">
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center {index % 2 === 1 ? 'lg:grid-cols-2' : ''}">
                                    <!-- Content Side -->
                                    <div class="{index % 2 === 1 ? 'lg:order-2' : ''}">
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
                                    
                                    <!-- Image Side -->
                                    <div class="{index % 2 === 1 ? 'lg:order-1' : ''} order-first lg:order-none">
                                        <div class="relative overflow-hidden rounded-xl border border-amber-100">
                                            <img 
                                                src={day.image} 
                                                alt="{day.title} activities" 
                                                class="day-image w-full h-48 md:h-64 object-cover"
                                                loading="lazy"
                                                on:error={handleImageError}
                                            />
                                            <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}

                        <!-- Package CTA -->
                        <div class="text-center mt-8 pt-6 border-t border-gray-200">
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
        </div>
    {/if}
</main>
