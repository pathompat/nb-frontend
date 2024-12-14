import useBaseApi from '~/composables/useBaseApi'
import type { ApiResult } from '~/models/api/api'
import type { Production, ProductionItem } from '~/models/production/production'

export const useProductionStore = defineStore('production', () => {
    const productions = ref<Production[]>([])
    const production = ref<Production | null>(null)
    const controller = 'production'
    const { getRequest, putRequest, postRequest } = useBaseApi()
    async function fetchAllProductions() {
        try {
            const response = await getRequest<Production[]>(controller)
            productions.value = response
        } catch (error) {
            throw error
        }
    }
    async function createProduction(production: Production) {
        try {
            const response = await postRequest<ApiResult<Production>>(
                controller,
                production
            )
            productions.value.push(response.data)
        } catch (error) {
            throw error
        }
    }
    async function getProductionById(id: string) {
        try {
            production.value = (
                await getRequest<ApiResult<Production>>(`${controller}/${id}`)
            ).data
            return production.value
        } catch (error) {
            throw error
        }
    }

    const updateProductionItem = async (
        productionId: string,
        id: string,
        item: Partial<ProductionItem>
    ) => {
        try {
            const response = await putRequest<ApiResult<ProductionItem>>(
                `${controller}/${productionId}/item/${id}`,
                item
            )
            return response.data
        } catch (error) {
            throw error
        }
    }

    async function updateProduction(production: Production) {
        const index = productions.value.findIndex((p) => p.id === production.id)
        if (index !== -1) {
            productions.value[index] = production
        }
    }
    return {
        productions,
        production,
        fetchAllProductions,
        createProduction,
        getProductionById,
        updateProductionItem,
        updateProduction,
    }
})
