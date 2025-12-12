// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],

  // Color Mode Configuration
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    storageKey: 'finara-color-mode',
  },

  // i18n Configuration
  i18n: {
    locales: [
      { code: 'id', name: 'Indonesia', file: 'id.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'id',
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'finara-locale',
      fallbackLocale: 'id',
    },
  },

  css: [
    '~/assets/css/main.css',
    'leaflet/dist/leaflet.css',
  ],

  app: {
    head: {
      title: 'Finara - Kalkulator Beban Hidup',
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
    typeCheck: false,
  },

  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },
})
