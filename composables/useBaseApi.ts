import { LOCALSTORAGE_KEY } from '~/models/object/object'

export default function useBaseApi() {
    const createApi = async <T = null>(
        url: string,
        option: RequestInit
    ): Promise<T> => {
        try {
            const header = {
                authorization:
                    'Bearer ' +
                    localStorage.getItem(LOCALSTORAGE_KEY.AUTH_TOKEN),
            }
            const options = { ...option, headers: header }
            const result = await fetch('/api/' + url, options)
            if (!result.ok) {
                if (result.status === 401) {
                    localStorage.removeItem(LOCALSTORAGE_KEY.AUTH_TOKEN)
                    navigateTo('/login')
                }
                throw (await result.json()).message
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
        async putRequest<T>(url: string, body: any): Promise<T> {
            return await createApi<T>(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
        },
        async deleteRequest<T>(url: string): Promise<T> {
            return await createApi<T>(url, {
                method: 'DELETE',
            })
        },
    }
}
