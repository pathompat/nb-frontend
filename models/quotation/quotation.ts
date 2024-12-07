import type { PRINTSTATUS, LINE, PLATE } from '../enum/enum'
import type { Production } from '../production/production'

export interface Quotation
    extends Omit<QuotationForm, 'dueDateAt' | 'appointmentAt'> {
    id: number
    createdAt: string
    updatedAt: string
    dueDateAt: string | null
    isInstant: boolean
    appointmentAt: string | null
}
export interface QuotationForm {
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
    hasPlan: boolean
    amount: number
    status: PRINTSTATUS
    plate: string
    gram: number
    price: number
    color: string
    line: string
    page: number
}
