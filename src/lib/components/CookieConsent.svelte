<script>
    import { onMount } from 'svelte';
    let showBanner = true;
    let showPreferences = false;

    function acceptAll() {
        document.cookie = 'cookieConsent=all; path=/; max-age=31536000'; // 1 year
        showBanner = false;
        showPreferences = false;
    }

    function acceptNecessary() {
        document.cookie = 'cookieConsent=necessary; path=/; max-age=31536000';
        showBanner = false;
        showPreferences = false;
    }

    function togglePreferences() {
        showPreferences = !showPreferences;
    }

    onMount(() => {
        const consent = document.cookie.split(';').find(c => c.trim().startsWith('cookieConsent='));
        if (consent) {
            showBanner = false;
        }
    });
</script>

{#if showBanner}
<div class="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
    <div class="w-full bg-white rounded-2xl shadow-2xl px-4 sm:px-6 py-8 md:py-10 mx-auto max-w-6xl border border-gray-100">
        <div class="">
            <h3 class="text-xl md:text-2xl font-semibold text-gray-900 mb-4">We value your privacy</h3>
            <p class="text-gray-600 text-base md:text-lg mb-6">We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                    on:click={acceptAll}
                    class="w-full bg-[#dcb660] text-white px-6 py-3 rounded-lg hover:bg-[#dcb660]/90 transition-colors text-base md:text-lg font-medium"
                >
                    Accept all cookies
                </button>
                <button 
                    on:click={acceptNecessary}
                    class="w-full border-2 border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-base md:text-lg font-medium"
                >
                    Accept necessary only
                </button>
                <button 
                    on:click={togglePreferences}
                    class="w-full text-[#dcb660] hover:underline text-base md:text-lg font-medium flex items-center justify-center"
                >
                    Manage preferences
                </button>
            </div>

            <div class="mt-6 text-sm md:text-base text-gray-500 text-center max-w-4xl mx-auto">
                By clicking "Accept all cookies", you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. View our <a href="/privacy" class="text-[#dcb660] hover:underline">Privacy Policy</a> for more information.
            </div>
        </div>
    </div>
</div>
{/if}

{#if showPreferences}
<div class="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
    <div class="bg-white rounded-lg max-w-2xl w-full p-6 md:p-8">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl md:text-2xl font-semibold">Cookie Preferences</h3>
            <button 
                on:click={togglePreferences}
                class="text-gray-500 hover:text-gray-700 text-xl"
            >
                ✕
            </button>
        </div>

        <div class="space-y-6">
            <div>
                <label class="flex items-center space-x-3">
                    <input type="checkbox" checked disabled class="h-5 w-5 text-[#dcb660] rounded">
                    <span class="text-base md:text-lg">Necessary (Required)</span>
                </label>
                <p class="text-sm md:text-base text-gray-500 mt-2 ml-8">These cookies are essential for the proper functioning of the website.</p>
            </div>

            <div>
                <label class="flex items-center space-x-3">
                    <input type="checkbox" class="h-5 w-5 text-[#dcb660] rounded">
                    <span class="text-base md:text-lg">Analytics</span>
                </label>
                <p class="text-sm md:text-base text-gray-500 mt-2 ml-8">These cookies help us understand how visitors interact with the website.</p>
            </div>

            <div>
                <label class="flex items-center space-x-3">
                    <input type="checkbox" class="h-5 w-5 text-[#dcb660] rounded">
                    <span class="text-base md:text-lg">Marketing</span>
                </label>
                <p class="text-sm md:text-base text-gray-500 mt-2 ml-8">These cookies are used to deliver personalized advertisements.</p>
            </div>
        </div>

        <div class="mt-8 flex justify-end space-x-4">
            <button 
                on:click={togglePreferences}
                class="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 text-base md:text-lg font-medium"
            >
                Cancel
            </button>
            <button 
                on:click={acceptAll}
                class="px-6 py-3 bg-[#dcb660] text-white rounded-lg hover:bg-[#dcb660]/90 text-base md:text-lg font-medium"
            >
                Save preferences
            </button>
        </div>
    </div>
</div>
{/if}
