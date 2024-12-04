import type { CreateUser, User } from '@/models/user/user'
import type { ApiResult } from '~/models/api/api'

export const useUserStore = defineStore('users', () => {
    const users = ref<User[]>([])
    const user = ref<User>({} as User)
    const controller = 'user'
    async function fetchAllUsers(): Promise<User[]> {
        const api = useBaseApi()
        try {
            const allUsers = await api.getRequest<ApiResult<User[]>>(controller)
            users.value = allUsers.data
            return allUsers.data
        } catch (error) {
            throw error
        }
    }
    async function fetchUserById(id: string) {
        const api = useBaseApi()
        try {
            user.value = await api.getRequest<User>(`${controller}/${id}`)
        } catch (error) {
            throw error
        }
    }
    async function createUser(user: CreateUser): Promise<User> {
        const api = useBaseApi()
        try {
            return await api.postRequest<User>(controller, user)
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
            return await api.postRequest<User>(controller, updatedUser)
        } catch (error) {
            throw error
        }
    }
    async function disableUser(id: string): Promise<boolean> {
        const api = useBaseApi()
        try {
            return await api.postRequest<boolean>(`${controller}/disable`, {
                id,
            })
        } catch (error) {
            throw error
        }
    }
    return {
        users: computed(() => users.value),
        fetchAllUsers,
        fetchUserById,
        createUser,
        updateUser,
        user,
        disableUser,
    }
})
