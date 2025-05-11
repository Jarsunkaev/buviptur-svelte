<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import ScrollToTopButton from '$lib/components/ScrollToTopButton.svelte';
</script>

<svelte:head>
    <title>Privacy Policy - BuVipTur</title>
    <meta name="description" content="Our commitment to protecting your privacy and personal data." />
</svelte:head>

<Header />

<main class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative h-[40vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/privacy-hero.jpg')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">Privacy Policy</h1>
            <p class="text-xl md:text-2xl">Our commitment to protecting your privacy</p>
        </div>
    </section>

    <!-- Content Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div class="h-1 bg-[#dcb660] -mt-8 -mx-8 rounded-t-xl mb-8"></div>
                
                <div class="prose prose-lg max-w-none">
                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">Information We Collect</h2>
                    <p class="mb-6">We collect information that you provide directly to us, including:</p>
                    <ul class="list-disc pl-6 mb-8 space-y-2">
                        <li>Name and contact information</li>
                        <li>Booking and travel preferences</li>
                        <li>Payment information</li>
                        <li>Communication history</li>
                    </ul>

                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">How We Use Your Information</h2>
                    <p class="mb-6">We use the information we collect to:</p>
                    <ul class="list-disc pl-6 mb-8 space-y-2">
                        <li>Process your bookings and payments</li>
                        <li>Communicate with you about our services</li>
                        <li>Improve our website and services</li>
                        <li>Send you marketing communications (with your consent)</li>
                    </ul>

                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">Cookie Policy</h2>
                    <p class="mb-6">We use cookies and similar technologies to:</p>
                    <ul class="list-disc pl-6 mb-8 space-y-2">
                        <li>Remember your preferences</li>
                        <li>Analyze website traffic</li>
                        <li>Personalize content</li>
                        <li>Improve user experience</li>
                    </ul>

                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">Your Rights</h2>
                    <p class="mb-6">You have the right to:</p>
                    <ul class="list-disc pl-6 mb-8 space-y-2">
                        <li>Access your personal data</li>
                        <li>Request data correction or deletion</li>
                        <li>Withdraw consent</li>
                        <li>Object to data processing</li>
                    </ul>

                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h2>
                    <p class="mb-2">For privacy-related inquiries, contact us at:</p>
                    <p class="mb-8">Email: info@buviptur.com</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Additional Information -->
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div class="text-[#dcb660] text-4xl mb-4 flex justify-center">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-center">Data Security</h3>
                    <p class="text-gray-600 text-center">We use industry-standard security measures to protect your personal information.</p>
                </div>

                <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div class="text-[#dcb660] text-4xl mb-4 flex justify-center">
                        <i class="fas fa-user-shield"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-center">Your Control</h3>
                    <p class="text-gray-600 text-center">You have full control over your data and can request access, modification, or deletion at any time.</p>
                </div>

                <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div class="text-[#dcb660] text-4xl mb-4 flex justify-center">
                        <i class="fas fa-cookie"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-center">Cookie Management</h3>
                    <p class="text-gray-600 text-center">Easily manage your cookie preferences and control what data is collected about you.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-6">Have Questions?</h2>
            <p class="text-gray-600 mb-8 max-w-2xl mx-auto">If you have any questions about our Privacy Policy or how we handle your data, please don't hesitate to contact us.</p>
            <a href="/contact" class="inline-flex items-center px-8 py-4 bg-[#dcb660] text-white rounded-lg hover:bg-[#dcb660]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 text-lg font-medium">
                Contact Our Privacy Team
            </a>
        </div>
    </section>
</main>

<Footer />
<ScrollToTopButton />
