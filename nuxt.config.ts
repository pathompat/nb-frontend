// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: './vuetify.config.ts'
  },
  nitro: {
    devProxy: {
        "/api": {
            target: process.env.API_URL,
            changeOrigin: true,
        }
    }
},
})