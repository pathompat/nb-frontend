import type { User } from '~/models/user/user'

export const useAuthStore = defineStore('auth', () => {
    const userProfile = ref<User | null>(null)
    async function login(
        username: string,
        password: string
    ): Promise<User | null> {
        const api = useBaseApi()
        try {
            const loggedInUser = await api.postRequest<User>('login', {
                username,
                password,
            })
            return loggedInUser
        } catch (error) {
            throw error
        } finally {
            userProfile.value = {
                id: '',
                username: '',
                storeName: '',
                tierId: 0,
                role: 'ADMIN',
                createdAt: '',
                updatedAt: '',
            }
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
    }
    return {
        userProfile,
        login,
        getProfile,
        logout,
    }
})
