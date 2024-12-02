/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
// Plugins
import { plugin as toastPlugin } from './toast'
// Nuxt plugin format
export default defineNuxtPlugin((nuxtApp) => {
    // nuxtApp.vueApp.use(context)
    nuxtApp.vueApp
        .use(Vue3Toastify, {
            autoClose: 3000,
            position: 'top-right',
        } as ToastContainerOptions)
        .use(toastPlugin)
})
