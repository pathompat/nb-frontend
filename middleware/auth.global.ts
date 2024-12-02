export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path === '/login') return

    const authStore = useAuthStore()

    const token = process.client ? localStorage.getItem('token') : null

    if (!token) {
        return navigateTo('/login')
    }

    try {
        const user = await authStore.getProfile(token!)
        if (user) {
            //  profile.setProfile(user)
        } else {
            return navigateTo('/login')
        }
    } catch (error) {
        return navigateTo('/login')
    }
})
