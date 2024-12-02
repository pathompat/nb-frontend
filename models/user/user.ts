export interface User {
    id: string
    username: string
    storeName: string
    tierId: number
    role: string
    createdAt: string
    updatedAt: string
}
export interface CreateUser {
    username: string
    tierId: number
    storeName: string
    password: string
}
