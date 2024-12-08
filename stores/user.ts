import type { CreateUser, User } from '@/models/user/user'
import type { ApiResult } from '~/models/api/api'
import { SYSTEM_ROLE } from '~/models/object/object'

export const useUserStore = defineStore('users', () => {
    const users = ref<User[]>([])
    const user = ref<User>({} as User)
    const controller = 'user'
    async function fetchAllUsers(): Promise<User[]> {
        const api = useBaseApi()
        try {
            const allUsers = await api.getRequest<ApiResult<User[]>>(controller)
            const result = allUsers.data.filter(
                (user) => user.role !== SYSTEM_ROLE.ADMIN
            )
            users.value = result
            return result
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
    async function deleteUser(id: string): Promise<boolean> {
        const api = useBaseApi()
        try {
            return await api.deleteRequest<boolean>(`${controller}/${id}`)
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
        disableUser: deleteUser,
    }
})
