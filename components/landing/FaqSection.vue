<script setup lang="ts">
/**
 * FAQ Section - Accordion Component
 * 
 * A clean, accessible accordion for frequently asked questions
 * with smooth expand/collapse animations.
 */
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

interface FaqItem {
  id: number
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: 'Dari mana data ini berasal?',
    answer: 'Data pengeluaran per kapita berasal dari Badan Pusat Statistik (BPS) Indonesia tahun 2024. Data UMR/UMP berasal dari keputusan gubernur masing-masing provinsi yang diumumkan secara resmi. Kami memperbarui data setiap tahun mengikuti publikasi resmi.',
  },
  {
    id: 2,
    question: 'Apakah data gaji saya disimpan?',
    answer: 'Tidak sama sekali. Semua perhitungan dilakukan 100% di browser kamu (client-side). Tidak ada data yang dikirim ke server kami. Kamu bisa cek sendiri di Network tab browser — tidak ada request yang membawa data pribadimu.',
  },
  {
    id: 3,
    question: 'Seberapa akurat hitungan ini?',
    answer: 'Perhitungan ini adalah estimasi berdasarkan rata-rata pengeluaran per kapita. Hasil sebenarnya bisa berbeda tergantung gaya hidup, lokasi spesifik dalam provinsi, kebiasaan belanja, dan faktor personal lainnya. Gunakan sebagai panduan awal, bukan keputusan final.',
  },
  {
    id: 4,
    question: 'Apa bedanya pengeluaran per kapita dengan UMR?',
    answer: 'Pengeluaran per kapita adalah rata-rata pengeluaran per orang per bulan berdasarkan survei BPS. UMR (Upah Minimum Regional) adalah standar gaji minimum yang ditetapkan pemerintah. Keduanya bisa berbeda jauh — misalnya UMR bisa lebih tinggi dari pengeluaran rata-rata.',
  },
  {
    id: 5,
    question: 'Kenapa ada provinsi yang defisit?',
    answer: 'Beberapa provinsi memiliki UMR yang lebih rendah dari rata-rata pengeluaran per kapita. Ini menunjukkan bahwa pekerja dengan gaji UMR di provinsi tersebut mungkin kesulitan memenuhi kebutuhan dasar tanpa pendapatan tambahan.',
  },
]

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
        <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm text-gray-700 text-sm font-semibold rounded-full mb-4 border border-white/50 shadow-sm">
          FAQ
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Pertanyaan Umum
        </h2>
        <p class="text-lg text-gray-600">
          Jawaban untuk pertanyaan yang sering ditanyakan.
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-bento overflow-hidden divide-y divide-gray-100">
        <div
          v-for="faq in faqs"
          :key="faq.id"
          class="transition-colors duration-200"
          :class="{ 'bg-gray-50/50': isOpen(faq.id) }"
        >
          <!-- Question Button -->
          <button
            type="button"
            class="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50/50 transition-colors duration-200"
            :aria-expanded="isOpen(faq.id)"
            @click="toggleItem(faq.id)"
          >
            <span class="font-semibold text-gray-900 text-lg">
              {{ faq.question }}
            </span>
            <ChevronDown 
              class="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300"
              :class="{ 'rotate-180': isOpen(faq.id) }"
            />
          </button>
          
          <!-- Answer Panel -->
          <div
            class="overflow-hidden transition-all duration-300 ease-out"
            :class="isOpen(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
          >
            <div class="px-6 pb-5 text-gray-600 leading-relaxed">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center mt-8">
        <p class="text-gray-500">
          Masih punya pertanyaan?
          <a 
            href="mailto:hello@finara.id" 
            class="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            Hubungi kami
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

