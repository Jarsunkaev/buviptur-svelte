<script>
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Button from '$lib/components/Button.svelte';
    import ScrollToTopButton from '$lib/components/ScrollToTopButton.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import SubscribeSection from '$lib/components/SubscribeSection.svelte';
    import DatePicker from '$lib/components/DatePicker.svelte';

    // Form submission state
    let name = '';
    let surname = '';
    let fromDate = '';
    let toDate = '';
    let email = '';
    let phone = '';
    let participants = 2;
    let ageGroup = '';
    let comments = '';
    let privacyAccepted = false;
    let isSubmitting = false;
    let submitSuccess = false;

    // Age groups
    const ageGroups = [
        { value: '0-12', label: '0-12 years' },
        { value: '12-18', label: '12-18 years' },
        { value: '19-above', label: '19+ years' }
    ];

    // Testimonials for section below form
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

    async function handleSubmit() {
    // Basic validation
    if (!name || !surname || !email || !fromDate || !toDate || !ageGroup || !privacyAccepted) {
        alert('Please fill in all required fields');
        return;
    }

    isSubmitting = true;

    const formData = {
        name,
        surname,
        email,
        phone,
        fromDate,
        toDate,
        participants,
        ageGroup,
        comments
    };

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!res.ok) {
            throw new Error('Failed to send email');
        }

        submitSuccess = true;

        // Reset form after 5 seconds
        setTimeout(() => {
            submitSuccess = false;
            name = '';
            surname = '';
            email = '';
            phone = '';
            fromDate = '';
            toDate = '';
            participants = 2;
            ageGroup = '';
            comments = '';
        }, 5000);
    } catch (error) {
        console.error('Submission error:', error);
        alert('There was an issue submitting your request. Please try again later.');
    } finally {
        isSubmitting = false;
    }
}

    // Handle image errors
    function handleImageError(event) {
        event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" fill="%23f0f0f0"><rect width="100%" height="100%" fill="%23f0f0f0"/></svg>';
        event.target.alt = 'Image placeholder';
    }

    onMount(() => {
        // Get URL parameters and populate form fields
        const params = new URLSearchParams(window.location.search);
        name = params.get('name') || '';
        surname = params.get('surname') || '';
        email = params.get('email') || '';
    });
</script>

<svelte:head>
    <title>Get Offer - BuVipTur</title>
</svelte:head>

<Header />

<main class="bg-white">
    <!-- Hero Section -->
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">Get Your Personalized Offer</h1>
            <p class="text-xl md:text-2xl mb-8">Craft your dream travel experience with our expert team</p>
        </div>
    </section>

    <!-- Form Section -->
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
                    
                    <form on:submit|preventDefault={handleSubmit} class="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
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
                                    placeholder="+36 (234) 567-8901"
                                >
                            </div>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label for="fromDate" class="block text-sm font-medium text-gray-700 mb-2">From Date *</label>
                                <DatePicker
                                    bind:value={fromDate}
                                    placeholder="Select start date"
                                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label for="toDate" class="block text-sm font-medium text-gray-700 mb-2">To Date *</label>
                                <DatePicker
                                    bind:value={toDate}
                                    placeholder="Select date"
                                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-6">
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
                                <label for="ageGroup" class="block text-sm font-medium text-gray-700 mb-2">Age Group *</label>
                                <select 
                                    id="ageGroup" 
                                    bind:value={ageGroup} 
                                    required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                >
                                    <option value="">Select Age Group</option>
                                    {#each ageGroups as group}
                                        <option value={group.value}>{group.label}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label for="comments" class="block text-sm font-medium text-gray-700 mb-2">Additional Comments or Requests</label>
                            <textarea 
                                id="comments" 
                                bind:value={comments} 
                                rows="4"
                                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                placeholder="Tell us about any special requirements, accessibility needs, or specific experiences you're looking for..."
                            ></textarea>
                        </div>
                        <div class="col-span-2">
                            <div class="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="privacy"
                                    bind:checked={privacyAccepted}
                                    class="mt-1 h-4 w-4 text-[#dcb660] border-gray-300 rounded focus:ring-[#dcb660]"
                                    required
                                />
                                <label for="privacy" class="text-sm text-gray-600">
                                    I agree to the processing of my personal data according to the <a href="/privacy" class="text-[#dcb660] hover:underline">Privacy Policy</a>. *
                                </label>
                            </div>
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
                        
                        <div class="flex justify-end pt-4">
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
                    <p class="text-gray-600">We'll create a detailed itinerary based on your preferences.</p>
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
                {#each faqItems as item}
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
<ScrollToTopButton />