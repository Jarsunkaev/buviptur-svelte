<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import DestinationsSection from '$lib/components/DestinationsSection.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import LazyImage from '$lib/components/LazyImage.svelte';
</script>

<Header />
<main class="bg-white">
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://via.placeholder.com/1200x800.png?text=About+BuVipTur')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">About Buviptur</h1>
            <p class="text-xl md:text-2xl mb-8">Crafting extraordinary travel experiences that inspire, connect, and transform</p>
        </div>
    </section>

    <section class="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
            <h2 class="text-3xl font-semibold text-gray-800 mb-6">Our Journey</h2>
            <p class="text-gray-600 mb-6">
                Founded with a passion for exploration, Buviptur has been creating unforgettable travel experiences since 2010. 
                Our mission is to connect travelers with the world's most incredible destinations, offering authentic and transformative journeys.
            </p>
            <div class="space-y-4">
                <h3 class="text-2xl font-semibold text-gray-800">Our Core Values</h3>
                <ul class="space-y-3">
                    {#each [
                        { icon: '✈️', text: 'Authentic Experiences' },
                        { icon: '🌍', text: 'Sustainable Tourism' },
                        { icon: '❤️', text: 'Cultural Respect' },
                        { icon: '🤝', text: 'Customer Satisfaction' }
                    ] as value}
                        <li class="flex items-center text-gray-600">
                            <span class="mr-3 text-xl">{value.icon}</span>
                            {value.text}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div class="hidden md:block">
            <img 
                src="https://images.unsplash.com/photo-1516737490857-847e4f1c5e8e?ixlib=rb-4.0.3&q=80" 
                alt="Buviptur Team" 
                class="rounded-lg shadow-lg object-cover h-[500px] w-full"
            />
        </div>
    </section>

    <WhyChooseUs />
    <DestinationsSection />
    <TestimonialsSection />
</main>
<Footer />


