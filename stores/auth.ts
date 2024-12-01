import type { User } from '~/models/user/user'
import { mockUsers } from './user'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
    }),
    actions: {
        async login(username: string, password: string): Promise<User | null> {
            const api = useBaseApi()
            try {
                const loggedInUser = await api.postRequest<User>('login', {
                    username,
                    password,
                })
                this.user = loggedInUser
                return loggedInUser
            } catch (error) {
                console.error(error)
                return new Promise((resolve) =>
                    setTimeout(() => {
                        const mockUser =
                            mockUsers.find(
                                (user) =>
                                    user.username === username &&
                                    user.password === password
                            ) ?? null
                        this.user = mockUser
                        resolve(mockUser)
                    }, 500)
                )
            }
        },
        async getProfile(id: string): Promise<User | null> {
            const api = useBaseApi()
            try {
                const profile = await api.getRequest<User>('profile/' + id)
                return profile
            } catch (error) {
                console.error(error)
                return new Promise((resolve) =>
                    setTimeout(() => {
                        const mockProfile =
                            mockUsers.find((user) => user.id === id) ?? null
                        resolve(mockProfile)
                    }, 500)
                )
            }
        },
        logout() {
            this.user = null
        },
    },
})
