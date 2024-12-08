import {
    type Quotation,
    type CreateQuotation,
} from '~/models/quotation/quotation'
import { PRINTSTATUS } from '~/models/enum/enum'
import type { ApiResult } from '~/models/api/api'

export const useQuotationStore = defineStore('quotation', () => {
    const { getRequest, postRequest } = useBaseApi()
    const controller = 'quotation'

    const quotations = ref<Quotation[]>([])
    const quotation = ref<Quotation>({
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
            const response =
                await getRequest<ApiResult<Quotation[]>>(controller)
            quotations.value = response.data
        } catch (error) {
            throw error
        }
    }

    const createQuotation = async (
        quotation: CreateQuotation
    ): Promise<Quotation> => {
        try {
            const response = await postRequest<Quotation>(controller, quotation)
            quotations.value.push(response)
            return response
        } catch (error) {
            throw error
        }
    }

    const getQuotationById = async (id: number) => {
        try {
            const response = await getRequest<Quotation[]>(
                `${controller}/${id}`
            )
            quotations.value = response
        } catch (error) {
            throw error
        }
    }

    const updateQuotation = async (
        quotation: Quotation
    ): Promise<Quotation> => {
        const index = quotations.value.findIndex((q) => q.id === quotation.id)
        if (index !== -1) {
            quotations.value[index] = quotation
        }
        return quotation
    }

    return {
        quotations,
        fetchQuotations,
        createQuotation,
        getQuotationById,
        updateQuotation,
        quotation,
    }
})
