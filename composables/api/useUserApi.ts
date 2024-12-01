import type { Pagination } from '~/models/api/api'
import useBaseApi from './useBaseApi'
import { type User } from '@/models/user/user'

export const mockUsers: User[] = [
    {
        id: 'U000001',
        createdDate: '11/10/2024 10:10:00',
        shop: 'ก่อกวี',
        username: 'kortawee',
        password: '123445',
        active: true,
        role: 'admin',
    },
    {
        id: 'U000002',
        createdDate: '11/10/2024 10:10:00',
        shop: 'เจอาร์ กำแพง',
        username: 'jrgampang',
        password: '123445',
        active: true,
        role: 'admin',
    },
    {
        id: 'U000003',
        createdDate: '11/10/2024 10:10:00',
        shop: 'ทดสอบร้านค้า1',
        username: 'testuser1',
        password: '123445',
        active: true,
        role: 'admin',
    },
    {
        id: 'U000004',
        createdDate: '11/10/2024 10:10:00',
        shop: 'ทดสอบร้านค้า12',
        username: 'admin',
        password: 'admin',
        active: true,
        role: 'admin',
    },
    {
        id: 'U000005',
        createdDate: '11/10/2024 10:10:00',
        shop: 'ทดสอบร้านค้า12',
        username: 'customer',
        password: 'customer',
        active: true,
        role: 'customer',
    },
]

export default function useUserApi() {
    const api = useBaseApi()
    const controller = 'users'

    return {
        // async getTierOptions(): Promise<Tier[]> {
        //     try {
        //         return await api.getRequest<Tier[]>(controller)
        //     } catch (error) {
        //         console.error(error)
        //         return new Promise((resolve, reject) => {
        //             setTimeout(() => {
        //                 resolve(tier)
        //             }, 500)
        //         })
        //     }
        // },
        async getAll(): Promise<User[]> {
            try {
                return await api.getRequest<User[]>(controller)
            } catch (error) {
                console.error(error)
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(JSON.parse(JSON.stringify(mockUsers)))
                    }, 500)
                })
            }
        },
        async getOne(id: string): Promise<User> {
            try {
                return await api.getRequest<User>(controller + '/' + id)
            } catch (error) {
                console.error(error)
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(mockUsers.find((x) => x.id == id) as User)
                    }, 500)
                })
            }
        },
        async create(user: User): Promise<User> {
            try {
                return await api.postRequest<User>(controller, user)
            } catch (error) {
                console.error(error)
                return new Promise((resolve, reject) => {
                    user.active = true
                    user.id =
                        'U' + (mockUsers.length + 1).toString().padStart(6, '0')
                    user.createdDate = new Date().toLocaleString()
                    mockUsers.push(user)
                    setTimeout(() => {
                        resolve(user)
                    }, 500)
                })
            }
        },
        async update(id: string, user: User): Promise<User> {
            try {
                return await api.postRequest<User>(controller, user)
            } catch (error) {
                console.error(error)
                return new Promise((resolve, reject) => {
                    const index = mockUsers.findIndex((x) => x.id == id)
                    mockUsers[index] = user
                    setTimeout(() => {
                        resolve(user)
                    }, 500)
                })
            }
        },
        async disable(id: string): Promise<boolean> {
            try {
                return await api.postRequest<boolean>(controller, id)
            } catch (error) {
                console.error(error)
                return new Promise((resolve, reject) => {
                    const index = mockUsers.findIndex((x) => x.id == id)
                    mockUsers[index].active = false
                    setTimeout(() => {
                        resolve(true)
                    }, 500)
                })
            }
        },
    }
}
