<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import { onMount } from 'svelte';
    import { t, locale } from 'svelte-i18n';

    // Detailed tour with itinerary - using translations
    $: detailedTour = {
        title: $t('tours.detailed.budapest.title') || 'Hungarian Heritage & Danube Bend Discovery',
        subtitle: $t('tours.detailed.budapest.subtitle') || 'Budapest - Esztergom - Visegrád - Szentendre',
        description: $t('tours.detailed.budapest.description') || 'Embark on a captivating journey through Hungary\'s most treasured historical sites. From the majestic Buda Castle to the charming Danube Bend towns, experience the rich heritage that shaped Central Europe.',
        duration: $t('tours.detailed.budapest.duration') || '2 Nights, 3 Days',
        mainImage: 'https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=1000',
        languages: [
            $t('tours.languages.english.name') || 'English',
            $t('tours.languages.hungarian.name') || 'Hungarian', 
            $t('tours.languages.turkish.name') || 'Turkish'
        ],
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
    
    // Language mapping is no longer needed since we're using direct values

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

    // Helper function to get language data
    function getLanguageForTour(langName) {
        // Get the language data directly from the translation system
        const langKey = Object.entries(languageMapping).find(([_, value]) => value === langName.toLowerCase())?.[0];
        if (langKey) {
            const langData = $t(`tours.languages.${langKey}`, {}, { returnObjects: true });
            if (langData && typeof langData === 'object') {
                return {
                    name: langData.name || langName,
                    flag: langData.flag || '🏳️',
                    icon: langData.icon || 'fa-flag'
                };
            }
        }
        return { 
            name: langName, 
            flag: '🏳️',
            icon: 'fa-flag'
        };
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
        
        // Immediately show the first element (featured tour)
        if (fadeElements[0]) {
            fadeElements[0].style.opacity = '1';
            fadeElements[0].style.transform = 'translateY(0)';
            fadeElements[0].style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(fadeElements[0]);
        }
        
        // Apply fade-up animation to remaining elements
        for (let i = 1; i < fadeElements.length; i++) {
            fadeElements[i].style.opacity = '0';
            fadeElements[i].style.transform = 'translateY(30px)';
            fadeElements[i].style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(fadeElements[i]);
        }

        return () => observer.disconnect();
    });

    function handleImageError(event) {
        event.target.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80';
    }
</script>

