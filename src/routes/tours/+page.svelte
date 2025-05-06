<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import TourSection from '$lib/components/TourSection.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import DestinationsSection from '$lib/components/DestinationsSection.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import LazyImage from '$lib/components/LazyImage.svelte';

    const tourTypes = [
        {
            title: 'Historical Tours',
            description: 'Dive deep into the rich history of Central Europe. Our expert guides bring centuries of stories to life, from medieval castles to World War II sites.',
            languages: ['English', 'Turkish', 'German'],
            image: 'https://via.placeholder.com/800x600.png?text=Historical+Tours',
            highlights: [
                'Medieval Castle Tours in Hungary',
                'Habsburg Empire Historical Routes',
                'World War II Memorial Sites',
                'Ancient Roman Archaeological Tours'
            ]
        },
        {
            title: 'Cultural Immersion Tours',
            description: 'Experience the authentic local culture, traditions, and daily life in Central European countries. Connect with local communities and understand their unique heritage.',
            languages: ['English', 'Turkish', 'French'],
            image: 'https://via.placeholder.com/800x600.png?text=Cultural+Tours',
            highlights: [
                'Traditional Craft Workshops',
                'Local Cuisine and Cooking Classes',
                'Folk Music and Dance Experiences',
                'Community Interaction Programs'
            ]
        },
        {
            title: 'EU Multi-Country Tours',
            description: 'Explore multiple European countries in one comprehensive journey. Our multi-country tours offer a seamless travel experience across borders.',
            languages: ['English', 'Turkish', 'Spanish'],
            image: 'https://via.placeholder.com/800x600.png?text=EU+Tours',
            highlights: [
                'Hungary-Austria-Slovakia Circuit',
                'Czech Republic-Germany-Poland Route',
                'Balkans Cultural Expedition',
                'Western European Capital Cities Tour'
            ]
        },
        {
            title: 'Specialized Thematic Tours',
            description: 'Tailored tours for specific interests, including wine tours, architectural journeys, and industrial heritage explorations.',
            languages: ['English', 'Turkish', 'Italian'],
            image: 'https://via.placeholder.com/800x600.png?text=Thematic+Tours',
            highlights: [
                'Wine Tasting Routes in Hungary',
                'Architectural Photography Tours',
                'Industrial Heritage and Factory Tours',
                'Art and Museum Exploration'
            ]
        }
    ];

    const tourLanguages = [
        { name: 'English', flag: '🇬🇧' },
        { name: 'Turkish', flag: '🇹🇷' },
        { name: 'German', flag: '🇩🇪' },
        { name: 'French', flag: '🇫🇷' },
        { name: 'Spanish', flag: '🇪🇸' },
        { name: 'Italian', flag: '🇮🇹' }
    ];
</script>

<Header />
<main class="bg-white">
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">Our Tours</h1>
            <p class="text-xl md:text-2xl mb-8">Discover extraordinary journeys tailored to your wanderlust</p>
        </div>
    </section>

    <section class="container mx-auto px-6 py-16">
        <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-[#113946] mb-4">Explore Our Unique Tour Experiences</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Immerse yourself in the heart of Central Europe with our meticulously crafted tours, offering deep cultural insights and unforgettable experiences.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {#each tourTypes as tour}
                <div class="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                    <LazyImage 
                        src={tour.image} 
                        alt={tour.title} 
                        width="100%" 
                        height="16rem" 
                        classes="w-full h-64 object-cover" 
                    />
                    <div class="p-6">
                        <h3 class="text-2xl font-bold text-[#113946] mb-3">{tour.title}</h3>
                        <p class="text-gray-600 mb-4">{tour.description}</p>
                        <div class="mb-4">
                            <h4 class="font-semibold text-[#113946] mb-2">Available Languages:</h4>
                            <div class="flex space-x-2">
                                {#each tour.languages as lang}
                                    <span class="text-lg">{tourLanguages.find(l => l.name === lang)?.flag} {lang}</span>
                                {/each}
                            </div>
                        </div>
                        <div class="mb-4">
                            <h4 class="font-semibold text-[#113946] mb-2">Tour Highlights:</h4>
                            <ul class="list-disc list-inside text-gray-600">
                                {#each tour.highlights as highlight}
                                    <li>{highlight}</li>
                                {/each}
                            </ul>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <section class="container mx-auto px-4 py-16">
        <h2 class="text-3xl font-semibold text-gray-800 mb-12 text-center">Explore Our Curated Tours</h2>
        <TourSection />
    </section>

    <WhyChooseUs />
    <DestinationsSection />
    <TestimonialsSection />
</main>
<Footer />


