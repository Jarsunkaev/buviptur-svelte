<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { t } from 'svelte-i18n';
</script>

<svelte:head>
  <title>{$t('legal.terms.title') || 'Általános Szerződési Feltételek (ÁSZF)'}</title>
  <meta name="description" content={$t('legal.terms.meta') || 'General Terms and Conditions'} />
</svelte:head>

<Header />

<main class="min-h-screen bg-white">
  <!-- Hero -->
  <section class="relative h-[40vh] flex items-center justify-center text-white bg-cover bg-center"
    style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/matyas-optimized.webp')">
    <div class="text-center max-w-4xl px-4">
      <h1 class="text-3xl md:text-5xl font-bold mb-4">{$t('legal.terms.heading') || 'Általános Szerződési Feltételek'}</h1>
      <p class="text-lg md:text-2xl">{$t('legal.terms.subtitle') || 'General Terms and Conditions'}</p>
    </div>
  </section>

  <!-- Content -->
  <section class="py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div class="h-1 bg-[#dcb660] -mt-8 -mx-8 rounded-t-xl mb-8"></div>

        <div class="prose max-w-none">
          <h2>{$t('legal.terms.sections.scope.title') || '1. A feltételek hatálya'}</h2>
          <p>{$t('legal.terms.sections.scope.body') || 'Jelen ÁSZF a BuVipTur Kft. által nyújtott szolgáltatások igénybevételének feltételeit szabályozza.'}</p>

          <h2 class="mt-8">{$t('legal.terms.sections.booking.title') || '2. Foglalás és fizetés'}</h2>
          <p>{$t('legal.terms.sections.booking.body') || 'A foglalás a visszaigazolással válik érvényessé. A fizetés módja és ütemezése a visszaigazolásban kerül rögzítésre.'}</p>

          <h2 class="mt-8">{$t('legal.terms.sections.cancellation.title') || '3. Lemondás és módosítás'}</h2>
          <p>{$t('legal.terms.sections.cancellation.body') || 'A lemondás és módosítás feltételei a konkrét szolgáltatás jellegétől függnek. Eltérő megállapodás hiányában a standard feltételek érvényesek.'}</p>

          <h2 class="mt-8">{$t('legal.terms.sections.liability.title') || '4. Felelősség'}</h2>
          <p>{$t('legal.terms.sections.liability.body') || 'A BuVipTur Kft. a jogszabályok által megengedett mértékig felel a szolgáltatások teljesítéséért. Vis maior esetén felelősség nem terheli.'}</p>

          <h2 class="mt-8">{$t('legal.terms.sections.privacy.title') || '5. Adatkezelés'}</h2>
          <p>{$t('legal.terms.sections.privacy.body') || 'Az adatkezelésre a mindenkor hatályos Adatvédelmi Tájékoztató rendelkezései irányadóak.'}</p>

          <h2 class="mt-8">{$t('legal.terms.sections.final.title') || '6. Záró rendelkezések'}</h2>
          <p>{$t('legal.terms.sections.final.body') || 'Jelen feltételek magyar jog szerint értelmezendők. Vitás kérdésekben a felek békés úton igyekeznek megegyezni.'}</p>
        </div>
      </div>
    </div>
  </section>
</main>



