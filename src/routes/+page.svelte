<script>
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Hero from '$lib/components/Hero.svelte';
    import TourSection from '$lib/components/TourSection.svelte';
    import PromoSection from '$lib/components/PromoSection.svelte';
    import ActivitiesSection from '$lib/components/ActivitiesSection.svelte';
    import DestinationsSection from '$lib/components/DestinationsSection.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import BlogSection from '$lib/components/BlogSection.svelte';
    import LazyImage from '$lib/components/LazyImage.svelte';
    
    // For responsive design
    let windowWidth;
    
    // Images and data should normally come from a backend or CMS
    // but for this example, we'll use static data
    const carouselImages = [
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&q=80',
      'https://images.unsplash.com/photo-1541343672885-9be56236302a?ixlib=rb-4.0.3&q=80'
    ];
    
    const tourData = [
      {
        title: 'Budapest Castle Tour',
        image: 'https://via.placeholder.com/800x600.png?text=Budapest+Castle+Tour',
        location: 'Budapest, Hungary',
        rating: 4.8,
        reviews: 243,
        duration: '4 days',
        price: 125,
        badge: 'POPULAR'
      },
      {
        title: 'Factory Exploration Tours',
        image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80',
        location: 'Budapest, Hungary',
        rating: 4.9,
        reviews: 186,
        duration: '2 days',
        price: 89,
        badge: 'FEATURED'
      },
      {
        title: 'Budapest Cuisine Tour',
        image: 'https://images.unsplash.com/photo-1503572327579-b5c6afe5c5c5?q=80',
        location: 'Budapest, Hungary',
        rating: 4.7,
        reviews: 152,
        duration: '1 day',
        price: 75
      },
      {
        title: 'Secret City Explorer',
        image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80',
        location: 'Budapest, Hungary',
        rating: 5.0,
        reviews: 97,
        duration: '3 days',
        price: 145
      }
    ];
    
    const promoData = [
      {
        title: 'Best staycation deals',
        image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80',
        link: '#'
      },
      {
        title: 'All Time Favourite Activities',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80',
        link: '#'
      },
      {
        title: 'Discover the wow of Europe',
        image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80',
        link: '#'
      }
    ];
    
    const activitiesData = [
      { icon: 'fa-city', title: 'City Tours', count: '100+' },
      { icon: 'fa-monument', title: 'Cultural Tours', count: '100+' },
      { icon: 'fa-ship', title: 'Day Cruises', count: '50+' },
      { icon: 'fa-bus', title: 'Bus Tours', count: '80+' },
      { icon: 'fa-industry', title: 'Factory Tours', count: '40+' },
      { icon: 'fa-utensils', title: 'Food Tours', count: '60+' }
    ];
    
    const destinationsData = [
      { name: 'Paris', tours: 245, image: 'https://via.placeholder.com/800x600.png?text=Paris+Tours' },
      { name: 'Rome', tours: 197, image: 'https://via.placeholder.com/800x600.png?text=Rome+Tours' },
      { name: 'London', tours: 210, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80' },
      { name: 'Budapest', tours: 124, image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80' },
      { name: 'Prague', tours: 165, image: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?q=80' },
      { name: 'Barcelona', tours: 178, image: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80' }
    ];
    
    const benefitsData = [
      {
        icon: 'fa-check-circle',
        title: 'Ultimate flexibility',
        description: 'You\'re in control, with free cancellation and payment options designed around your schedule.'
      },
      {
        icon: 'fa-star',
        title: 'Memorable experiences',
        description: 'Browse and book tours and activities so incredible, you\'ll want to tell your friends.'
      },
      {
        icon: 'fa-medal',
        title: 'Quality at our core',
        description: 'High quality standards. Millions of reviews. Expert local knowledge.'
      }
    ];
    
    const statsData = [
      { value: '932K+', label: 'Happy Travelers' },
      { value: '24K+', label: 'Tours Completed' },
      { value: '10K+', label: 'Positive Reviews' },
      { value: '65+', label: 'Expert Guides' }
    ];
    
    const testimonialsData = [
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
      },
      {
        title: 'Exceeded Expectations',
        content: 'The city exploration tour was the highlight of our trip to Budapest. Our guide showed us local spots we would have never discovered on our own. The food and cultural insights were amazing!',
        author: 'Emily Johnson',
        position: 'Travel Blogger',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80',
        rating: 5
      }
    ];
    
    const articlesData = [
      {
        title: 'Hidden Gems of Budapest: The Ultimate City Guide',
        image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?q=80',
        date: 'April 06, 2023',
        author: 'James Wilson',
        excerpt: 'Discover the lesser-known treasures of Budapest that most tourists never see...'
      },
      {
        title: 'Exploring Modern Manufacturing: Factory Tours in Hungary',
        image: 'https://images.unsplash.com/photo-1560179304-6fc1d8749b23?q=80',
        date: 'April 12, 2023',
        author: 'Sarah Laurent',
        excerpt: 'Take a behind-the-scenes look at how famous Hungarian products are made...'
      },
      {
        title: 'Castles of Hungary: A Journey Through History',
        image: 'https://images.unsplash.com/photo-1551868192-1c2560ab958d?q=80',
        date: 'April 18, 2023',
        author: 'Michael Chen',
        excerpt: 'Explore the majestic castles and their fascinating stories throughout Hungary...'
      }
    ];
    
    onMount(() => {
      // Any initialization code that needs to run after the component is mounted
      // For example, could initialize a third-party library here
    });
  </script>
  
  <svelte:head>
    <title>BuVipTur - Every Journey is a Privilege</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      :root {
        --teal-900: #113946;
        --teal-800: #1a5f7a;
        --teal-700: #228291;
        --teal-600: #2aa1b7;
        --accent: #dfb964;
      }
      
      body {
        font-family: 'Roboto', sans-serif;
        color: #333;
        background-color: #f9fafb;
        overflow-x: hidden;
      }
      
      /* Animation classes */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.8s ease-out forwards;
      }
      
      .animate-delay-100 {
        animation-delay: 0.1s;
      }
      
      .animate-delay-200 {
        animation-delay: 0.2s;
      }
      
      .animate-delay-300 {
        animation-delay: 0.3s;
      }

      /* Container styles */
      .container {
        width: 100%;
        max-width: 1280px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
      }

      @media (min-width: 640px) {
        .container {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
      }

      @media (min-width: 1024px) {
        .container {
          padding-left: 2rem;
          padding-right: 2rem;
        }
      }
    </style>
  </svelte:head>
  
  <svelte:window bind:innerWidth={windowWidth} />
  
  <div class="min-h-screen flex flex-col">
    <Header />
    
    <main class="flex-grow">
      <Hero 
        {carouselImages} 
        isMobile={windowWidth < 1024} 
      />
      
      <section id="tours">
        <TourSection 
          title="Best of Budapest"
          tours={tourData} 
        />
      </section>
      />
      
      <DestinationsSection 
        title="Explore Our Destinations" 
        destinations={destinationsData} 
      />
      
      <WhyChooseUs 
        title="Why Travel With Us" 
        benefits={benefitsData} 
        stats={statsData} 
      />
      
      <TestimonialsSection 
        title="What our Travelers are saying" 
        averageRating={4.9} 
        reviewCount="1000+" 
        certificationText="Certificate of Excellence" 
        testimonials={testimonialsData} 
      />
    </main>
    
    <Footer />
  </div>