import type { PRINTSTATUS, LINE, PLATE } from '../enum/enum'

export interface Production {
    id: number
    storeName: string
    schoolName: string
    schoolAddress: string
    schoolTelephone: string
    createdAt: string
    updatedAt: string
    dueDateAt: string | null
    status: string
    appointmentAt: string | null
    items: ProductionItem[]
    remark?: string
}
export interface ProductionItem {
    id?: string
    category: string
    options: string
    hasReference: boolean
    quantity: number
    status: string
    plate: string
    gram: number
    price: number
    color: string
    pattern: string
    page: number
}
