export default function useBaseApi() {
    const createApi = <T = null>(
        url: string,
        option: RequestInit
    ): Promise<T> => {
        return fetch('/api/' + url, option) as Promise<T>
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
