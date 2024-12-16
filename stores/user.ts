import type { CreateUser, User } from '@/models/user/user'
import type { ApiResult } from '~/models/api/api'
import { SYSTEM_ROLE } from '~/models/enum/enum'

export const useUserStore = defineStore('users', () => {
    const users = ref<User[]>([])
    const user = ref<User>({} as User)
    const controller = 'user'
    const api = useBaseApi()
    async function fetchAllUsers(): Promise<User[]> {
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
        try {
            user.value = (
                await api.getRequest<ApiResult<User>>(`${controller}/${id}`)
            ).data
        } catch (error) {
            throw error
        }
    }
    async function createUser(user: CreateUser): Promise<User> {
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
        try {
            return await api.putRequest<User>(
                `${controller}/${id}`,
                updatedUser
            )
        } catch (error) {
            throw error
        }
    }
    async function deleteUser(id: string): Promise<boolean> {
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
