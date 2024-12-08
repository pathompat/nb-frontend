import type { PRINTSTATUS, LINE, PLATE } from '../enum/enum'
import type { Production } from '../production/production'

export interface Quotation
    extends Omit<CreateQuotation, 'dueDateAt' | 'appointmentAt'> {
    id: number
    createdAt: string
    updatedAt: string
    dueDateAt: string | null
    isInstant: boolean
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
    hasReference: boolean
    amount: number
    status: string
    plate: string
    gram: number
    price: number
    color: string
    line: string
    page: number
}
export interface CreateQuotationItem extends Omit<QuotationItem, 'status'> {
    isSaved: boolean
    isValid: boolean
}
