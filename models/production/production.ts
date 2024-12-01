import type { PRINTSTATUS, LINE, PLATE } from '../enum/enum'

export interface Production {
    id: number
    name: string
    date: string
    school: string
    shop: string
    phone: string
    address: string
    quotationId: number
    dueDate: string
    estimateDate: string
    items: ProductionItem[]
    remark?: string
}
export interface ProductionItem {
    hasPlan: boolean
    amount: number
    status: PRINTSTATUS
    plate: PLATE
    gram: number
    price: number
    color: number
    line: LINE
    page: number
}
