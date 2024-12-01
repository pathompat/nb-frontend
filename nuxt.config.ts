// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: '2024-11-20',
    devtools: { enabled: true },
    modules: ['vuetify-nuxt-module', '@pinia/nuxt'],
    pinia: {
        storesDirs: ['./stores/**'],
    },
    css: ['@/assets/scss/main.scss'],
    vuetify: {
        moduleOptions: {
            /* module specific options */
        },
        vuetifyOptions: './vuetify.config.ts',
    },
    // config for dev local
    nitro: {
        devProxy: {
            '/api': {
                target:
                    process.env.BASE_URL || 'https://test-nb.pathompat.me/api',
                changeOrigin: true,
            },
        },
    },
})
