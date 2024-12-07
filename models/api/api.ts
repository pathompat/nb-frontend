import type { TDocumentDefinitions } from 'pdfmake/interfaces'

export interface Pagination<T> {
    page: number
    totalItems: number
    itemsPerPage: number
    items: T
}
export interface ApiResult<T> {
    data: T
    code: number
    message: string
}
export interface QuotationPdfRequest {
    quotationId: string
    shopname: string
    appointmentDate: string
    duedate: string
    schoolname: string
}
export interface ProductionPdfRequest {
    productionId: string
    shopname: string
    appointmentDate: string
    duedate: string
    schoolname: string
}
export type PdfHeder = QuotationPdfRequest | ProductionPdfRequest
export interface PdfBaseRequest<T = PdfHeder> {
    pdf: TDocumentDefinitions
    header: T
}
