<script>
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
    import DestinationsSection from '$lib/components/DestinationsSection.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import LazyImage from '$lib/components/LazyImage.svelte';

    let name = '';
    let surname = '';
    let fromDate = '';
    let toDate = '';
    let participants = 1;
    let ageGroup = '';
    let comments = '';
    let isSubmitting = false;
    let submitSuccess = false;

    async function handleSubmit() {
        // Basic form validation
        if (!name || !surname || !fromDate || !toDate || !ageGroup) {
            alert('Please fill in all required fields');
            return;
        }

        isSubmitting = true;

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Here you would typically send the form data to a backend
            console.log('Form submitted', {
                name, 
                surname, 
                fromDate, 
                toDate, 
                participants, 
                ageGroup, 
                comments
            });

            // Show success message
            submitSuccess = true;

            // Reset form after 3 seconds
            setTimeout(() => {
                submitSuccess = false;
                name = '';
                surname = '';
                fromDate = '';
                toDate = '';
                participants = 1;
                ageGroup = '';
                comments = '';
            }, 3000);
        } catch (error) {
            console.error('Submission error', error);
            alert('Failed to submit request. Please try again.');
        } finally {
            isSubmitting = false;
        }
    }

    // Flatpickr for date selection
    onMount(() => {
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
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
</svelte:head>

<Header />
<main class="bg-white">
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://via.placeholder.com/1200x800.png?text=Contact+BuVipTur')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">Get Your Personalized Offer</h1>
            <p class="text-xl md:text-2xl mb-8">Craft your dream travel experience with our expert team</p>
        </div>
    </section>

    <section class="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div class="hidden md:block">
            <img 
                src="https://images.unsplash.com/photo-1516737490857-847e4f1c5e8e?ixlib=rb-4.0.3&q=80" 
                alt="Travel Consultation" 
                class="rounded-lg shadow-lg object-cover h-full w-full"
            />
        </div>

        <div>
            <h2 class="text-3xl font-semibold text-gray-800 mb-8 text-center">Tell Us About Your Dream Trip</h2>
            
            {#if submitSuccess}
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span class="block sm:inline">Your tour offer request has been submitted successfully!</span>
                </div>
            {:else}
                <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                            <input 
                                type="text" 
                                id="name" 
                                bind:value={name} 
                                required 
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
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
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                placeholder="Your last name"
                            >
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label for="fromDate" class="block text-sm font-medium text-gray-700 mb-2">From Date *</label>
                            <input 
                                type="text" 
                                id="fromDate" 
                                bind:value={fromDate} 
                                required 
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
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
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                placeholder="Select end date"
                            >
                        </div>
                    </div>

                    <div>
                        <label for="participants" class="block text-sm font-medium text-gray-700 mb-2">Number of Participants</label>
                        <input 
                            type="number" 
                            id="participants" 
                            bind:value={participants} 
                            min="1" 
                            max="20"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                        >
                    </div>

                    <div>
                        <label for="ageGroup" class="block text-sm font-medium text-gray-700 mb-2">Age Group *</label>
                        <select 
                            id="ageGroup" 
                            bind:value={ageGroup} 
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                        >
                            <option value="">Select Age Group</option>
                            <option value="0-12">0-12 years</option>
                            <option value="12-18">12-18 years</option>
                            <option value="19+">19 or above</option>
                        </select>
                    </div>

                    <div>
                        <label for="comments" class="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
                        <textarea 
                            id="comments" 
                            bind:value={comments} 
                            rows="4"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                            placeholder="Any special requests or additional information"
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        class="w-full bg-[#dcb660] text-white py-3 rounded-md hover:bg-[#c2a050] transition-colors duration-300 flex items-center justify-center"
                        disabled={isSubmitting}
                    >
                        {#if isSubmitting}
                            <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        {/if}
                        Request Offer
                    </button>
                </form>
            {/if}
        </div>
    </section>

    <WhyChooseUs />
    <DestinationsSection />
    <TestimonialsSection />
</main>
<Footer />


