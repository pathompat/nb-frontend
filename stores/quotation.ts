import {
    type Quotation,
    type CreateQuotation,
    type QuotationResultApi,
    type QuotationStat,
    type QuotationItem,
    type QuotationConfigWithLevel,
    type QuotationConfigResultApi,
} from '~/models/quotation/quotation'
import type { ApiResult } from '~/models/api/api'
import { CONFIG_TYPE } from '~/models/enum/enum'

export const useQuotationStore = defineStore('quotation', () => {
    const { getRequest, postRequest, putRequest } = useBaseApi()
    const controller = 'quotation'
    const configs = ref<QuotationConfigWithLevel[]>([])
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

    const getConfig = async (userId: string) => {
        try {
            const response = await getRequest<
                ApiResult<QuotationConfigResultApi[]>
            >(`${controller}/config?userId=${userId}`)
            configs.value = response.data.reduce((acc, item) => {
                const existingGroup = acc.find(
                    (group) => group.level === item.level
                )
                if (existingGroup) {
                    existingGroup.configs.push(item)
                } else {
                    acc.push({
                        level: item.level,
                        configs: [item],
                    })
                }
                return acc
            }, [] as QuotationConfigWithLevel[])
        } catch (error) {
            throw error
        }
    }

    const getQuotationById = async (id: string) => {
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
        configs,
        configPromotion: computed(() => {
            return configs.value.find(
                (x) => x.level == CONFIG_TYPE.QUOTATION_ADDITIONAL_LIST_ITEMS
            )!
        }),
        configBill: computed(() => {
            return configs.value.find(
                (x) => x.level == CONFIG_TYPE.QUOTATION_ADDITIONAL_LISTS
            )!
        }),
        configItem: computed(() => {
            return configs.value.find(
                (x) => x.level == CONFIG_TYPE.QUOTATION_ITEMS
            )!
        }),
        getConfig,
        quotation,
    }
})
