import type { ITEM_CATEGORY } from '../enum/enum'

export interface SaveRow {
    index: number
    isSaved: boolean
}
export interface MenuItem {
    title: string
    value: string
    icon: string
    role: string[]
}
export interface TemplateCategory {
    gram: number
    line?: string
    page: number
    price: number
    color: string | null
    categoryId: number
}
export interface PricePageMap {
    page: number
    price: number
}
export interface TemplateCategoryGroup {
    gram: number
    line: string[]
    pagePriceMap: PricePageMap[]
    color?: string[]
    categoryId: number
}
