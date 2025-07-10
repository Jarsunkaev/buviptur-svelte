<script>
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Button from '$lib/components/Button.svelte';
    import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
    import SubscribeSection from '$lib/components/SubscribeSection.svelte';
    import DatePicker from '$lib/components/DatePicker.svelte';
    import { _ } from 'svelte-i18n';
    
    // Set page title
    $: document.title = `${$_('contact.title')} | BuVipTur`;

    // Form submission state
    let name = '';
    let surname = '';
    let fromDate = '';
    let toDate = '';
    let email = '';
    let phone = '';
    let comments = '';
    let privacyAccepted = false;
    let isSubmitting = false;
    let submitSuccess = false;
    let ageGroups = [
        { id: 1, value: '0-12', label: 'contact.form.ageGroup1', participants: 0 },
        { id: 2, value: '13-18', label: 'contact.form.ageGroup2', participants: 0 },
        { id: 3, value: '19+', label: 'contact.form.ageGroup3', participants: 0 }
    ];
    
    // Function to get translated label
    function getTranslatedLabel(key) {
        return $_ ? $_(key) : key;
    }

    // Testimonials for section below form
    const testimonials = [
        {
            id: 'emily',
            title: $_('contact.testimonials.emily.title'),
            content: $_('contact.testimonials.emily.content'),
            author: $_('contact.testimonials.emily.author'),
            position: $_('contact.testimonials.emily.position'),
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80',
            rating: 5
        },
        {
            id: 'michael',
            title: $_('contact.testimonials.michael.title'),
            content: $_('contact.testimonials.michael.content'),
            author: $_('contact.testimonials.michael.author'),
            position: $_('contact.testimonials.michael.position'),
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80',
            rating: 5
        }
    ];

    // FAQ items - reactive to language changes
    $: faqItems = [
        {
            id: 'responseTime',
            question: $_('contact.faq.question1'),
            answer: $_('contact.faq.answer1')
        },
        {
            id: 'modifyOffer',
            question: $_('contact.faq.question2'),
            answer: $_('contact.faq.answer2')
        },
        {
            id: 'depositRequired',
            question: $_('contact.faq.question3'),
            answer: $_('contact.faq.answer3')
        },
        {
            id: 'advanceRequest',
            question: $_('contact.faq.question4'),
            answer: $_('contact.faq.answer4')
        },
        {
            id: 'cancellationPolicy',
            question: $_('contact.faq.question5'),
            answer: $_('contact.faq.answer5')
        },
        {
            id: 'largeGroup',
            question: $_('contact.faq.question6'),
            answer: $_('contact.faq.answer6')
        }
    ];

    async function handleSubmit() {
    // Basic validation
    const totalParticipants = ageGroups.reduce((sum, group) => sum + (group.participants || 0), 0);
    if (!name || !surname || !email || !fromDate || !toDate || totalParticipants === 0 || !privacyAccepted) {
        alert('Please fill in all required fields and select at least one participant');
        return;
    }

    isSubmitting = true;

    const participants = ageGroups.reduce((sum, group) => sum + (group.participants || 0), 0);
    const ageGroup = ageGroups
        .filter(group => group.participants > 0)
        .map(group => `${group.value}: ${group.participants}`)
        .join(', ');

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
            comments = '';
            ageGroups = ageGroups.map(group => ({
                ...group,
                participants: 0
            }));
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

<main class="bg-white" id="top">
    <!-- Hero Section -->
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/villi.webp')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 text-[#dcb660]">{$_('contact.title')}</h1>
            <p class="text-xl md:text-2xl mb-8">{$_('contact.subtitle')}</p>
        </div>
    </section>

    <!-- Form Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4 max-w-5xl">
            {#if submitSuccess}
                <div class="bg-green-50 border-l-4 border-green-500 p-6 sm:p-8 rounded-lg shadow-lg text-center max-w-2xl mx-auto">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <i class="fas fa-check text-green-500 text-3xl sm:text-4xl"></i>
                    </div>
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">{$_('contact.success.title')}</h2>
                    <p class="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                        {$_('contact.success.description')}
                    </p>
                    <p class="text-gray-600 mb-6 sm:mb-8">
                        {$_('contact.success.confirmation')}
                    </p>
                    <Button 
                        variant="primary"
                        size="lg"
                        href="/tours"
                        class="w-full sm:w-auto"
                    >
                        {$_('contact.success.exploreTours')}
                    </Button>
                </div>
            {:else}
                <div class="mb-10">
                    <h2 class="text-3xl font-semibold text-gray-800 mb-6 text-center">{$_('contact.form.title')}</h2>
                    
                    <form on:submit|preventDefault={handleSubmit} class="space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
                        
                        <div class="grid md:grid-cols-2 gap-4 sm:gap-6">
                            <div class="w-full">
                                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">{$_('contact.form.firstName')} <span class="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    bind:value={name} 
                                    required 
                                    class="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                    placeholder={$_('contact.form.firstNamePlaceholder')}
                                >
                            </div>
                            <div class="w-full">
                                <label for="surname" class="block text-sm font-medium text-gray-700 mb-2">{$_('contact.form.lastName')} <span class="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    id="surname" 
                                    bind:value={surname} 
                                    required 
                                    class="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                    placeholder={$_('contact.form.lastNamePlaceholder')}
                                >
                            </div>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-4 sm:gap-6">
                            <div class="w-full">
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">{$_('contact.form.email')} <span class="text-red-500">*</span></label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    bind:value={email} 
                                    required 
                                    class="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                    placeholder={$_('contact.form.emailPlaceholder')}
                                >
                            </div>
                            <div class="w-full">
                                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">{$_('contact.form.phone')}</label>
                                <input 
                                    type="text"
                                    id="phone" 
                                    bind:value={phone} 
                                    class="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                    placeholder={$_('contact.form.phonePlaceholder')}
                                >
                            </div>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-4 sm:gap-6">
                            <div class="w-full">
                                <label for="fromDate" class="block text-sm font-medium text-gray-700 mb-2">{$_('contact.form.fromDate')} <span class="text-red-500">*</span></label>
                                <div class="relative">
                                    <DatePicker
                                        bind:value={fromDate}
                                        placeholder={$_('contact.form.fromDatePlaceholder')}
                                        class="w-full"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="w-full">
                                <label for="toDate" class="block text-sm font-medium text-gray-700 mb-2">{$_('contact.form.toDate')} <span class="text-red-500">*</span></label>
                                <div class="relative">
                                    <DatePicker
                                        bind:value={toDate}
                                        placeholder={$_('contact.form.toDatePlaceholder')}
                                        class="w-full"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <div>
                                <label for="age-group-0" class="block text-sm font-medium text-gray-700 mb-3">{$_('contact.form.ageGroups')} <span class="text-red-500">*</span></label>
                                <div class="space-y-3">
                                    {#each ageGroups as group, i}
                                        <div class="flex items-center justify-between">
                                            <label for={`age-group-${i}`} class="text-sm text-gray-700 w-40">
                                                {getTranslatedLabel(group.label)}:
                                            </label>
                                            <div class="flex items-center">
                                                <button 
                                                    type="button"
                                                    class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 text-gray-700 rounded-l-md hover:bg-gray-200 transition-colors"
                                                    on:click={() => {
                                                        if (group.participants > 0) {
                                                            ageGroups[i].participants--;
                                                            ageGroups = ageGroups;
                                                        }
                                                    }}
                                                    aria-label={$_('common.decrease')}
                                                >
                                                    <i class="fas fa-minus text-xs" aria-hidden="true"></i>
                                                </button>
                                                <input 
                                                    id={`age-group-${i}`}
                                                    type="number" 
                                                    min="0" 
                                                    value={group.participants} 
                                                    on:input={e => handleParticipantsChange(i, e.target.value)}
                                                    class="w-12 sm:w-16 h-8 sm:h-10 text-center border-t border-b border-gray-300 focus:ring-2 focus:ring-teal-200 focus:border-teal-500 outline-none"
                                                    aria-label={i === 0 ? $_('contact.form.ageGroup1') : 
                                                               i === 1 ? $_('contact.form.ageGroup2') : 
                                                               $_('contact.form.ageGroup3')}
                                                />
                                                <button 
                                                    type="button"
                                                    class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 text-gray-700 rounded-r-md hover:bg-gray-200 transition-colors"
                                                    on:click={() => {
                                                        ageGroups[i].participants++;
                                                        ageGroups = ageGroups;
                                                    }}
                                                    aria-label={$_('common.increase')}
                                                >
                                                    <i class="fas fa-plus text-xs" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                                <p class="mt-3 text-sm font-medium text-gray-700">
                                    {$_('contact.form.totalParticipants')}: <span class="text-[#dcb660]">{ageGroups.reduce((sum, group) => sum + (group.participants || 0), 0)}</span>
                                </p>
                            </div>
                        </div>
                        
                        <div>
                            <label for="comments" class="block text-sm font-medium text-gray-700 mb-2">{$_('contact.form.comments')}</label>
                            <textarea 
                                id="comments" 
                                bind:value={comments} 
                                rows="4"
                                class="w-full max-w-3xl px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb660]"
                                placeholder={$_('contact.form.commentsPlaceholder')}
                            ></textarea>
                        </div>
                        <div class="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                            <div class="flex items-start">
                                <input 
                                    type="checkbox" 
                                    id="terms" 
                                    bind:checked={privacyAccepted}
                                    required
                                    class="mt-1 h-4 w-4 text-[#dcb660] border-gray-300 rounded focus:ring-[#dcb660] mr-3 flex-shrink-0"
                                >
                                <label for="terms" class="text-sm text-gray-700">
                                    {$_('contact.form.privacyPolicy1')}
                                    <a href="/privacy-policy" class="text-[#dcb660] hover:underline font-medium">{$_('contact.form.privacyPolicyLink')}</a>
                                    {$_('contact.form.privacyPolicy2')}
                                </label>
                            </div>
                        </div>
                        
                        <div class="flex flex-col sm:flex-row justify-end items-center border-t border-gray-100 mt-6 pt-6">
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                class="w-full sm:w-auto px-8 py-3 bg-teal-800 hover:bg-teal-900 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {#if isSubmitting}
                                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {$_('contact.form.processing')}
                                {:else}
                                    {$_('contact.form.submit')}
                                {/if}
                            </button>
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
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{$_('contact.whatToExpected.title')}</h2>
                <p class="text-lg text-gray-600">
                    {$_('contact.whatToExpected.subtitle')}
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                <div class="bg-white p-6 rounded-xl shadow-md text-center relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center">1</div>
                    <i class="fas fa-envelope-open-text text-teal-700 text-4xl mb-4"></i>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">{$_('contact.whatToExpected.confirmation.title')}</h3>
                    <p class="text-gray-600">{$_('contact.whatToExpected.confirmation.description')}</p>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-md text-center relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center">2</div>
                    <i class="fas fa-comments text-teal-700 text-4xl mb-4"></i>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">{$_('contact.whatToExpected.discussion.title')}</h3>
                    <p class="text-gray-600">{$_('contact.whatToExpected.discussion.description')}</p>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-md text-center relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center">3</div>
                    <i class="fas fa-file-alt text-teal-700 text-4xl mb-4"></i>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">{$_('contact.whatToExpected.proposal.title')}</h3>
                    <p class="text-gray-600">{$_('contact.whatToExpected.proposal.description')}</p>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-md text-center relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center">4</div>
                    <i class="fas fa-plane-departure text-teal-700 text-4xl mb-4"></i>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">{$_('contact.whatToExpected.ready.title', 'Ready to Go')}</h3>
                    <p class="text-gray-600">{$_('contact.whatToExpected.ready.description', 'Once confirmed, we\'ll handle all the details for your perfect trip.')}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{$_('contact.faq.title')}</h2>
                <p class="text-lg text-gray-600">
                    {$_('contact.faq.subtitle')}
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
                <p class="text-gray-600 mb-4">{$_('contact.faq.stillQuestions')}</p>
                <Button 
                    variant="secondary"
                    size="lg"
                    href="mailto:info@buviptur.com"
                >
                    {$_('contact.faq.contactDirect')}
                </Button>
            </div>
        </div>
    </section>
</main>