import useBaseApi from '../useBaseApi'
import { mockUsers } from './useUserApi'
import type { User } from '~/models/user/user'

export default function useAuthApi() {
    const api = useBaseApi()
    return {
        async login(username: string, password: string): Promise<User | null> {
            try {
                return await api.postRequest<User>('login', {
                    username,
                    password,
                })
            } catch (error) {
                console.error(error)
                return new Promise((resolve) =>
                    setTimeout(() => {
                        resolve(
                            mockUsers.find(
                                (user) =>
                                    user.username === username &&
                                    user.password === password
                            ) ?? null
                        )
                    }, 500)
                )
            }
        },
        async getProfile(id: string): Promise<User | null> {
            try {
                return await api.getRequest<User>('profile/' + id)
            } catch (error) {
                console.error(error)
                return new Promise((resolve) =>
                    setTimeout(() => {
                        resolve(
                            mockUsers.find((user) => user.id === id) ?? null
                        )
                    }, 500)
                )
            }
        },
    }
}
