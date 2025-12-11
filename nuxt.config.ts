// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  css: [
    '~/assets/css/main.css',
    'leaflet/dist/leaflet.css',
  ],

  app: {
    head: {
      title: 'Kalkulator Beban Hidup',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Kalkulator untuk menghitung beban hidup berdasarkan data BPS Indonesia' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false, // Disable for faster dev, enable for production builds
  },

  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },
})

