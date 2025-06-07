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

    // Tour categories with translations
    $: tourTypes = [
        {
            title: $t('tours.categories.historical.title'),
            description: $t('tours.categories.historical.description'),
            languages: ['English', 'Hungarian', 'Turkish'],
            image: 'https://images.unsplash.com/photo-1583091618471-bf133efb0a9c?q=80',
            highlights: $t('tours.categories.historical.highlights'),
            featured: true,
            duration: $t('tours.categories.historical.duration')
        },
        {
            title: $t('tours.categories.cultural.title'),
            description: $t('tours.categories.cultural.description'),
            languages: ['English', 'Hungarian', 'Turkish'],
            image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80',
            highlights: $t('tours.categories.cultural.highlights'),
            duration: $t('tours.categories.cultural.duration')
        },
        {
            title: $t('tours.categories.multiCountry.title'),
            description: $t('tours.categories.multiCountry.description'),
            languages: ['English', 'Hungarian', 'Turkish'],
            image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80',
            highlights: $t('tours.categories.multiCountry.highlights'),
            featured: true,
            duration: $t('tours.categories.multiCountry.duration')
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

    // Sample tour data - keeping static for simplicity but could be translated
    $: featuredTours = [
        {
            title: $t('tours.featured.budapestCastle.title'),
            image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80',
            location: $t('tours.featured.budapestCastle.location'),
            rating: 4.8,
            reviews: 243,
            duration: $t('tours.featured.budapestCastle.duration'),
            badge: $t('tours.featured.badges.bestseller')
        },
        {
            title: $t('tours.featured.factoryHeritage.title'),
            image: 'https://images.unsplash.com/photo-1518329643691-4ebe15596706?q=80',
            location: $t('tours.featured.factoryHeritage.location'),
            rating: 4.9,
            reviews: 186,
            duration: $t('tours.featured.factoryHeritage.duration'),
            badge: $t('tours.featured.badges.new')
        },
        {
            title: $t('tours.featured.culinaryJourney.title'),
            image: 'https://images.unsplash.com/photo-1521017090404-1526ca339f53?q=80',
            location: $t('tours.featured.culinaryJourney.location'),
            rating: 4.7,
            reviews: 152,
            duration: $t('tours.featured.culinaryJourney.duration')
        },
        {
            title: $t('tours.featured.viennaDayTrip.title'),
            image: 'https://images.unsplash.com/photo-1516550893232-fe054840d3c2?q=80',
            location: $t('tours.featured.viennaDayTrip.location'),
            rating: 4.6,
            reviews: 97,
            duration: $t('tours.featured.viennaDayTrip.duration'),
            badge: $t('tours.featured.badges.popular')
        }
    ];

    // Tour testimonials with translations
    $: testimonials = [
        {
            title: $t('tours.testimonials.incredible.title'),
            content: $t('tours.testimonials.incredible.content'),
            author: 'James Wilson',
            position: 'London, UK',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80',
            rating: 5
        },
        {
            title: $t('tours.testimonials.factory.title'),
            content: $t('tours.testimonials.factory.content'),
            author: 'Maria González',
            position: 'Barcelona, Spain',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80',
            rating: 5
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

    $: stats = [
        { value: '100+', label: $t('tours.whyChoose.stats.uniqueTours') },
        { value: '12', label: $t('tours.whyChoose.stats.maxGroup') },
        { value: '48', label: $t('tours.whyChoose.stats.localGuides') },
        { value: '9.8/10', label: $t('tours.whyChoose.stats.satisfaction') }
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
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
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
                                        {$t('tours.featured.badges.featured')}
                                    </div>
                                {/if}
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
        benefits={benefits} 
        image="https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80"
    />

</main>
