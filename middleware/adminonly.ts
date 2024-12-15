import { SYSTEM_ROLE } from '~/models/enum/enum'

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useAuthStore()
    const { userProfile } = storeToRefs(user)
    if (userProfile.value!.role !== SYSTEM_ROLE.ADMIN) {
        return navigateTo('/')
    }
})
