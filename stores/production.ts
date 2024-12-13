import useBaseApi from '~/composables/useBaseApi'
import type { ApiResult } from '~/models/api/api'
import type { Production } from '~/models/production/production'

export const useProductionStore = defineStore('production', () => {
    const productions = ref<Production[]>([])
    const production = ref<Production | null>(null)
    async function fetchAllProductions() {
        const { getRequest } = useBaseApi()
        try {
            const response = await getRequest<Production[]>('production')
            productions.value = response
        } catch (error) {
            throw error
        }
    }
    async function createProduction(production: Production) {
        const { postRequest } = useBaseApi()
        try {
            const response = await postRequest<Production>(
                'production',
                production
            )
            productions.value.push(response)
        } catch (error) {
            throw error
        }
    }
    async function getProductionById(id: string) {
        const { getRequest } = useBaseApi()
        try {
            production.value = (
                await getRequest<ApiResult<Production>>(`production/${id}`)
            ).data
            return production.value
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
        updateProduction,
    }
})
