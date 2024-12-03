import { LOCALSTORAGE_KEY } from '~/models/object/object'
import type { UserJwt } from '~/models/user/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { parseJwt, unixToDate } = useUtil()
    if (to.path === '/login') return
    const authStore = useAuthStore()
    const { setProfile } = useAuthStore()
    const token = localStorage.getItem(LOCALSTORAGE_KEY.AUTH_TOKEN)
    // const expire = localStorage.getItem(LOCALSTORAGE_KEY.AUTH_TOKEN_EXPIRE)
    // if (!expire) {
    //     return navigateTo('/login')
    // }
    // const tokenDate = unixToDate(+expire!)
    // const currentDate = new Date()
    // if (currentDate > tokenDate) {
    //     return navigateTo('/login')
    // }
    if (!token) {
        return navigateTo('/login')
    }

    try {
        const userJwtData = parseJwt<UserJwt>(token!)
        if (userJwtData) {
            setProfile(userJwtData)
        } else {
            return navigateTo('/login')
        }
    } catch (error) {
        return navigateTo('/login')
    }
})
