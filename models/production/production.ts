import type { PRINTSTATUS, LINE, PLATE } from '../enum/enum'

export interface Production {
    id: number
    school: string
    status: string
    userName: string
    storeName: string
    phone: string
    address: string
    quotationId: number
    createdAt: string
    updatedAt: string
    items: ProductionItem[]
    remark?: string
}
export interface ProductionItem {
    plate: string
    grams: number
    color: number
    page: number
    line: string
    hasRef: boolean
    price: number
    quantity: number
}
