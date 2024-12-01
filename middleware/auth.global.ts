import { useProfileStore } from '~/stores/profile'

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path === '/login') return

    const profile = useProfileStore()
    const auth = useAuthStore()

    const token = process.client ? localStorage.getItem('token') : null

    if (!token) {
        return navigateTo('/login')
    }

    try {
        const user = await auth.getProfile(token)
        if (user) {
            profile.setProfile(user)
        } else {
            return navigateTo('/login')
        }
    } catch (error) {
        console.error('Auth error:', error)
        return navigateTo('/login')
    }
})
