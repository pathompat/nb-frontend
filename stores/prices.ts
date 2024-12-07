import type { CreatePrice, Price } from '@/models/price/price'
import type { ApiResult } from '~/models/api/api'

export const usePriceStore = defineStore('Prices', () => {
    const prices = ref<Price[]>([])
    const price = ref<Price>({} as Price)
    const controller = 'priceRef'
    async function fetchAllPrices(): Promise<Price[]> {
        const api = useBaseApi()
        try {
            const allPrices =
                await api.getRequest<ApiResult<Price[]>>(controller)
            prices.value = allPrices.data
            return allPrices.data
        } catch (error) {
            throw error
        }
    }
    async function fetchAllPricesWithCustomer(
        customerId: string
    ): Promise<Price[]> {
        const api = useBaseApi()
        try {
            const allPrices = await api.getRequest<ApiResult<Price[]>>(
                `${controller}?userId=${customerId}`
            )
            prices.value = allPrices.data
            return allPrices.data
        } catch (error) {
            throw error
        }
    }
    async function fetchPriceById(id: string) {
        const api = useBaseApi()
        try {
            price.value = await api.getRequest<Price>(`${controller}/${id}`)
        } catch (error) {
            throw error
        }
    }
    async function createPrice(
        customerId: string,
        Price: CreatePrice
    ): Promise<Price> {
        const api = useBaseApi()
        try {
            return await api.postRequest<Price>(controller, {
                ...Price,
                userId: customerId,
            })
        } catch (error) {
            throw error
        }
    }
    async function updatePrice(
        id: string,
        updatedPrice: CreatePrice
    ): Promise<Price> {
        const api = useBaseApi()
        try {
            return await api.postRequest<Price>(controller, updatedPrice)
        } catch (error) {
            throw error
        }
    }
    async function deletePrice(id: string): Promise<boolean> {
        const api = useBaseApi()
        try {
            return await api.deleteRequest<boolean>(`${controller}/${id}`)
        } catch (error) {
            throw error
        }
    }
    return {
        prices,
        fetchAllPrices,
        fetchPriceById,
        createPrice,
        updatePrice,
        price,
        deletePrice,
        fetchAllPricesWithCustomer,
    }
})
