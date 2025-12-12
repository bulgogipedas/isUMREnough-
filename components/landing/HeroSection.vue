<script setup lang="ts">
import { ArrowRight, TrendingUp, MapPin, Calculator } from 'lucide-vue-next'

const { t, locale } = useI18n()
</script>

<template>
  <section class="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left animate-fade-in">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/50 rounded-full mb-6 border border-primary-200 dark:border-primary-800">
            <TrendingUp class="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span class="text-sm font-semibold text-primary-700 dark:text-primary-300">{{ t('hero.badge') }}</span>
          </div>

          <!-- Headline - Keep original Indonesian structure with SVG -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-slate-100 leading-tight mb-6">
            <template v-if="locale === 'id'">
              Gaji Kamu
              <span class="text-primary-500 dark:text-primary-400 relative">
                Cukup
                <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                  <path d="M2 10C50 2 150 2 198 10" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>
                </svg>
              </span>
              Nggak<br class="hidden sm:block" />
              Tinggal di Sini?
            </template>
            <template v-else>
              {{ t('hero.title') }}
              <span class="text-primary-500 dark:text-primary-400 relative">
                {{ t('hero.titleHighlight') }}
                <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                  <path d="M2 10C50 2 150 2 198 10" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>
                </svg>
              </span>
            </template>
          </h1>

          <!-- Subheadline -->
          <p class="text-lg lg:text-xl text-gray-600 dark:text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
            {{ t('hero.subtitle') }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <NuxtLink
              to="/calculator"
              class="group w-full sm:w-auto px-8 py-4 bg-primary-400 text-gray-900 font-bold text-lg rounded-2xl shadow-ios-lg hover:bg-primary-500 hover:shadow-ios-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Calculator class="w-5 h-5" />
              {{ t('hero.cta') }}
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </NuxtLink>
            
            <a
              href="#features"
              class="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-semibold text-lg rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-300 text-center border border-gray-200 dark:border-slate-700"
            >
              {{ t('hero.ctaSecondary') }}
            </a>
          </div>

          <!-- Stats -->
          <div class="flex items-center justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
            <div class="text-center lg:text-left">
              <p class="text-3xl font-bold text-gray-900 dark:text-slate-100">38</p>
              <p class="text-sm text-gray-500 dark:text-slate-400">{{ t('hero.stats.provinces') }}</p>
            </div>
            <div class="w-px h-12 bg-gray-200 dark:bg-slate-700" aria-hidden="true" />
            <div class="text-center lg:text-left">
              <p class="text-3xl font-bold text-gray-900 dark:text-slate-100">2024</p>
              <p class="text-sm text-gray-500 dark:text-slate-400">{{ t('hero.stats.data') }}</p>
            </div>
            <div class="w-px h-12 bg-gray-200 dark:bg-slate-700" aria-hidden="true" />
            <div class="text-center lg:text-left">
              <p class="text-3xl font-bold text-gray-900 dark:text-slate-100">100%</p>
              <p class="text-sm text-gray-500 dark:text-slate-400">{{ t('hero.stats.free') }}</p>
            </div>
          </div>
        </div>

        <!-- Visual/Illustration -->
        <div class="flex-1 relative animate-fade-in-delay">
          <div class="relative bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-ios-xl dark:shadow-none p-6 lg:p-8 border border-gray-100 dark:border-slate-700 transition-colors duration-300">
            <!-- Floating Elements -->
            <div class="absolute -top-4 -left-4 bg-primary-400 rounded-2xl p-3 shadow-ios-lg">
              <MapPin class="w-6 h-6 text-gray-900" />
            </div>
            <div class="absolute -bottom-4 -right-4 bg-emerald-100 dark:bg-emerald-900/60 rounded-2xl p-3 shadow-ios-lg dark:shadow-none border border-transparent dark:border-emerald-800/50">
              <TrendingUp class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>

            <!-- Mock Calculator Preview -->
            <div class="space-y-4">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center border border-primary-200 dark:border-primary-800">
                  <Calculator class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-slate-100">{{ t('calculator.title') }}</p>
                  <p class="text-sm text-gray-500 dark:text-slate-400">{{ t('calculator.subtitle') }}</p>
                </div>
              </div>

              <div class="space-y-3">
                <div class="bg-gray-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-gray-100 dark:border-slate-700">
                  <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">{{ t('calculator.province.label') }}</p>
                  <p class="font-semibold text-gray-800 dark:text-slate-100">DKI Jakarta</p>
                </div>
                <div class="bg-gray-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-gray-100 dark:border-slate-700">
                  <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">{{ t('calculator.income.label') }}</p>
                  <p class="font-semibold text-gray-800 dark:text-slate-100">Rp 8.000.000</p>
                </div>
                <div class="bg-gray-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-gray-100 dark:border-slate-700">
                  <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">{{ t('calculator.dependents.label') }}</p>
                  <p class="font-semibold text-gray-800 dark:text-slate-100">2 {{ t('calculator.dependents.unit') }}</p>
                </div>
              </div>

              <div class="bg-emerald-50 dark:bg-emerald-900/40 rounded-2xl p-4 mt-4 border border-emerald-100 dark:border-emerald-800/50">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Status</p>
                    <p class="font-bold text-emerald-700 dark:text-emerald-300 text-lg">{{ t('results.surplus').toUpperCase() }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-emerald-700 dark:text-emerald-300 font-medium">{{ t('results.remaining') }}</p>
                    <p class="font-bold text-emerald-700 dark:text-emerald-300 text-lg">Rp 2.411.030</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
.animate-fade-in-delay { animation: fade-in 0.6s ease-out 0.2s forwards; opacity: 0; }
</style>
