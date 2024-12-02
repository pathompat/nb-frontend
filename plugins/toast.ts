import { type Plugin, type InjectionKey } from 'vue'
export type PluginInstance = ReturnType<typeof useToast>
export const toastPluginSymbol: InjectionKey<PluginInstance> = Symbol('$toast')
import { toast as _toast } from 'vue3-toastify'

import 'vue3-toastify/dist/index.css'
function useToast() {
    const toast = _toast
    return {
        success: (message: string) => {
            toast.success(message)
        },
        error: (message: string) => {
            toast.error(message)
        },
        info: (message: string) => toast.info(message),
    }
}
export const plugin: Plugin = {
    install: (app, options) => {
        if (process.server) return
        const sample = useToast()
        app.provide(toastPluginSymbol, sample)
    },
}

export default defineNuxtPlugin((app) => {})
