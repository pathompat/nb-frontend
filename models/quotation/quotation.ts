import type { PRINTSTATUS, LINE, PLATE } from '../enum/enum'
import type { Production } from '../production/production'

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
    dueDateAt: Date | null
    appointmentAt: Date | null
    items: QuotationItem[]
    remark?: string
}
export interface QuotationResultApi extends Quotation {
    production?: Production
}
export interface QuotationItem {
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
export interface CreateQuotationItem extends Omit<QuotationItem, 'status'> {
    id?: string
}
