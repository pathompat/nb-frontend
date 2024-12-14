import { SYSTEM_ROLE } from '~/models/enum/enum'
import { toastPluginSymbol } from '~/plugins/toast'

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useAuthStore()
    const toast = inject(toastPluginSymbol)!
    const { userProfile } = storeToRefs(user)
    if (userProfile.value!.role !== SYSTEM_ROLE.ADMIN) {
        return navigateTo('/')
    }
})
