<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import DestinationsSection from '$lib/components/DestinationsSection.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import SubscribeSection from '$lib/components/SubscribeSection.svelte';
    import LazyImage from '$lib/components/LazyImage.svelte';
    import { t } from 'svelte-i18n';

    // Data for the team members section with translations
    $: teamMembers = [
        {
            name: $t('about.team.emma.name') || 'Emma Johnson',
            position: $t('about.team.emma.position') || 'CEO & Founder',
            bio: $t('about.team.emma.bio') || 'With over 15 years in the travel industry, Emma brings her passion for authentic experiences to every journey we create.',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80'
        },
        {
            name: $t('about.team.michael.name') || 'Michael Chen',
            position: $t('about.team.michael.position') || 'Head of Operations',
            bio: $t('about.team.michael.bio') || 'Michael ensures that every tour runs smoothly, with impeccable attention to detail and customer satisfaction.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80'
        },
        {
            name: $t('about.team.sofia.name') || 'Sofia Gonzalez',
            position: $t('about.team.sofia.position') || 'Lead Tour Designer',
            bio: $t('about.team.sofia.bio') || 'Sofia combines her local knowledge with global travel expertise to craft unique, immersive experiences.',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80'
        },
        {
            name: $t('about.team.daniel.name') || 'Daniel Kim',
            position: $t('about.team.daniel.position') || 'Customer Experience Director',
            bio: $t('about.team.daniel.bio') || 'Daniel is dedicated to ensuring every traveler has an exceptional journey from the first inquiry to the final farewell.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80'
        }
    ];

    // Milestones data with translations
    $: milestones = [
        {
            year: '2010',
            title: $t('about.milestones.2010.title') || 'Company Founded',
            description: $t('about.milestones.2010.description') || 'BuVipTur was established with a vision to create authentic travel experiences in Central Europe.'
        },
        {
            year: '2013',
            title: $t('about.milestones.2013.title') || 'Expanded Services',
            description: $t('about.milestones.2013.description') || 'Introduced specialized factory and industrial heritage tours, a unique offering in the region.'
        },
        {
            year: '2017',
            title: $t('about.milestones.2017.title') || 'Excellence Award',
            description: $t('about.milestones.2017.description') || 'Received the European Tourism Excellence Award for our cultural immersion programs.'
        },
        {
            year: '2020',
            title: $t('about.milestones.2020.title') || 'Virtual Experience Launch',
            description: $t('about.milestones.2020.description') || 'Pioneered virtual travel experiences during global restrictions, keeping cultural connections alive.'
        },
        {
            year: '2023',
            title: $t('about.milestones.2023.title') || 'Sustainable Tourism Certification',
            description: $t('about.milestones.2023.description') || 'Achieved Gold Level Sustainable Tourism Certification for our eco-friendly practices.'
        }
    ];

    // Values data with icons and translations
    $: values = [
        {
            icon: 'fa-gem',
            title: $t('about.values.authentic.title') || 'Authentic Experiences',
            description: $t('about.values.authentic.description') || 'We create journeys that go beyond typical tourist paths, connecting travelers with real local culture.'
        },
        {
            icon: 'fa-handshake',
            title: $t('about.values.respect.title') || 'Cultural Respect',
            description: $t('about.values.respect.description') || 'We foster meaningful cross-cultural understanding and respect in every interaction.'
        },
        {
            icon: 'fa-users',
            title: $t('about.values.community.title') || 'Community Connection',
            description: $t('about.values.community.description') || 'We build lasting relationships between travelers and the communities they visit.'
        }
    ];

    // Destinations with translated names
    $: destinations = [
        { 
            name: $t('about.destinations.budapest') || 'Budapest', 
            tours: 124, 
            image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80' 
        },
        { 
            name: $t('about.destinations.vienna') || 'Vienna', 
            tours: 93, 
            image: 'https://images.unsplash.com/photo-1516550893232-fe054840d3c2?q=80' 
        },
        { 
            name: $t('about.destinations.prague') || 'Prague', 
            tours: 165, 
            image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80' 
        }
    ];

    // Testimonials with translations
    $: testimonials = [
        {
            title: $t('about.testimonials.sophie.title') || 'Great Work',
            content: $t('about.testimonials.sophie.content') || "I think BuVipTur is the best tour company I've ever used. Amazing guides, easy to customize itineraries, and a quality experience from start to finish. The factory tour was incredible!",
            author: $t('about.testimonials.sophie.author') || 'Sophie Anderson',
            position: $t('about.testimonials.sophie.position') || 'Marketing Manager',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80',
            rating: 5
        },
        {
            title: $t('about.testimonials.david.title') || 'Unforgettable Experience',
            content: $t('about.testimonials.david.content') || 'We had the most amazing time on our castle tour. The guide was knowledgeable and passionate, showing us hidden spots tourists normally miss. Can\'t wait to book our next adventure!',
            author: $t('about.testimonials.david.author') || 'David Chen',
            position: $t('about.testimonials.david.position') || 'Software Engineer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80',
            rating: 5
        }
    ];

    // WhyChooseUs data with translations
    $: benefits = [
        {
            icon: 'fa-gem',
            title: $t('about.benefits.guides.title') || 'Expert Local Guides',
            description: $t('about.benefits.guides.description') || 'Our guides are passionate locals with deep knowledge and connections to make your experience truly authentic.'
        },
        {
            icon: 'fa-handshake',
            title: $t('about.benefits.personalized.title') || 'Personalized Experiences',
            description: $t('about.benefits.personalized.description') || 'Every itinerary is customized to your interests, preferences, and pace for a perfect fit.'
        },
        {
            icon: 'fa-heart',
            title: $t('about.benefits.responsible.title') || 'Responsible Tourism',
            description: $t('about.benefits.responsible.description') || 'We prioritize sustainable practices and supporting local communities in everything we do.'
        }
    ];

    // Stats with translations
    $: stats = [
        { value: '10K+', label: $t('about.stats.travelers') || 'Happy Travelers' },
        { value: '14', label: $t('about.stats.experience') || 'Years of Experience' },
        { value: '48', label: $t('about.stats.guides') || 'Expert Guides' },
        { value: '98%', label: $t('about.stats.satisfaction') || 'Satisfaction Rate' }
    ];

    const whyImage = 'https://images.unsplash.com/photo-1522878129833-838a904a0e9e?q=80';
