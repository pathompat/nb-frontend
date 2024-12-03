import type { set } from 'nuxt/dist/app/compat/capi'
import { LOCALSTORAGE_KEY } from '~/models/object/object'
import type { LoginResult, User, UserJwt } from '~/models/user/user'

export const useAuthStore = defineStore('auth', () => {
    const { parseJwt } = useUtil()
    const router = useRouter()
    const userProfile = ref<UserJwt | null>(null)
    async function login(username: string, password: string): Promise<UserJwt> {
        const api = useBaseApi()
        try {
            const loggedInUser = await api.postRequest<LoginResult>('login', {
                username,
                password,
            })
            localStorage.setItem(
                LOCALSTORAGE_KEY.AUTH_TOKEN,
                loggedInUser.token
            )
            localStorage.setItem(
                LOCALSTORAGE_KEY.AUTH_TOKEN_EXPIRE,
                loggedInUser.expiredIn.toString()
            )
            const jwtObject = parseJwt<UserJwt>(loggedInUser.token)
            userProfile.value = jwtObject
            return jwtObject
        } catch (error) {
            throw error
        }
    }
    async function getProfile(id: string): Promise<User> {
        const api = useBaseApi()
        try {
            const profile = await api.getRequest<User>('profile/' + id)
            return profile
        } catch (error) {
            throw error
        }
    }
    async function logout() {
        userProfile.value = null
        localStorage.removeItem(LOCALSTORAGE_KEY.AUTH_TOKEN)
        localStorage.removeItem(LOCALSTORAGE_KEY.AUTH_TOKEN_EXPIRE)
        router.push('/login')
    }
    return {
        userProfile: computed(() => userProfile.value),
        setProfile: (profile: UserJwt) => {
            userProfile.value = profile
        },
        login,
        getProfile,
        logout,
    }
})
