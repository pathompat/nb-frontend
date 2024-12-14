/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import { plugin as toastPlugin } from './toast'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp
        .use(Vue3Toastify, {
            autoClose: 3000,
            position: 'top-right',
        } as ToastContainerOptions)
        .use(toastPlugin)
})
