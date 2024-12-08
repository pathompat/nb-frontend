import type { ApiResult } from '~/models/api/api'
import { LOCALSTORAGE_KEY } from '~/models/object/object'
import type { LoginResult, User, UserJwt } from '~/models/user/user'

export const useAuthStore = defineStore('auth', () => {
    const { parseJwt } = useUtil()
    const router = useRouter()
    const userProfile = ref<User | null>({
        id: '',
        username: 'dasdads',
        createdAt: '',
        updatedAt: '',
        storeName: '',
        tierId: 1,
        role: 'ADMIN',
    })
    async function login(username: string, password: string) {
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
        } catch (error) {
            throw error
        }
    }
    async function getProfile(): Promise<User> {
        const api = useBaseApi()
        try {
            const profile = (await api.getRequest<ApiResult<User>>('user/info'))
                .data
            userProfile.value = profile
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
        setProfile: (profile: User) => {
            userProfile.value = profile
        },
        login,
        getProfile,
        logout,
    }
})
