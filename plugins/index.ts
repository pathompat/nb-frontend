/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import context from './context'

// Nuxt plugin format
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(context)
})
