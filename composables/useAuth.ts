import useAuthApi from './api/useAuthApi'
import { contextPluginSymbol } from '@/plugins/context'

export default function useAuth() {
    const authApi = useAuthApi()
    const context = inject(contextPluginSymbol)!
    const router = useRouter()
    return {
        login: async (username: string, password: string) => {
            try {
                const res = await authApi.login(username, password)
                if (!res) {
                    throw new Error('Invalid username or password')
                }
                localStorage.setItem('token', res.id)
                await context.refresh()
                router.push({ path: '/' })

                return res
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        logout: async () => {
            localStorage.removeItem('token')
            context.userProfile.value = null
            router.push({ path: '/login' })
        },
        getProfile: async (id: string) => {
            try {
                const res = await authApi.getProfile(id)
                if (!res) {
                    throw new Error('User not found')
                }
                return res
            } catch (error) {
                console.error(error)
                throw error
            }
        },
    }
}
