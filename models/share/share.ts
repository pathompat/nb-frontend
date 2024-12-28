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
    line: string
    page: number
    price: number
    category: ITEM_CATEGORY
}
