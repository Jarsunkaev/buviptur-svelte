<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import DestinationsSection from '$lib/components/DestinationsSection.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import SubscribeSection from '$lib/components/SubscribeSection.svelte';
    import LazyImage from '$lib/components/LazyImage.svelte';

    // Data for the team members section
    const teamMembers = [
        {
            name: 'Emma Johnson',
            position: 'CEO & Founder',
            bio: 'With over 15 years in the travel industry, Emma brings her passion for authentic experiences to every journey we create.',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80'
        },
        {
            name: 'Michael Chen',
            position: 'Head of Operations',
            bio: 'Michael ensures that every tour runs smoothly, with impeccable attention to detail and customer satisfaction.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80'
        },
        {
            name: 'Sofia Gonzalez',
            position: 'Lead Tour Designer',
            bio: 'Sofia combines her local knowledge with global travel expertise to craft unique, immersive experiences.',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80'
        },
        {
            name: 'Daniel Kim',
            position: 'Customer Experience Director',
            bio: 'Daniel is dedicated to ensuring every traveler has an exceptional journey from the first inquiry to the final farewell.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80'
        }
    ];

    // Milestones data
    const milestones = [
        {
            year: '2010',
            title: 'Company Founded',
            description: 'BuVipTur was established with a vision to create authentic travel experiences in Central Europe.'
        },
        {
            year: '2013',
            title: 'Expanded Services',
            description: 'Introduced specialized factory and industrial heritage tours, a unique offering in the region.'
        },
        {
            year: '2017',
            title: 'Excellence Award',
            description: 'Received the European Tourism Excellence Award for our cultural immersion programs.'
        },
        {
            year: '2020',
            title: 'Virtual Experience Launch',
            description: 'Pioneered virtual travel experiences during global restrictions, keeping cultural connections alive.'
        },
        {
            year: '2023',
            title: 'Sustainable Tourism Certification',
            description: 'Achieved Gold Level Sustainable Tourism Certification for our eco-friendly practices.'
        }
    ];

    // Values data with icons
    const values = [
        {
            icon: 'fa-gem',
            title: 'Authentic Experiences',
            description: 'We create journeys that go beyond typical tourist paths, connecting travelers with real local culture.'
        },
        {
            icon: 'fa-leaf',
            title: 'Sustainable Tourism',
            description: 'Our tours are designed to benefit local communities while minimizing environmental impact.'
        },
        {
            icon: 'fa-handshake',
            title: 'Cultural Respect',
            description: 'We foster meaningful cross-cultural understanding and respect in every interaction.'
        },
        {
            icon: 'fa-heart',
            title: 'Personalized Care',
            description: 'Every traveler receives individualized attention and service tailored to their unique needs.'
        },
        {
            icon: 'fa-lightbulb',
            title: 'Innovation',
            description: 'We constantly evolve our offerings to incorporate new insights and possibilities in travel.'
        },
        {
            icon: 'fa-users',
            title: 'Community Connection',
            description: 'We build lasting relationships between travelers and the communities they visit.'
        }
    ];

    const destinations = [
        { name: 'Budapest', tours: 124, image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80' },
        { name: 'Vienna', tours: 93, image: 'https://images.unsplash.com/photo-1516550893232-fe054840d3c2?q=80' },
        { name: 'Prague', tours: 165, image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80' }
    ];

    const testimonials = [
        {
            title: 'Great Work',
            content: "I think BuVipTur is the best tour company I've ever used. Amazing guides, easy to customize itineraries, and a quality experience from start to finish. The factory tour was incredible!",
            author: 'Sophie Anderson',
            position: 'Marketing Manager',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80',
            rating: 5
        },
        {
            title: 'Unforgettable Experience',
            content: 'We had the most amazing time on our castle tour. The guide was knowledgeable and passionate, showing us hidden spots tourists normally miss. Can\'t wait to book our next adventure!',
            author: 'David Chen',
            position: 'Software Engineer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80',
            rating: 5
        }
    ];

    // WhyChooseUs data
    const benefits = [
        {
            icon: 'fa-gem',
            title: 'Expert Local Guides',
            description: 'Our guides are passionate locals with deep knowledge and connections to make your experience truly authentic.'
        },
        {
            icon: 'fa-handshake',
            title: 'Personalized Experiences',
            description: 'Every itinerary is customized to your interests, preferences, and pace for a perfect fit.'
        },
        {
            icon: 'fa-heart',
            title: 'Responsible Tourism',
            description: 'We prioritize sustainable practices and supporting local communities in everything we do.'
        }
    ];

    const stats = [
        { value: '10K+', label: 'Happy Travelers' },
        { value: '14', label: 'Years of Experience' },
        { value: '48', label: 'Expert Guides' },
        { value: '98%', label: 'Satisfaction Rate' }
    ];

    const whyImage = 'https://images.unsplash.com/photo-1522878129833-838a904a0e9e?q=80';

</script>

<Header />
<main class="bg-white">
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">About BuVipTur</h1>
            <p class="text-xl md:text-2xl mb-8">Crafting extraordinary travel experiences that inspire, connect, and transform</p>
        </div>
    </section>

    <!-- About us intro section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="order-2 md:order-1">
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
                    <p class="text-lg text-gray-600 mb-6">
                        Founded in 2010 with a vision to redefine travel in Central Europe, BuVipTur has grown from a small team of passionate adventurers to a leading provider of authentic travel experiences.
                    </p>
                    <p class="text-lg text-gray-600 mb-6">
                        What makes us unique is our focus on creating immersive journeys that connect travelers with local cultures, traditions, and people. We believe that the most memorable experiences come from authentic connections and unexpected discoveries.
                    </p>
                    <p class="text-lg text-gray-600">
                        Our specialized factory tours and industrial heritage experiences showcase the innovation and craftsmanship that have shaped the region, offering a perspective few travelers get to see.
                    </p>
                </div>
                <div class="order-1 md:order-2 relative">
                    <img 
                        src="https://images.unsplash.com/photo-1516737490857-847e4f1c5e8e?q=80" 
                        alt="BuVipTur Team" 
                        class="rounded-lg shadow-xl object-cover h-[500px] w-full transform hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div class="absolute -bottom-8 -right-8 bg-[#dcb660] p-6 rounded-lg shadow-lg hidden md:block">
                        <p class="text-2xl font-bold text-white">14+ Years</p>
                        <p class="text-white">Creating Memories</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Our Values Section -->
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                <p class="text-lg text-gray-600">
                    These principles guide everything we do, from how we design our tours to how we interact with travelers and local communities.
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

   

    <WhyChooseUs 
        title="Why Travel With Us" 
        benefits={benefits} 
        stats={stats}
        image={whyImage}
    />
    
    <TestimonialsSection 
        title="What Our Travelers Are Saying" 
        averageRating={4.9} 
        reviewCount="1000+" 
        certificationText="Certificate of Excellence" 
        testimonials={testimonials} 
    />

    <SubscribeSection
        title="Join Our Travel Community"
        description="Subscribe to receive exclusive offers, travel tips, and inspiration for your next adventure."
    />
</main>
<Footer />