export interface Pagination<T> {
    page: number
    totalItems: number
    itemsPerPage: number
    items: T
}

export default function useBaseApi() {
    const createApi = <T = null>(
        url: string,
        option: RequestInit
    ): Promise<T> => {
        return fetch('http://localhost:6000/' + url, option) as Promise<T>
    }
    return {
        async postRequest<T>(url: string, body: any): Promise<T> {
            return await createApi<T>(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
        },
        async getRequest<T>(url: string): Promise<T> {
            return await createApi<T>(url, {
                method: 'GET',
            })
        },
    }
}
