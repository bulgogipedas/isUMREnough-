<script setup lang="ts">
/**
 * Main Calculator Page
 * 
 * Renders a split-screen layout with an interactive map on the left
 * and a dashboard with inputs and results on the right.
 */
import { useCalculatorStore } from '~/stores/calculator'
import { useExpenditureData } from '~/composables/useExpenditureData'

const store = useCalculatorStore()
const { loadExpenditureData, getProvinceList } = useExpenditureData()

// Load expenditure data on mount
onMounted(async () => {
  try {
    store.setLoading(true)
    const data = await loadExpenditureData()
    store.setProvinceData(data)
  } catch {
    store.setError('Gagal memuat data pengeluaran')
  } finally {
    store.setLoading(false)
  }
})

// SEO Configuration
useHead({
  title: 'Kalkulator Beban Hidup - Hitung Kesehatan Finansial Anda',
  meta: [
    {
      name: 'description',
      content: 'Kalkulator untuk menghitung beban hidup dan kesehatan finansial berdasarkan data BPS Indonesia. Bandingkan penghasilan dengan UMR dan pengeluaran per kapita di setiap provinsi.',
    },
    {
      name: 'keywords',
      content: 'kalkulator beban hidup, pengeluaran per kapita, UMR Indonesia, BPS, kesehatan finansial',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile Header -->
    <header class="lg:hidden bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary-400 rounded-xl flex items-center justify-center">
          <span class="text-xl">💰</span>
        </div>
        <div>
          <h1 class="font-bold text-gray-900">Beban Hidup</h1>
          <p class="text-xs text-gray-500">Kalkulator Finansial</p>
        </div>
      </div>
    </header>

    <!-- Loading Overlay -->
    <Transition name="fade">
      <div
        v-if="store.isLoading"
        class="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center"
      >
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p class="text-gray-600 font-medium">Memuat data BPS...</p>
        </div>
      </div>
    </Transition>

    <!-- Main Layout -->
    <div class="flex flex-col lg:flex-row min-h-screen lg:h-screen">
      <!-- Left: Map Section (Desktop) / Bottom on Mobile -->
      <div class="order-2 lg:order-1 lg:flex-1 p-4 lg:p-6">
        <div class="h-[400px] lg:h-full">
          <ClientOnly>
            <MapWidget :province-list="getProvinceList" />
            <template #fallback>
              <div class="h-full w-full rounded-3xl bg-gray-100 flex items-center justify-center">
                <div class="text-center">
                  <div class="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p class="text-gray-500">Memuat peta...</p>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>

      <!-- Right: Dashboard Section -->
      <div class="order-1 lg:order-2 w-full lg:w-[420px] xl:w-[480px] bg-white lg:border-l border-gray-100 overflow-y-auto">
        <div class="p-4 lg:p-6 pb-8">
          <DashboardWidget :province-list="getProvinceList" />
        </div>
      </div>
    </div>

    <!-- Footer (Mobile Only) -->
    <footer class="lg:hidden bg-white border-t border-gray-100 px-4 py-4 text-center">
      <p class="text-xs text-gray-400">
        Data berdasarkan BPS Indonesia 2024
      </p>
    </footer>
  </div>
</template>

<style>
/* Fade transition for loading overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ensure full height on desktop */
@media (min-width: 1024px) {
  .lg\:h-screen {
    height: 100vh;
  }
}
</style>
