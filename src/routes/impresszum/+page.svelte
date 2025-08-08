<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { t } from 'svelte-i18n';
</script>

<svelte:head>
  <title>{$t('legal.impresszum.title') || 'Impresszum'}</title>
  <meta name="description" content={$t('legal.impresszum.meta') || 'Company imprint and legal information'} />
</svelte:head>

<Header />

<main class="min-h-screen bg-white">
  <!-- Hero -->
  <section class="relative h-[40vh] flex items-center justify-center text-white bg-cover bg-center"
    style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/matyas-optimized.webp')">
    <div class="text-center max-w-4xl px-4">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">{$t('legal.impresszum.heading') || 'Impresszum'}</h1>
      <p class="text-xl md:text-2xl">{$t('legal.impresszum.subtitle') || 'Cégadatok és jogi információk'}</p>
    </div>
  </section>

  <!-- Content -->
  <section class="py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div class="h-1 bg-[#dcb660] -mt-8 -mx-8 rounded-t-xl mb-8"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">{$t('legal.impresszum.shortName') || 'Rövidített név'}</h2>
            <p>Buviptur Kft.</p>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">{$t('legal.impresszum.fullName') || 'Teljes név'}</h2>
            <p>Buviptur Kereskedelmi és Szolgáltató Korlátolt Felelősségű Társaság</p>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">{$t('legal.impresszum.founded') || 'Alapítás éve'}</h2>
            <p>2012</p>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">{$t('legal.impresszum.taxNumber') || 'Adószám'}</h2>
            <p>23884120-2-42</p>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">{$t('legal.impresszum.mainActivity') || 'Főtevékenység'}</h2>
            <p>7990 Egyéb foglalás</p>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">{$t('legal.impresszum.registeredOffice') || 'Székhely'}</h2>
            <p>1104 Budapest, Kada utca 133.</p>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">{$t('legal.impresszum.branches') || 'Telephelyek száma'}</h2>
            <p>0</p>
          </div>
        </div>

        <div class="mt-10 text-gray-600">
          <p>{$t('legal.impresszum.contactNote') || 'Kapcsolat: info@buviptur.com, +36 (70) 734-3444'}</p>
        </div>
      </div>
    </div>
  </section>
</main>


