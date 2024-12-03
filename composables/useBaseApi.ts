export default function useBaseApi() {
    const createApi = async <T = null>(
        url: string,
        option: RequestInit
    ): Promise<T> => {
        const result = await fetch('/api/' + url, option)
        const data = await result.json()
        return data as T
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
