<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const { t } = useI18n()

const openItems = ref<number[]>([])

const toggleItem = (id: number) => {
  const index = openItems.value.indexOf(id)
  if (index > -1) {
    openItems.value.splice(index, 1)
  } else {
    openItems.value.push(id)
  }
}

const isOpen = (id: number) => openItems.value.includes(id)
</script>

<template>
  <section id="faq" class="py-16 lg:py-24 relative">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-gray-700 dark:text-slate-300 text-sm font-semibold rounded-full mb-4 border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-none">
          {{ t('faq.badge') }}
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
          {{ t('faq.title') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-slate-400">
          {{ t('faq.subtitle') }}
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-gray-100 dark:border-slate-700 shadow-bento dark:shadow-none overflow-hidden divide-y divide-gray-100 dark:divide-slate-700">
        <div
          v-for="i in 5"
          :key="i"
          class="transition-colors duration-200"
          :class="{ 'bg-gray-50/50 dark:bg-slate-800/50': isOpen(i) }"
        >
          <!-- Question Button -->
          <button
            type="button"
            class="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors duration-200"
            :aria-expanded="isOpen(i)"
            @click="toggleItem(i)"
          >
            <span class="font-semibold text-gray-900 dark:text-slate-100 text-lg">
              {{ t(`faq.q${i}.question`) }}
            </span>
            <ChevronDown 
              class="w-5 h-5 text-gray-400 dark:text-slate-500 shrink-0 transition-transform duration-300"
              :class="{ 'rotate-180': isOpen(i) }"
            />
          </button>
          
          <!-- Answer Panel -->
          <div
            class="overflow-hidden transition-all duration-300 ease-out"
            :class="isOpen(i) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
          >
            <div class="px-6 pb-5 text-gray-600 dark:text-slate-300 leading-relaxed">
              {{ t(`faq.q${i}.answer`) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center mt-8">
        <p class="text-gray-500 dark:text-slate-400">
          {{ t('faq.contact') }}
          <a 
            href="mailto:hello@finara.id" 
            class="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            {{ t('faq.contactLink') }}
          </a>
        </p>
      </div>
    </div>
  </section>
</template>
