import type { PRINTSTATUS, LINE, PLATE } from '../enum/enum'

export interface Quotation {
    id: number
    name: string
    date: string
    school: string
    shop: string
    phone: string
    address: string
    dueDate: string
    estimateDate: string
    items: QuotationItem[]
    remark?: string
}
export interface QuotationItem {
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
