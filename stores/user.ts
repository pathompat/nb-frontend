import type { CreateUser, User } from '@/models/user/user'

export const useUserStore = defineStore('users', () => {
    const users = ref<User[]>([])
    const user = ref<User>({} as User)
    async function fetchAllUsers(): Promise<User[]> {
        const api = useBaseApi()
        try {
            const allUsers = await api.getRequest<User[]>('users')
            users.value = allUsers
            return allUsers
        } catch (error) {
            throw error
        }
    }
    async function fetchUserById(id: string) {
        const api = useBaseApi()
        try {
            user.value = await api.getRequest<User>(`users/${id}`)
        } catch (error) {
            throw error
        }
    }
    async function createUser(user: CreateUser): Promise<User> {
        const api = useBaseApi()
        try {
            return await api.postRequest<User>('users', user)
        } catch (error) {
            throw error
        }
    }
    async function updateUser(
        id: string,
        updatedUser: CreateUser
    ): Promise<User> {
        const api = useBaseApi()
        try {
            return await api.postRequest<User>('users', updatedUser)
        } catch (error) {
            throw error
        }
    }
    async function disableUser(id: string): Promise<boolean> {
        const api = useBaseApi()
        try {
            return await api.postRequest<boolean>('users/disable', { id })
        } catch (error) {
            throw error
        }
    }
    return {
        users,
        fetchAllUsers,
        fetchUserById,
        createUser,
        updateUser,
        user,
        disableUser,
    }
})
