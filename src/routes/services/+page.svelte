<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import DestinationsSection from '$lib/components/DestinationsSection.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import LazyImage from '$lib/components/LazyImage.svelte';

    const services = [
        {
            title: 'Accommodation',
            description: 'We offer a wide range of accommodation options tailored to your preferences and budget. From cozy hostels to luxury hotels, we ensure a comfortable stay throughout your journey.',
            icon: 'fa-hotel',
            features: [
                'Budget-friendly hostels',
                'Mid-range hotels',
                'Luxury accommodations',
                'Apartment and homestay options'
            ]
        },
        {
            title: 'Visa Processes',
            description: 'Navigating visa requirements can be complex. Our expert team provides comprehensive visa assistance to ensure a smooth travel experience for all our clients.',
            icon: 'fa-passport',
            features: [
                'Visa application guidance',
                'Document preparation support',
                'Embassy communication assistance',
                'Travel requirement consultations'
            ]
        },
        {
            title: 'Transportation',
            description: 'Seamless transportation is key to a stress-free journey. We offer various transportation solutions to connect you with your destinations efficiently and comfortably.',
            icon: 'fa-bus',
            features: [
                'Private transfers',
                'Group transportation',
                'Airport shuttle services',
                'Inter-city travel arrangements'
            ]
        },
        {
            title: 'Tour Guides',
            description: 'Our multilingual, professional tour guides bring destinations to life with their deep knowledge, passion, and engaging storytelling.',
            icon: 'fa-user-tie',
            features: [
                'Expert local guides',
                'Multiple language support',
                'Cultural insights',
                'Personalized tour experiences'
            ]
        },
        {
            title: 'Boat Tours',
            description: 'Experience the beauty of Central European waterways with our specialized boat tours. From river cruises to scenic boat trips, we offer unique aquatic adventures.',
            icon: 'fa-ship',
            features: [
                'River Danube cruises',
                'Scenic boat trips',
                'Themed evening cruises',
                'Private boat charters'
            ]
        }
    ];
</script>

<Header />
<main class="bg-white">
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://via.placeholder.com/1200x800.png?text=Our+Services')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">Our Services</h1>
            <p class="text-xl md:text-2xl mb-8">Comprehensive travel solutions crafted with expertise and care</p>
        </div>
    </section>

    <section class="container mx-auto px-6 py-16">
        <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-[#113946] mb-4">Comprehensive Travel Solutions</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">We offer a complete range of services designed to make your travel experience seamless, comfortable, and unforgettable.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each services as service}
                <div class="bg-white shadow-lg rounded-lg p-8 text-center transform transition duration-300 hover:scale-105">
                    <div class="mb-6 flex items-center justify-center">
                        <i class="fas {service.icon} text-6xl text-[#113946]"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-[#113946] mb-4">{service.title}</h3>
                    <p class="text-gray-600 mb-6">{service.description}</p>
                    <div class="mb-4">
                        <h4 class="font-semibold text-[#113946] mb-2">Key Features:</h4>
                        <ul class="list-disc list-inside text-gray-600">
                            {#each service.features as feature}
                                <li>{feature}</li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <WhyChooseUs />
    <DestinationsSection />
    <TestimonialsSection />
</main>
<Footer />
