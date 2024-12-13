import {
    type Quotation,
    type CreateQuotation,
    type QuotationResultApi,
    type QuotationStat,
} from '~/models/quotation/quotation'
import type { ApiResult } from '~/models/api/api'

export const useQuotationStore = defineStore('quotation', () => {
    const { getRequest, postRequest } = useBaseApi()
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
            const response = await postRequest<QuotationResultApi>(
                controller,
                quotation
            )
            return response
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

    const updateQuotation = async (
        quotation: Quotation
    ): Promise<Quotation> => {
        return quotation
    }

    return {
        quotations,
        fetchQuotations,
        createQuotation,
        getQuotationById,
        updateQuotation,
        fetchQuotationsState,
        quotationStat,
        quotation,
    }
})
