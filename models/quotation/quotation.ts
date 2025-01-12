import type { PRINTSTATUS, LINE, PLATE, CONFIG_TYPE } from '../enum/enum'
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
    schoolContactName: string
    items: QuotationItem[]
    remark?: string
    userName?: string
    status?: string
}
export interface QuotationResultApi extends Quotation {
    production?: Production
    productionId: string | null
}
export interface QuotationItem {
    id?: String
    categoryId: number
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
    printedContent?: string
}
export interface CreateQuotationItem
    extends Omit<Partial<QuotationItem>, 'status'> {
    id?: string
    perUnitPrice: number
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
    category: number | null
}
export interface QuotationConfigWithLevel {
    level: string
    configs: QuotationConfig[]
}
export interface QuotationConfig extends QuotationConfigResultApi {}
export interface QuotationConfigResultApi {
    categoryId: number
    categoryKey: string
    comparator: string
    compareValue: 2000
    description: string
    fixedChargePrice: 0
    hasFixedChange: false
    id: number
    key: string
    label: string | null
    level: string
    tierIds: [1, 2, 3, 4]
    type: string
    unit: string
    value: number
}

export type CalculateConfig =
    | {
          level: CONFIG_TYPE.QUOTATION_ADDITIONAL_LIST_ITEMS
          calculate: (
              listItem: CreateQuotationItem[],
              configs: QuotationConfig[],
              usedConfigs: QuotationConfig[]
          ) => {
              listItem: CreateQuotationItem[]
              configs: QuotationConfig[]
              configsByItem: QuotationConfig[]
              total: number
          }
      }
    | {
          level: CONFIG_TYPE.QUOTATION_ITEMS
          calculate: (
              listItem: CreateQuotationItem[],
              configs: QuotationConfig[]
          ) => {
              listItem: CreateQuotationItem[]
              configs: QuotationConfig[]
              configsByItem: QuotationConfig[]
              defaultItem: CreateQuotationItem[]
          }
      }
    | {
          level: CONFIG_TYPE.QUOTATION_ADDITIONAL_LISTS
          calculate: (
              listItem: CreateQuotationItem[],
              configs: QuotationConfig[],
              total: number
          ) => {
              listItem: CreateQuotationItem[]
              configs: QuotationConfig[]
              configsByItem: QuotationConfig[]
              total: number
          }
      }
