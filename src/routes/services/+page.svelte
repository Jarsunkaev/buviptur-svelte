<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import DestinationsSection from '$lib/components/DestinationsSection.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import Button from '$lib/components/Button.svelte';
    import { t } from 'svelte-i18n';

    // Enhanced services data with translations - using fallback arrays to prevent translation issues
    $: services = [
        {
            title: $t('services.accommodation.title') || 'Accommodation',
            description: $t('services.accommodation.description') || 'We arrange and customize accommodation to perfectly suit your needs and preferences. From charming boutique hotels to unique historic stays, our team ensures every option offers quality, comfort, and authentic local character.',
            icon: 'fa-hotel',
            image: 'accomodation-optimized.webp',
            cta: $t('services.accommodation.cta') || 'View Accommodations'
        },
        {
            title: $t('services.visa.title') || 'Visa Assistance',
            description: $t('services.visa.description') || 'Navigate complex visa requirements with ease. Our specialized visa team provides comprehensive support to ensure a smooth application process, with expert guidance on documentation and application procedures tailored to your nationality and destination.',
            icon: 'fa-passport',
            image: 'visa-optimized.webp',
            cta: $t('services.visa.cta') || 'Learn About Visa Services'
        },
        {
            title: $t('services.transportation.title') || 'Transportation',
            description: $t('services.transportation.description') || 'Travel in comfort and style with our fleet of modern vehicles and expert drivers. From airport transfers to multi-city journeys, we ensure punctual, comfortable transportation that allows you to enjoy the scenery while we handle the logistics.',
            icon: 'fa-bus',
            image: 'bus-optimized.webp',
            cta: $t('services.transportation.cta') || 'Learn About Transportation'
        },
        {
            title: $t('services.tourPackages.title') || 'Tour Packages',
            description: $t('services.tourPackages.description') || 'Discover the heart of Central Europe with our carefully curated tour packages. Experience the rich culture, stunning architecture, and breathtaking landscapes of Hungary, Austria, Czech Republic, and Slovakia. Our expert guides will take you on an unforgettable journey through these magnificent destinations.',
            icon: 'fa-suitcase-rolling',
            image: 'villi-optimized.webp',
            cta: $t('services.tourPackages.cta') || 'Explore Tour Packages',
            destinations: $t('services.tourPackages.destinations')
        }
    ];

    // Customer benefits with translations
    $: benefits = [
        {
            icon: 'fa-clock',
            title: $t('services.benefits.support247.title') || '24/7 Customer Support',
            description: $t('services.benefits.support247.description') || 'Our dedicated team is available around the clock to assist with any questions or needs during your journey.'
        },
        {
            icon: 'fa-thumbs-up',
            title: $t('services.benefits.bestPrice.title') || 'Best Price Guarantee',
            description: $t('services.benefits.bestPrice.description') || 'We match any comparable service price and offer transparency with no hidden fees.'
        }
    ];


    // Process steps with translations
    $: processSteps = [
        {
            number: '01',
            title: $t('services.process.consultation.title') || 'Consultation',
            description: $t('services.process.consultation.description') || 'We begin with a detailed consultation to understand your travel preferences, interests, and needs.'
        },
        {
            number: '02',
            title: $t('services.process.planning.title') || 'Custom Planning',
            description: $t('services.process.planning.description') || 'Our experts design a personalized travel plan with hand-selected services tailored to your wishes.'
        },
        {
            number: '03',
            title: $t('services.process.tuning.title') || 'Fine-Tuning',
            description: $t('services.process.tuning.description') || 'We refine your itinerary with your feedback until it perfectly matches your vision.'
        },
        {
            number: '04',
            title: $t('services.process.execution.title') || 'Seamless Execution',
            description: $t('services.process.execution.description') || 'Enjoy your journey with our support at every step, from arrival to departure.'
        }
    ];
</script>

<Header />
<main class="bg-white">
    <!-- Hero Section -->
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/unsplash-hero-optimized.webp')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">{$t('services.title') || 'Our Services'}</h1>
            <p class="text-xl md:text-2xl mb-8">{$t('services.subtitle') || 'Comprehensive travel solutions crafted with expertise and care'}</p>
        </div>
    </section>

    <!-- Experience Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{$t('services.experienceTitle') || 'Experience the Difference'}</h2>
                <p class="text-lg text-gray-600">
                    {$t('services.experienceDescription') || 'At BuVipTur, we believe that exceptional travel experiences begin with superior services. Every element of your journey is carefully curated to ensure comfort, authenticity, and unforgettable moments. Discover our comprehensive range of services designed to elevate your Central European adventure.'}
                </p>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="space-y-24">
                {#each services as service, i}
                    <div class="grid md:grid-cols-2 gap-12 items-center"> 
                        
                        <div class="relative overflow-hidden rounded-xl shadow-xl {i % 2 === 0 ? 'md:order-2' : 'md:order-1'}"> 
                            <img 
                                src={service.image} 
                                alt={service.title}
                                class="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            <div class="absolute top-6 left-6 bg-[#dcb660] text-white p-4 rounded-full shadow-lg">
                                <i class="fas {service.icon} text-2xl"></i>
                            </div>
                        </div>
                        
                        <div class="{i % 2 === 0 ? 'md:order-1 md:pr-8' : 'md:order-2 md:pl-8'}"> 
                            <h3 class="text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                            <p class="text-lg text-gray-600 mb-6">{service.description}</p>
                            
                            {#if service.destinations}
                                <div class="mb-8">
                                    <h4 class="text-xl font-semibold text-gray-900 mb-4">{$t('services.featuredDestinations')}:</h4>
                                    <ul class="space-y-2">
                                        {#each service.destinations as destination}
                                            <li class="flex items-start">
                                                <i class="fas fa-map-marker-alt text-[#dcb660] mt-1 mr-2"></i>
                                                <span class="text-gray-700">{destination}</span>
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{$t('services.benefitsTitle') || 'Why Choose Our Services'}</h2>
                <p class="text-lg text-gray-600">
                    {$t('services.benefitsSubtitle') || 'We go beyond expectations to ensure your travel experience is seamless and memorable.'}
                </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                {#each benefits as benefit}
                    <div class="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                        <div class="w-16 h-16 bg-[#dcb660] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas {benefit.icon} text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                        <p class="text-gray-600">{benefit.description}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-[#dcb660]">
        <div class="container mx-auto px-4 text-center">
            <div class="max-w-3xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">{$t('services.cta.title') || 'Ready to Start Your Journey?'}</h2>
                <p class="text-xl text-white mb-8">
                    {$t('services.cta.description') || 'Let us create a customized travel experience tailored to your preferences and interests.'}
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button href="/contact" variant="secondary" size="lg">
                        {$t('services.cta.getQuote') || 'Get a Custom Quote'}
                    </Button>
                    <Button href="/tours" variant="secondary" size="lg">
                        {$t('services.cta.exploreTours') || 'Explore Our Tours'}
                    </Button>
                </div>
            </div>
        </div>
    </section>

</main>
