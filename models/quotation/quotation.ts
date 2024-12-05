import type { PRINTSTATUS, LINE, PLATE } from '../enum/enum'
import type { Production } from '../production/production'

export interface Quotation
    extends Omit<QuotationForm, 'duedateAt' | 'appointmentAt'> {
    id: number
    status: string
    createdAt: string
    updatedAt: string
    duedateAt: string | null
    appointmentAt: string | null
}
export interface QuotationForm {
    userId: string
    schoolId: string
    storeName: string
    isInstant: boolean
    duedateAt: Date
    appointmentAt: Date
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
