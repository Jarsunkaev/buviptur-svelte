<script>
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import SubscribeSection from '$lib/components/SubscribeSection.svelte';
    import Button from '$lib/components/Button.svelte';

    // Form submission state
    let name = '';
    let surname = '';
    let fromDate = '';
    let toDate = '';
    let email = '';
    let phone = '';
    let participants = 2;
    let ageGroup = '';
    let tourType = '';
    let budget = '';
    let interests = [];
    let comments = '';
    let isSubmitting = false;
    let submitSuccess = false;
    let step = 1;
    let totalSteps = 3;

    // Available interests
    const availableInterests = [
        'Historical Sites', 'Local Cuisine', 'Cultural Events', 
        'Factory Tours', 'Adventure Activities', 'Art & Museums',
        'Wine Tasting', 'Shopping', 'Nature & Outdoors'
    ];

    // Available tour types
    const availableTourTypes = [
        { value: 'historical', label: 'Historical Tour' },
        { value: 'cultural', label: 'Cultural Immersion' },
        { value: 'factory', label: 'Factory & Industrial Heritage' },
        { value: 'culinary', label: 'Culinary Experience' },
        { value: 'multi-country', label: 'Multi-Country Tour' },
        { value: 'custom', label: 'Custom Itinerary' }
    ];

    // Available budget ranges
    const budgetRanges = [
        { value: 'economy', label: 'Economy' },
        { value: 'standard', label: 'Standard' },
        { value: 'premium', label: 'Premium' },
        { value: 'luxury', label: 'Luxury' }
    ];

    // Testimonials specifically about booking process
    const testimonials = [
        {
            title: 'Seamless Booking Process',
            content: "I was impressed by how easy it was to get a customized tour. Within 24 hours of submitting my request, I received a detailed itinerary that perfectly matched what I was looking for. The team was responsive and accommodating to all my questions.",
            author: 'Emily Johnson',
            position: 'Toronto, Canada',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80',
            rating: 5
        },
        {
            title: 'Perfectly Tailored Experience',
            content: 'The custom tour I received was beyond expectations. They took all our preferences into account and created an itinerary that balanced our interest in history with our love for local cuisine. Every detail was thoughtfully planned.',
            author: 'Michael Chen',
            position: 'Sydney, Australia',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80',
            rating: 5
        }
    ];

    // FAQ items
    const faqItems = [
        {
            question: 'How quickly will I receive my personalized tour offer?',
            answer: 'We typically respond within 24-48 hours with an initial proposal. For more complex multi-country tours, it may take up to 72 hours to create a detailed itinerary.'
        },
        {
            question: 'Can I modify the tour offer after receiving it?',
            answer: 'Absolutely! We see the initial proposal as a starting point for discussion. Our team will work with you to refine the itinerary until it perfectly matches your preferences.'
        },
        {
            question: 'Is a deposit required when requesting a tour offer?',
            answer: 'No, requesting a personalized tour offer is completely free and without obligation. A deposit is only required after you have approved the final itinerary and are ready to book.'
        },
        {
            question: 'How far in advance should I request a tour?',
            answer: 'For the best availability, especially during peak season (May-September), we recommend requesting your tour at least 2-3 months in advance. Last-minute requests are possible but may have limited options.'
        }
    ];

    // WhyChooseUs content specifically for custom tours
    const benefits = [
        {
            icon: 'fa-user-check',
            title: 'Personalized Attention',
            description: 'Each request is handled by a dedicated travel consultant who will be your point of contact throughout the process.'
        },
        {
            icon: 'fa-lightbulb',
            title: 'Local Expertise',
            description: 'Our team of local experts creates authentic experiences that go beyond typical tourist routes.'
        },
        {
            icon: 'fa-handshake',
            title: 'No Obligation',
            description: 'Requesting a custom tour is completely free, with no commitment required until you have 100% satisfaction with your itinerary.'
        }
    ];

    const stats = [
        { value: '24h', label: 'Response Time' },
        { value: '98%', label: 'Satisfaction Rate' },
        { value: '100%', label: 'Tailor-Made' }
    ];

    // Handle form steps
    function nextStep() {
        if (step < totalSteps) {
            step++;
            window.scrollTo(0, 0);
        }
    }

    function prevStep() {
        if (step > 1) {
            step--;
            window.scrollTo(0, 0);
        }
    }

    // Toggle interest selection
    function toggleInterest(interest) {
        if (interests.includes(interest)) {
            interests = interests.filter(i => i !== interest);
        } else {
            interests = [...interests, interest];
        }
    }

    // Handle form submission
    async function handleSubmit() {
        // Basic form validation
        if (!name || !surname || !email || !fromDate || !toDate || !ageGroup) {
            alert('Please fill in all required fields');
            return;
        }

        isSubmitting = true;

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Form submitted', {
                name, surname, email, phone,
                fromDate, toDate, 
                participants, ageGroup, 
                tourType, budget, interests,
                comments
            });

            // Show success message
            submitSuccess = true;

            // Reset form after 5 seconds and return to step 1
            setTimeout(() => {
                submitSuccess = false;
                step = 1;
                name = '';
                surname = '';
                email = '';
                phone = '';
                fromDate = '';
                toDate = '';
                participants = 2;
                ageGroup = '';
                tourType = '';
                budget = '';
                interests = [];
                comments = '';
            }, 5000);
        } catch (error) {
            console.error('Submission error', error);
            alert('Failed to submit request. Please try again.');
        } finally {
            isSubmitting = false;
        }
    }

    // Initialize flatpickr for date selection
    onMount(() => {
        if (typeof window !== 'undefined') {
            import('flatpickr').then(module => {
                const flatpickr = module.default;
                flatpickr('#fromDate', {
                    dateFormat: 'Y-m-d',
                    minDate: 'today'
                });
                flatpickr('#toDate', {
                    dateFormat: 'Y-m-d',
                    minDate: 'today'
                });
            });
        }
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
</svelte:head>

<Header />
<main class="bg-white">
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">Get Your Personalized Offer</h1>
            <p class="text-xl md:text-2xl mb-8">Craft your dream travel experience with our expert team</p>
        </div>
    </section>

    <!-- Form Section with Steps -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4 max-w-5xl">
            {#if submitSuccess}
                <div class="bg-green-50 border-l-4 border-green-500 p-8 rounded-lg shadow-lg text-center">
                    <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-check text-green-500 text-4xl"></i>
                    </div>
                    <h2 class="text-3xl font-bold text-gray-800 mb-4">Request Submitted Successfully!</h2>
                    <p class="text-lg text-gray-600 mb-6">
                        Thank you for your interest in our tours. One of our travel experts will review your request and get back to you within 24 hours with a personalized offer.
                    </p>
                    <p class="text-gray-600 mb-8">
                        A confirmation has been sent to your email. Please check your inbox (and spam folder) for more information.
                    </p>
                    <Button 
                        variant="primary"
                        size="lg"
                        href="/tours"
                    >
                        Explore Our Tours
                    </Button>
                </div>
            {:else}
                <div class="mb-10">
                    <h2 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Tell Us About Your Dream Trip</h2>
                    
                    <!-- Progress bar -->
                    <div class="mb-12 relative">
                        <div class="flex justify-between mb-2">
                            {#each Array(totalSteps) as _, i}
                                <div class="flex flex-col items-center">
                                    <div class={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${step > i ? 'bg-[#dcb660]' : i === step - 1 ? 'bg-[#dcb660] animate-pulse' : 'bg-gray-300'}`}>
                                        {i + 1}
                                    </div>
                                    <span class="text-sm mt-2 text-gray-600">{i === 0 ? 'Traveler Info' : i === 1 ? 'Trip Details' : 'Preferences'}</span>
                                </div>
                            {/each}
                        </div>
                        <div class="w-full bg-gray-200 h-2 rounded-full mt-2 mb-4">
                            <div class="bg-[#dcb660] h-2 rounded-full transition-all duration-500" style={`width: ${(step / totalSteps) * 100}%`}></div>
                        </div>
                    </div>
                    
                    <form on:submit|preventDefault={handleSubmit} class="space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                        <!-- Step 1: Traveler Information -->
                        {#if step === 1}
                            <div class="space-y-6">
                                <h3 class="text-xl font-semibold text-gray-800 mb-4">Traveler Information</h3>
                                
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            bind:value={name} 
                                            required 
                                            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                            placeholder="Your first name"
                                        >
                                    </div>
                                    <div>
                                        <label for="surname" class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                        <input 
                                            type="text" 
                                            id="surname" 
                                            bind:value={surname} 
                                            required 
                                            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                            placeholder="Your last name"
                                        >
                                    </div>
                                </div>
                                
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            bind:value={email} 
                                            required 
                                            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                            placeholder="your.email@example.com"
                                        >
                                    </div>
                                    <div>
                                        <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            bind:value={phone} 
                                            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                            placeholder="+1 (234) 567-8901"
                                        >
                                    </div>
                                </div>
                                
                                <div>
                                    <label for="ageGroup" class="block text-sm font-medium text-gray-700 mb-2">Age Group *</label>
                                    <select 
                                        id="ageGroup" 
                                        bind:value={ageGroup} 
                                        required
                                        class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                    >
                                        <option value="">Select Age Group</option>
                                        <option value="18-30">18-30 years</option>
                                        <option value="31-45">31-45 years</option>
                                        <option value="46-60">46-60 years</option>
                                        <option value="61+">61 or above</option>
                                        <option value="mixed">Mixed age group</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="flex justify-end pt-4">
                                <Button 
                                    variant="primary"
                                    size="lg"
                                    on:click={nextStep}
                                >
                                    Next Step <i class="fas fa-arrow-right ml-2"></i>
                                </Button>
                            </div>
                        {/if}
                        
                        <!-- Step 2: Trip Details -->
                        {#if step === 2}
                            <div class="space-y-6">
                                <h3 class="text-xl font-semibold text-gray-800 mb-4">Trip Details</h3>
                                
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label for="fromDate" class="block text-sm font-medium text-gray-700 mb-2">From Date *</label>
                                        <input 
                                            type="text" 
                                            id="fromDate" 
                                            bind:value={fromDate} 
                                            required 
                                            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                            placeholder="Select start date"
                                        >
                                    </div>
                                    <div>
                                        <label for="toDate" class="block text-sm font-medium text-gray-700 mb-2">To Date *</label>
                                        <input 
                                            type="text" 
                                            id="toDate" 
                                            bind:value={toDate} 
                                            required 
                                            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                            placeholder="Select end date"
                                        >
                                    </div>
                                </div>
                                
                                <div>
                                    <label for="participants" class="block text-sm font-medium text-gray-700 mb-2">Number of Participants</label>
                                    <div class="flex items-center w-full">
                                         <button 
                                             type="button"
                                             class="px-4 py-3 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300"
                                             on:click={() => participants = Math.max(1, participants - 1)}
                                             aria-label="Decrease number of participants"
                                         >
                                             <i class="fas fa-minus" aria-hidden="true"></i>
                                         </button>
                                        <input 
                                            type="number" 
                                            id="participants" 
                                            bind:value={participants} 
                                            min="1" 
                                            max="20"
                                            class="w-full px-4 py-3 border-y border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                        >
                                         <button 
                                             type="button"
                                             class="px-4 py-3 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
                                             on:click={() => participants = Math.min(20, participants + 1)}
                                             aria-label="Increase number of participants"
                                         >
                                             <i class="fas fa-plus" aria-hidden="true"></i>
                                         </button>
                                    </div>
                                </div>
                                
                                <div>
                                    <label for="tourType" class="block text-sm font-medium text-gray-700 mb-2">Tour Type</label>
                                    <select 
                                        id="tourType" 
                                        bind:value={tourType} 
                                        class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                    >
                                        <option value="">Select Tour Type</option>
                                        {#each availableTourTypes as type}
                                            <option value={type.value}>{type.label}</option>
                                        {/each}
                                    </select>
                                </div>
                                
                                <div>
                                    <label for="budget" class="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                                    <select 
                                        id="budget" 
                                        bind:value={budget} 
                                        class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                    >
                                        <option value="">Select Budget Range</option>
                                        {#each budgetRanges as range}
                                            <option value={range.value}>{range.label}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>
                            
                            <div class="flex justify-between pt-4">
                                <Button 
                                    variant="secondary"
                                    size="lg"
                                    on:click={prevStep}
                                >
                                    <i class="fas fa-arrow-left mr-2"></i> Previous
                                </Button>
                                <Button 
                                    variant="primary"
                                    size="lg"
                                    on:click={nextStep}
                                >
                                    Next Step <i class="fas fa-arrow-right ml-2"></i>
                                </Button>
                            </div>
                        {/if}
                        
                        <!-- Step 3: Preferences and Submission -->
                        {#if step === 3}
                            <div class="space-y-6">
                                <h3 class="text-xl font-semibold text-gray-800 mb-4">Travel Preferences</h3>
                                
                                <div>
                                     <label for="interest-areas" class="block text-sm font-medium text-gray-700 mb-4">Interest Areas</label>
                                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {#each availableInterests as interest}
                                             <button 
                                                 type="button"
                                                 class={`py-3 px-4 rounded-md border text-left transition-colors ${interests.includes(interest) ? 'bg-[#dcb660]/10 border-[#dcb660] text-[#dcb660]' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                                                 on:click={() => toggleInterest(interest)}
                                             >
                                                 <i class={`mr-2 ${interests.includes(interest) ? 'fas fa-check-circle text-[#dcb660]' : 'far fa-circle'}`} aria-hidden="true"></i>
                                                 {interest}
                                            </button>
                                        {/each}
                                    </div>
                                </div>
                                
                                <div>
                                    <label for="comments" class="block text-sm font-medium text-gray-700 mb-2">Additional Requests or Information</label>
                                    <textarea 
                                        id="comments" 
                                        bind:value={comments} 
                                        rows="4"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                        placeholder="Tell us about any special requirements, accessibility needs, or specific experiences you're looking for..."
                                    ></textarea>
                                </div>
                                
                                <div class="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                                    <div class="flex items-start">
                                        <input 
                                            type="checkbox" 
                                            id="terms" 
                                            required
                                            class="mt-1 mr-3"
                                        >
                                        <label for="terms" class="text-sm text-gray-700">
                                            I agree to receive email communications about my tour request and understand that my data will be processed according to the <a href="/privacy-policy" class="text-[#dcb660] hover:underline">Privacy Policy</a>.
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex justify-between pt-4">
                                <Button 
                                    variant="secondary"
                                    size="lg"
                                    on:click={prevStep}
                                >
                                    <i class="fas fa-arrow-left mr-2"></i> Previous
                                </Button>
                                <Button 
                                    variant="primary"
                                    size="lg"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {#if isSubmitting}
                                        <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    {:else}
                                        Submit Request
                                    {/if}
                                </Button>
                            </div>
                        {/if}
                    </form>
                </div>
            {/if}
        </div>
    </section>

    <!-- What to Expect Section -->
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What to Expect</h2>
                <p class="text-lg text-gray-600">
                    After submitting your request, here's what happens next:
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                <div class="bg-white p-6 rounded-xl shadow-md text-center relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#dcb660] text-white flex items-center justify-center">1</div>
                    <i class="fas fa-envelope-open-text text-[#dcb660] text-4xl mb-4"></i>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Confirmation</h3>
                    <p class="text-gray-600">You'll receive an immediate email confirming we've received your request.</p>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-md text-center relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#dcb660] text-white flex items-center justify-center">2</div>
                    <i class="fas fa-comments text-[#dcb660] text-4xl mb-4"></i>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Initial Discussion</h3>
                    <p class="text-gray-600">A travel consultant will contact you within 24 hours to discuss your needs in detail.</p>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-md text-center relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#dcb660] text-white flex items-center justify-center">3</div>
                    <i class="fas fa-file-alt text-[#dcb660] text-4xl mb-4"></i>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Custom Proposal</h3>
                    <p class="text-gray-600">We'll create a detailed itinerary based on your preferences and budget.</p>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-md text-center relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#dcb660] text-white flex items-center justify-center">4</div>
                    <i class="fas fa-magic text-[#dcb660] text-4xl mb-4"></i>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Fine-Tuning</h3>
                    <p class="text-gray-600">We'll refine the itinerary with your feedback until it's perfect.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p class="text-lg text-gray-600">
                    Questions about our custom tour process? Find answers to common queries below.
                </p>
            </div>
            
            <div class="max-w-3xl mx-auto divide-y divide-gray-200">
                {#each faqItems as item, i}
                    <div class="py-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">{item.question}</h3>
                        <p class="text-gray-600">{item.answer}</p>
                    </div>
                {/each}
            </div>
            
            <div class="text-center mt-12">
                <p class="text-gray-600 mb-4">Still have questions?</p>
                <Button 
                    variant="secondary"
                    size="lg"
                    href="mailto:info@buviptur.com"
                >
                    Contact Us Directly
                </Button>
            </div>
        </div>
    </section>

    <WhyChooseUs 
        title="Why Choose Our Custom Tours" 
        benefits={benefits} 
        stats={stats} 
        image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80"
    />

    <TestimonialsSection 
        title="What Our Travelers Say" 
        averageRating={4.9} 
        reviewCount="1000+" 
        certificationText="Certificate of Excellence" 
        testimonials={testimonials} 
    />

    <SubscribeSection
        title="Stay Connected"
        description="Subscribe to receive travel inspiration, exclusive offers, and updates on new destinations."
    />
</main>
<Footer />