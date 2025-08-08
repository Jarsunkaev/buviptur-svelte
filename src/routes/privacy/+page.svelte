<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { t } from 'svelte-i18n';
</script>

<svelte:head>
    <title>{$t('privacyPage.head.title') || 'Privacy Policy - BuVipTur'}</title>
    <meta name="description" content={$t('privacyPage.head.description') || 'Our commitment to protecting your privacy and personal data.'} />
</svelte:head>

<Header />

<main class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative h-[40vh] flex items-center justify-center text-white bg-cover bg-center"
        style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/matyas-optimized.webp')">
        <div class="text-center max-w-4xl px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">{$t('privacyPage.hero.title')}</h1>
            <p class="text-xl md:text-2xl">{$t('privacyPage.hero.subtitle')}</p>
        </div>
    </section>

    <!-- Content Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div class="h-1 bg-[#dcb660] -mt-8 -mx-8 rounded-t-xl mb-8"></div>
                
                <div class="prose prose-lg max-w-none">
                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">{$t('privacyPage.sections.info.title')}</h2>
                    <p class="mb-6">{$t('privacyPage.sections.info.intro')}</p>
                    <ul class="list-disc pl-6 mb-8 space-y-2">
                        {#each $t('privacyPage.sections.info.items') as item}
                            <li>{item}</li>
                        {/each}
                    </ul>

                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">{$t('privacyPage.sections.use.title')}</h2>
                    <p class="mb-6">{$t('privacyPage.sections.use.intro')}</p>
                    <ul class="list-disc pl-6 mb-8 space-y-2">
                        {#each $t('privacyPage.sections.use.items') as item}
                            <li>{item}</li>
                        {/each}
                    </ul>

                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">{$t('privacyPage.sections.cookies.title')}</h2>
                    <p class="mb-6">{$t('privacyPage.sections.cookies.intro')}</p>
                    <ul class="list-disc pl-6 mb-8 space-y-2">
                        {#each $t('privacyPage.sections.cookies.items') as item}
                            <li>{item}</li>
                        {/each}
                    </ul>

                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">{$t('privacyPage.sections.rights.title')}</h2>
                    <p class="mb-6">{$t('privacyPage.sections.rights.intro')}</p>
                    <ul class="list-disc pl-6 mb-8 space-y-2">
                        {#each $t('privacyPage.sections.rights.items') as item}
                            <li>{item}</li>
                        {/each}
                    </ul>

                    <h2 class="text-2xl font-semibold text-gray-900 mb-6">{$t('privacyPage.sections.contact.title')}</h2>
                    <p class="mb-2">{$t('privacyPage.sections.contact.intro')}</p>
                    <p class="mb-8">{$t('privacyPage.sections.contact.email')}</p>
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
                    <h3 class="text-xl font-semibold mb-3 text-center">{$t('privacyPage.additional.dataSecurity.title')}</h3>
                    <p class="text-gray-600 text-center">{$t('privacyPage.additional.dataSecurity.text')}</p>
                </div>

                <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div class="text-[#dcb660] text-4xl mb-4 flex justify-center">
                        <i class="fas fa-user-shield"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-center">{$t('privacyPage.additional.yourControl.title')}</h3>
                    <p class="text-gray-600 text-center">{$t('privacyPage.additional.yourControl.text')}</p>
                </div>

                <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div class="text-[#dcb660] text-4xl mb-4 flex justify-center">
                        <i class="fas fa-cookie"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-center">{$t('privacyPage.additional.cookieManagement.title')}</h3>
                    <p class="text-gray-600 text-center">{$t('privacyPage.additional.cookieManagement.text')}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-6">{$t('privacyPage.cta.title')}</h2>
            <p class="text-gray-600 mb-8 max-w-2xl mx-auto">{$t('privacyPage.cta.text')}</p>
            <a href="/contact" class="inline-flex items-center px-8 py-4 bg-[#dcb660] text-white rounded-lg hover:bg-[#dcb660]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 text-lg font-medium">
                {$t('privacyPage.cta.button')}
            </a>
        </div>
    </section>
</main>

