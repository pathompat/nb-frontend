import type { PRINTSTATUS, LINE, PLATE } from '../enum/enum'
import type { Production } from '../production/production'

export interface Quotation extends QuotationForm {
    id: number
    status: string
}
export interface QuotationForm {
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
export interface QuotationResultApi extends Quotation {
    production?: Production
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
