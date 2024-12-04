export default function useBaseApi() {
    const createApi = async <T = null>(
        url: string,
        option: RequestInit
    ): Promise<T> => {
        try {
            const result = await fetch('/api/' + url, {
                headers: {
                    authorization:
                        'Bearer ' + localStorage.getItem('auth_token'),
                },
                ...option,
            })
            console.log('result', result)
            if (!result.ok) {
                if (result.status === 401) {
                    localStorage.removeItem('auth_token')
                    navigateTo('/login')
                }
                throw result.statusText
            }
            const data = await result.json()
            return data as T
        } catch (error) {
            throw error
        }
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
