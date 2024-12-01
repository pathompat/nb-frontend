import type { User } from '@/models/user/user'
export const mockUsers: User[] = [
    {
        id: 'U000001',
        createdDate: '11/10/2024 10:10:00',
        shop: 'ก่อกวี',
        username: 'kortawee',
        password: '123445',
        active: true,
        role: 'admin',
        tier: 1,
    },
    {
        id: 'U000002',
        createdDate: '11/10/2024 10:10:00',
        shop: 'เจอาร์ กำแพง',
        username: 'jrgampang',
        password: '123445',
        active: true,
        role: 'admin',
        tier: 1,
    },
    {
        id: 'U000003',
        createdDate: '11/10/2024 10:10:00',
        shop: 'ทดสอบร้านค้า1',
        username: 'testuser1',
        password: '123445',
        active: true,
        role: 'admin',
        tier: 1,
    },
    {
        id: 'U000004',
        createdDate: '11/10/2024 10:10:00',
        shop: 'ทดสอบร้านค้า12',
        username: 'admin',
        password: 'admin',
        active: true,
        role: 'admin',
        tier: 1,
    },
    {
        id: 'U000005',
        createdDate: '11/10/2024 10:10:00',
        shop: 'ทดสอบร้านค้า12',
        username: 'customer',
        password: 'customer',
        active: true,
        role: 'customer',
        tier: 1,
    },
]
export const useUserStore = defineStore('users', {
    state: () => ({
        users: [] as User[],
    }),
    actions: {
        async fetchAllUsers(): Promise<User[]> {
            const api = useBaseApi()
            try {
                const allUsers = await api.getRequest<User[]>('users')
                this.users = allUsers
                return allUsers
            } catch (error) {
                console.error(error)
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.users = JSON.parse(JSON.stringify(mockUsers))
                        resolve(this.users)
                    }, 500)
                })
            }
        },
        async fetchUserById(id: string): Promise<User | undefined> {
            const api = useBaseApi()
            try {
                return await api.getRequest<User>(`users/${id}`)
            } catch (error) {
                console.error(error)
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(mockUsers.find((x) => x.id === id))
                    }, 500)
                })
            }
        },
        async createUser(user: User): Promise<User> {
            const api = useBaseApi()
            try {
                return await api.postRequest<User>('users', user)
            } catch (error) {
                console.error(error)
                return new Promise((resolve) => {
                    user.active = true
                    user.id =
                        'U' + (mockUsers.length + 1).toString().padStart(6, '0')
                    user.createdDate = new Date().toLocaleString()
                    mockUsers.push(user)
                    this.users.push(user)
                    setTimeout(() => {
                        resolve(user)
                    }, 500)
                })
            }
        },
        async updateUser(id: string, updatedUser: User): Promise<User> {
            const api = useBaseApi()
            try {
                return await api.postRequest<User>('users', updatedUser)
            } catch (error) {
                console.error(error)
                return new Promise((resolve) => {
                    const index = mockUsers.findIndex((x) => x.id === id)
                    if (index !== -1) {
                        mockUsers[index] = updatedUser
                        this.users = [...mockUsers]
                    }
                    setTimeout(() => {
                        resolve(updatedUser)
                    }, 500)
                })
            }
        },
        async disableUser(id: string): Promise<boolean> {
            const api = useBaseApi()
            try {
                return await api.postRequest<boolean>('users/disable', { id })
            } catch (error) {
                console.error(error)
                return new Promise((resolve) => {
                    const index = mockUsers.findIndex((x) => x.id === id)
                    if (index !== -1) {
                        mockUsers[index].active = false
                        this.users = [...mockUsers]
                    }
                    setTimeout(() => {
                        resolve(true)
                    }, 500)
                })
            }
        },
    },
})
