export interface Pagination<T> {
    page: number
    totalItems: number
    itemsPerPage: number
    items: T
}