</script>

<Header />
<main class="bg-white">
    <!-- Hero Section -->
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center -mt-24 pt-24"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">{$t('about.title') || 'About BuVipTur'}</h1>
            <p class="text-xl md:text-2xl mb-8">{$t('about.subtitle') || 'Crafting extraordinary travel experiences that inspire, connect, and transform'}</p>
        </div>
    </section>

    <!-- About us intro section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-1 text-center items-center">
                <div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">{$t('about.journey.title') || 'Our Journey'}</h2>
                    <p class="text-lg text-gray-600 mb-6">
                        {$t('about.journey.description1') || 'Founded in 2010 with a vision to redefine travel in Central Europe, BuVipTur has grown from a small team of passionate adventurers to a leading provider of authentic travel experiences.'}
                    </p>
                    <p class="text-lg text-gray-600 mb-6">
                        {$t('about.journey.description2') || 'What makes us unique is our focus on creating immersive journeys that connect travelers with local cultures, traditions, and people. We believe that the most memorable experiences come from authentic connections and unexpected discoveries.'}
                    </p>
                    <p class="text-lg text-gray-600">
                        {$t('about.journey.description3') || 'Our specialized factory tours and industrial heritage experiences showcase the innovation and craftsmanship that have shaped the region, offering a perspective few travelers get to see.'}
                    </p>
                </div>
                <div class="order-1 md:order-2">
                    <LazyImage 
                        src="https://images.unsplash.com/photo-1522878129833-838a904a0e9e?q=80" 
                        alt={$t('about.journey.imageAlt') || 'BuVipTur team planning travel experiences'}
                        class="rounded-lg shadow-lg w-full h-auto"
                    />
                </div>
            </div>
        </div>
    </section>

    <!-- Our Values Section -->
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{$t('about.values.title') || 'Our Core Values'}</h2>
                <p class="text-lg text-gray-600">
                    {$t('about.values.subtitle') || 'These principles guide everything we do, from how we design our tours to how we interact with travelers and local communities.'}
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each values as value}
                    <div class="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                        <div class="w-16 h-16 bg-[#dcb660]/10 rounded-full flex items-center justify-center text-[#dcb660] mb-6 mx-auto">
                            <i class="fas {value.icon} text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">{value.title}</h3>
                        <p class="text-gray-600 text-center">{value.description}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>
</main>
