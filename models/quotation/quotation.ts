import type { PRINTSTATUS, LINE, PLATE } from '../enum/enum'
import type { Production } from '../production/production'

export interface QuotationStat {
    status: string
    count: number
    type: string
}
export interface Quotation
    extends Omit<CreateQuotation, 'dueDateAt' | 'appointmentAt'> {
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
}
export interface QuotationForm extends Omit<CreateQuotation, 'items'> {
    items: CreateQuotationItem[]
}
export interface CreateQuotation {
    userId: string
    schoolId: string
    schoolAddress: string
    schoolTelephone: string
    schoolName: string
    dueDateAt: Date | null
    appointmentAt: Date | null
    items: QuotationItem[]
    remark?: string
    status?: string
}
export interface QuotationResultApi extends Quotation {
    production?: Production
    productionId: string | null
}
export interface QuotationItem {
    id?: String
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
export interface CreateQuotationItem
    extends Omit<Partial<QuotationItem>, 'status'> {
    id?: string
}
export interface FilterQuotation {
    school: string[]
    store: string[]
    status: string[]
    type: string | null
    plate: string | null
    page: number | null
    color: string | null
    pattern: string | null
    gram: number | null
    category: string | null
}
