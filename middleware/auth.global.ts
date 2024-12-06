import { LOCALSTORAGE_KEY } from '~/models/object/object'

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path === '/login') {
        if (localStorage.getItem(LOCALSTORAGE_KEY.AUTH_TOKEN)) {
            return navigateTo('/')
        }
        return
    }
    const authStore = useAuthStore()
    const { setProfile } = useAuthStore()
    const token = localStorage.getItem(LOCALSTORAGE_KEY.AUTH_TOKEN)
    if (!token) {
        return navigateTo('/login')
    }
    // return
    try {
        const user = await authStore.getProfile()
        if (!user) return navigateTo('/login')
    } catch (error) {
        return navigateTo('/login')
    }
})
