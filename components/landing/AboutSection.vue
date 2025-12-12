<script setup lang="ts">
import { CheckCircle, ExternalLink } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
  <section id="about" class="py-16 lg:py-24 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <!-- Left Content -->
        <div class="flex-1">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-primary-700 dark:text-primary-400 text-sm font-semibold rounded-full mb-4 border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-none">
            {{ t('about.badge') }}
          </span>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-6">
            {{ t('about.title') }} <span class="text-primary-500 dark:text-primary-400">Finara</span>?
          </h2>
          <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 leading-relaxed">
            <strong class="text-gray-800 dark:text-white">Finara</strong> {{ t('about.description1') }}
          </p>
          <p class="text-lg text-gray-600 dark:text-slate-300 mb-8 leading-relaxed">
            {{ t('about.description2') }}
          </p>

          <!-- Highlights -->
          <div class="space-y-3">
            <div
              v-for="i in 6"
              :key="i"
              class="flex items-start gap-3"
            >
              <CheckCircle class="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <span class="text-gray-700 dark:text-slate-300">{{ t(`about.highlights.${i}`) }}</span>
            </div>
          </div>
        </div>

        <!-- Right - Data Sources Card -->
        <div class="flex-1 w-full">
          <div class="bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-bento dark:shadow-none border border-gray-100 dark:border-slate-700">
            <h3 class="text-xl font-bold text-gray-900 dark:text-slate-100 mb-6">{{ t('about.sources.title') }}</h3>
            
            <div class="space-y-4">
              <!-- BPS -->
              <a
                href="https://www.bps.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800/80 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200 group border border-transparent dark:border-slate-700"
              >
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">📊</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ t('about.sources.bps.title') }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-slate-400 truncate">{{ t('about.sources.bps.desc') }}</p>
                </div>
                <ExternalLink class="w-5 h-5 text-gray-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" />
              </a>

              <!-- UMR Data -->
              <div class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800/80 rounded-2xl border border-transparent dark:border-slate-700">
                <div class="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">💰</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 dark:text-slate-100">{{ t('about.sources.ump.title') }}</p>
                  <p class="text-sm text-gray-500 dark:text-slate-400">{{ t('about.sources.ump.desc') }}</p>
                </div>
              </div>

              <!-- GeoJSON -->
              <a
                href="https://github.com/superpikar/indonesia-geojson"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800/80 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200 group border border-transparent dark:border-slate-700"
              >
                <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">🗺️</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {{ t('about.sources.geojson.title') }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-slate-400 truncate">{{ t('about.sources.geojson.desc') }}</p>
                </div>
                <ExternalLink class="w-5 h-5 text-gray-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
