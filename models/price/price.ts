export interface Price {
    categoryId: number
    categoryName: string
    options: PriceOption[]
}
export interface PriceOption {
    gram: number
    pattern: string[]
    page: number
    color: string | null
    price: number
}

export interface CreatePrice {}
