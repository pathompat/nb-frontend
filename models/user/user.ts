export interface User {
    id: string
    username: string
    shop: string
    createdDate: string
    password?: string
    active: boolean
    role: string
    tier: number
}
