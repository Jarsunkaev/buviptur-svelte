<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import DestinationsSection from '$lib/components/DestinationsSection.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import SubscribeSection from '$lib/components/SubscribeSection.svelte';
    import Button from '$lib/components/Button.svelte';

    // Enhanced services data with more details and features
    const services = [
        {
            title: 'Accommodation', // Changed from 'Luxury Accommodation'
            description: 'We arrange and customize accommodation to perfectly suit your needs and preferences. From charming boutique hotels to unique historic stays, our team ensures every option offers quality, comfort, and authentic local character. Let us find the ideal place for your stay.', // Updated description
            icon: 'fa-hotel',
            image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80',
            features: [ // Updated features
                'Personalized accommodation planning',
                'Wide range of vetted properties',
                'Customizable to your budget and style',
                'Focus on quality, comfort, and character',
                'Arrangements for boutique hotels, historic stays, and more',
                'Flexible options tailored to your itinerary'
            ],
            cta: 'View Accommodations'
        },
        {
            title: 'Expert Visa Assistance',
            description: 'Navigate complex visa requirements with ease. Our specialized visa team provides comprehensive support to ensure a smooth application process, with expert guidance on documentation and application procedures tailored to your nationality and destination.',
            icon: 'fa-passport',
            image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80',
            features: [
                'Personalized visa consultation',
                'Document preparation guidance',
                'Application review services',
                'Embassy appointment scheduling',
                'Translation services when needed',
                '24/7 support during application process'
            ],
            cta: 'Learn About Visa Services'
        },
        {
            title: 'Premium Transportation',
            description: 'Travel in comfort and style with our fleet of modern vehicles and expert drivers. From airport transfers to multi-city journeys, we ensure punctual, comfortable transportation that allows you to enjoy the scenery while we handle the logistics.',
            icon: 'fa-bus',
            image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80',
            features: [
                'Latest model luxury vehicles',
                'Professional, multilingual drivers',
                'Door-to-door service',
                'Flexible scheduling',
                'Child safety seats available',
                'WiFi-equipped transportation'
            ],
            cta: 'Explore Transportation Options'
        },
        {
            title: 'Expert Local Guides',
            description: 'Our guides are passionate storytellers and local experts who bring destinations to life with insider knowledge and personal connections. Each guide undergoes rigorous training and is selected for their expertise, language fluency, and ability to create memorable experiences.',
            icon: 'fa-user-tie',
            image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80',
            features: [
                'University-educated in history or culture',
                'Multilingual capabilities',
                'Specialized knowledge in art, history, food, etc.',
                'Local connections for unique experiences',
                'Emergency response training',
                'Personalized attention to interests'
            ],
            cta: 'Meet Our Guides'
        },
        {
            title: 'Scenic Boat Experiences',
            description: 'Discover Central Europe from its historic waterways with our exclusive boat tours and cruises. From romantic dinner cruises to full-day explorations, our water-based experiences offer unique perspectives on iconic cities and hidden treasures along the riverbanks.',
            icon: 'fa-ship',
            image: 'https://images.unsplash.com/photo-1588263823647-ce3546d42bfe?q=80',
            features: [
                'Intimate small-group cruises',
                'Private charter options',
                'Gourmet dining experiences',
                'Sunset and evening illumination tours',
                'Historical commentary during journeys',
                'All-weather comfortable vessels'
            ],
            cta: 'View Boat Tours'
        },
        {
            title: 'Industrial Heritage Tours',
            description: 'Explore the fascinating industrial past and present of Central Europe with our specialized factory and industrial heritage tours. Get exclusive access to working factories, historic industrial sites, and meet the craftspeople keeping traditional industries alive.',
            icon: 'fa-industry',
            image: 'https://images.unsplash.com/photo-1543013309-0d1f4edeb868?q=80',
            features: [
                'Exclusive access to working factories',
                'Hands-on craft demonstrations',
                'Meet master craftspeople',
                'Historical industrial site exploration',
                'Behind-the-scenes production insights',
                'Small group sizes for optimal experience'
            ],
            cta: 'Discover Factory Tours'
        }
    ];

    // showcaseExperiences constant REMOVED

    // Customer benefits
    const benefits = [
        {
            icon: 'fa-clock',
            title: '24/7 Customer Support',
            description: 'Our dedicated team is available around the clock to assist with any questions or needs during your journey.'
        },
        {
            icon: 'fa-thumbs-up',
            title: 'Best Price Guarantee',
            description: 'We match any comparable service price and offer transparency with no hidden fees.'
        },
        {
            icon: 'fa-shield-alt',
            title: 'Travel Protection',
            description: 'Comprehensive travel insurance options to ensure peace of mind throughout your journey.'
        }
    ];

    // Customized destinations for services page
    const destinations = [
        { name: 'Budapest', tours: 124, image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80' },
        { name: 'Vienna', tours: 93, image: 'https://images.unsplash.com/photo-1516550893232-fe054840d3c2?q=80' },
        { name: 'Prague', tours: 165, image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80' }
    ];

    // Process steps
    const processSteps = [
        {
            number: '01',
            title: 'Consultation',
            description: 'We begin with a detailed consultation to understand your travel preferences, interests, and needs.'
        },
        {
            number: '02',
            title: 'Custom Planning',
            description: 'Our experts design a personalized travel plan with hand-selected services tailored to your wishes.'
        },
        {
            number: '03',
            title: 'Fine-Tuning',
            description: 'We refine your itinerary with your feedback until it perfectly matches your vision.'
        },
        {
            number: '04',
            title: 'Seamless Execution',
            description: 'Enjoy your journey with our support at every step, from arrival to departure.'
        }
    ];
</script>

<Header />
<main class="bg-white">
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">Our Services</h1>
            <p class="text-xl md:text-2xl mb-8">Comprehensive travel solutions crafted with expertise and care</p>
        </div>
    </section>

    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Experience the Difference</h2>
                <p class="text-lg text-gray-600">
                    At BuVipTur, we believe that exceptional travel experiences begin with superior services. Every element of your journey is carefully curated to ensure comfort, authenticity, and unforgettable moments. Discover our comprehensive range of services designed to elevate your Central European adventure.
                </p>
            </div>
        </div>
    </section>

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
                            
                            <div class="mb-8">
                                <h4 class="text-xl font-semibold text-gray-900 mb-4">Service Highlights:</h4>
                                <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                                    {#each service.features as feature}
                                        <li class="flex items-start">
                                            <i class="fas fa-check-circle text-[#dcb660] mt-1 mr-2"></i>
                                            <span class="text-gray-700">{feature}</span>
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                            
                            <Button 
                                variant="primary" 
                                size="lg" 
                                href="#" 
                                classes="mt-4"
                            >
                                {service.cta}
                            </Button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Service Process</h2>
                <p class="text-lg text-gray-600">
                    We follow a refined process to ensure every detail of your journey is perfectly executed.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {#each processSteps as step}
                    <div class="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                        <span class="text-[120px] font-bold text-[#dcb660]/10 absolute -bottom-6 -right-6 leading-none">{step.number}</span>
                        <div class="relative z-10">
                            <h3 class="text-xl font-bold text-gray-900 mb-3">
                                <span class="text-[#dcb660] mr-2">{step.number}</span>{step.title}
                            </h3>
                            <p class="text-gray-600">{step.description}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                {#each benefits as benefit}
                    <div class="p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                        <div class="w-16 h-16 bg-[#dcb660] rounded-full flex items-center justify-center text-white mb-6">
                            <i class="fas {benefit.icon} text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                        <p class="text-gray-600">{benefit.description}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <section class="py-20 bg-teal-900 text-white">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
                <p class="text-lg opacity-90 mb-8">
                    Let us create a customized travel experience tailored to your preferences and interests.
                </p>
                <div class="flex justify-center gap-4 flex-wrap">
                    <Button 
                        variant="primary" 
                        size="lg" 
                        href="/contact"
                    >
                        Get a Custom Quote
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        href="/tours"
                    >
                        Explore Our Tours
                    </Button>
                </div>
            </div>
        </div>
    </section>

    <DestinationsSection 
        title="Destinations We Serve" 
        destinations={destinations} 
    />

    <SubscribeSection
        title="Stay Updated on Our Services"
        description="Subscribe to receive exclusive offers and information about new service offerings."
    />
</main>
<Footer />