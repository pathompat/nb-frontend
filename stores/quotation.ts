import {
    type Quotation,
    type CreateQuotation,
    type QuotationResultApi,
    type QuotationStat,
    type QuotationItem,
} from '~/models/quotation/quotation'
import type { ApiResult } from '~/models/api/api'

export const useQuotationStore = defineStore('quotation', () => {
    const { getRequest, postRequest, putRequest } = useBaseApi()
    const controller = 'quotation'

    const quotations = ref<QuotationResultApi[]>([])
    const quotationStat = ref<QuotationStat[]>([])
    const quotation = ref<QuotationResultApi>({
        schoolId: '',
        createdAt: '',
        items: [],
        id: 0,
        isInstant: false,
        updatedAt: '',
        userId: '',
        remark: '',
        appointmentAt: null,
        dueDateAt: null,
    } as any)

    const fetchQuotations = async () => {
        try {
            const response = await getRequest<ApiResult<QuotationResultApi[]>>(
                controller + '?includeProduction=true'
            )
            quotations.value = response.data
        } catch (error) {
            throw error
        }
    }
    const fetchQuotationsState = async () => {
        try {
            const response = await getRequest<ApiResult<QuotationStat[]>>(
                controller + `/stat`
            )
            quotationStat.value = response.data
        } catch (error) {
            throw error
        }
    }
    const createQuotation = async (
        quotation: CreateQuotation
    ): Promise<Quotation> => {
        try {
            const response = await postRequest<ApiResult<QuotationResultApi>>(
                controller,
                quotation
            )
            return response.data
        } catch (error) {
            throw error
        }
    }

    const getQuotationById = async (id: number) => {
        try {
            const response = await getRequest<ApiResult<QuotationResultApi>>(
                `${controller}/${id}`
            )
            quotation.value = response.data
        } catch (error) {
            throw error
        }
    }

    const updateQuotationItem = async (
        quotationId: string,
        id: string,
        item: Partial<QuotationItem>
    ) => {
        try {
            const response = await putRequest<QuotationItem>(
                `${controller}/${quotationId}/item/${id}`,
                item
            )
            return response
        } catch (error) {
            throw error
        }
    }

    const updateQuotation = async (
        id: string,
        quotation: Partial<Quotation>
    ): Promise<QuotationResultApi> => {
        try {
            const response = await putRequest<ApiResult<QuotationResultApi>>(
                `${controller}/${id}`,
                quotation
            )
            return response.data
        } catch (error) {
            throw error
        }
    }

    return {
        quotations,
        fetchQuotations,
        createQuotation,
        getQuotationById,
        updateQuotation,
        fetchQuotationsState,
        updateQuotationItem,
        quotationStat,
        quotation,
    }
})
