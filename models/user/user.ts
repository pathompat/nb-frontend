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
export interface LoginResult {
    token: string
    expiredIn: number
}
export interface UserJwt {
    exp: number
    role: string
    userId: string
    username: string
}