<svelte:head>
    <title>{$t('tours.title')} - BuVipTur</title>
    <meta name="description" content={$t('tours.meta.description')} />
    <style>
        .hero-overlay {
            background: linear-gradient(135deg, rgba(17, 57, 70, 0.3) 0%, rgba(220, 182, 96, 0.2) 100%);
        }
        
        .package-container {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            border: 2px solid #dcb660;
        }
        
        .day-badge {
            background: linear-gradient(135deg, #dcb660 0%, #f4d06f 100%);
            box-shadow: 0 4px 12px rgba(220, 182, 96, 0.3);
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

        .day-image {
            transition: transform 0.3s ease;
        }

        .day-image:hover {
            transform: scale(1.02);
        }

        .day-section {
            transition: all 0.3s ease;
        }

        .day-section:hover {
            transform: translateY(-2px);
        }

        /* Mobile text wrapping fixes */
        @media (max-width: 768px) {
            .mobile-text {
                font-size: 1rem;
                line-height: 1.5;
                word-wrap: break-word;
                overflow-wrap: break-word;
                hyphens: auto;
            }
            
            .mobile-title {
                font-size: 2rem;
                line-height: 1.3;
            }
            
            .mobile-subtitle {
                font-size: 1.25rem;
                line-height: 1.4;
            }
            
            .mobile-padding {
                padding: 1rem;
            }
            
            .mobile-gap {
                gap: 1rem;
            }
        }

        /* Container overflow fixes */
        .day-section {
            overflow: hidden;
        }
        
        .activity-text {
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
            max-width: 100%;
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
            <a href="#featured-tour" class="bg-[#dcb660] hover:bg-[#c9a34e] text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 inline-block">
                {$t('tours.hero.seePackages') || 'See Tour Packages'}
            </a>
        </div>
    </section>

    <!-- Featured Tour Package Section -->
    <section id="featured-tour" class="py-12 sm:py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <!-- Package Container -->
            <div class="package-container rounded-3xl p-6 sm:p-8 md:p-12 fade-up">
                <!-- Package Header -->
                <div class="text-center mb-8 sm:mb-12">
                    <div class="inline-block bg-[#dcb660] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold mb-4">
                        {$t('tours.package.featured') || 'Featured Tour Package'}
                    </div>
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#113946] mb-3 sm:mb-4">{detailedTour.title}</h2>
                    <p class="text-xl sm:text-2xl text-[#dcb660] font-semibold mb-3 sm:mb-4">{detailedTour.subtitle}</p>
                    <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{detailedTour.description}</p>
                    
                    <!-- Package Info -->
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8">
                        <div class="flex items-center text-gray-700 mobile-text">
                            <i class="fas fa-clock mr-2 text-[#dcb660]"></i>
                            <span class="font-semibold">{detailedTour.duration}</span>
                        </div>
                        <div class="flex flex-wrap gap-2 sm:gap-3 justify-center">
                            {#each tourLanguages as lang}
                                <span class="language-chip px-3 py-1 rounded-full flex items-center text-sm mobile-text">
                                    <span class="mr-2 text-lg">{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </span>
                            {/each}
                        </div>
                    </div>
                </div>

                <!-- Daily Itinerary -->
                <div class="space-y-6 sm:space-y-8">
                    <h3 class="text-xl sm:text-2xl font-bold text-[#113946] text-center mb-6 sm:mb-8 mobile-title">
                        {$t('tours.package.itinerary') || 'Your 3-Day Adventure'}
                    </h3>

                    {#each detailedTour.itinerary as day, index}
                        <div class="day-section bg-white/30 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-amber-100/50 relative overflow-hidden">
                                <!-- Frosted glass overlay -->
                                <div class="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-amber-100/10 backdrop-blur-sm z-0"></div>
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center {index % 2 === 1 ? 'lg:grid-cols-2' : ''}">
                                <!-- Content Side -->
                                <div class="{index % 2 === 1 ? 'lg:order-2' : ''} p-4 sm:p-6">
                                    <!-- Day Header -->
                                    <div class="flex items-center mb-4 sm:mb-6">
                                        <!-- Day number removed as requested -->
                                        <h4 class="text-xl sm:text-2xl md:text-3xl font-bold text-amber-900 relative z-10">{day.title}</h4>
                                    </div>
                                    
                                    <!-- Activities List with Bullet Points -->
                                    <div class="space-y-3 sm:space-y-4 pl-2">
                                        {#each day.activities as activity}
                                            <div class="activity-bullet activity-text text-amber-900/90 text-base sm:text-lg leading-relaxed relative z-10 pl-5 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                                                    {activity}
                                                </div>
                                        {/each}
                                    </div>
                                </div>
                                
                                <!-- Image Side -->
                                <div class="{index % 2 === 1 ? 'lg:order-1' : ''} order-first lg:order-none">
                                    <div class="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-amber-100/50">
                                        <img 
                                            src={day.image} 
                                            alt="{day.title} activities" 
                                            class="day-image w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] object-cover"
                                            loading="lazy"
                                            on:error={handleImageError}
                                        />
                                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <!-- Package CTA -->
                <div class="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                    <p class="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 mobile-text">
                        {$t('tours.package.cta.subtitle') || 'Ready to experience this amazing journey?'}
                    </p>
                    <a 
                        href="/contact?tour={encodeURIComponent(detailedTour.title)}#top" 
                        class="btn-primary inline-flex items-center px-8 sm:px-12 py-3 sm:py-4 text-white rounded-xl font-semibold text-base sm:text-lg md:text-xl mobile-text"
                    >
                        <span>{$t('tours.package.cta.button') || 'Book This Package'}</span>
                        <i class="fas fa-arrow-right ml-2 sm:ml-3"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

</main>
