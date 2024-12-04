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
