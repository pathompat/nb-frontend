import {
    type Quotation,
    type QuotationForm,
} from '~/models/quotation/quotation'
import { PRINTSTATUS, LINE, PLATE } from '~/models/enum/enum'

export const useQuotationStore = defineStore('quotation', () => {
    const { getRequest, postRequest } = useBaseApi()
    const controller = 'quotation'

    const quotations = ref<Quotation[]>([])
    const quotation = ref<Quotation>({
        schoolId: '',
        createdAt: '',
        storeName: '',
        duedateAt: null,
        appointmentAt: null,
        items: [],
        id: 0,
        status: '',
        isInstant: false,
        updatedAt: '',
        userId: '',
        remark: '',
    } as Quotation)
    const statuses = ref([
        { title: 'ออกเเบบ', value: PRINTSTATUS.OUTBOUND },
        { title: 'พิมพ์', value: PRINTSTATUS.PRINT },
        { title: 'เย็บเข้าเล่ม', value: PRINTSTATUS.SEWING },
        { title: 'แพ็ค', value: PRINTSTATUS.PACK },
        { title: 'พร้อมจัดส่ง', value: PRINTSTATUS.READY },
    ])

    const statusColors = [
        { id: PRINTSTATUS.PRINT, color: '#FF9800' },
        { id: PRINTSTATUS.OUTBOUND, color: '#B0BEC5' },
        { id: PRINTSTATUS.SEWING, color: '#2196F3' },
        { id: PRINTSTATUS.PACK, color: '#9C27B0' },
        { id: PRINTSTATUS.READY, color: '#4CAF50' },
    ]

    const getStatusTitle = computed(() => (value: number) => {
        return (
            statuses.value.find((status) => status.value === value)?.title ||
            'ไม่ทราบสถานะ'
        )
    })

    const fetchQuotations = async () => {
        try {
            const response = await getRequest<Quotation[]>(controller)
            quotations.value = response
        } catch (error) {
            throw error
        }
    }

    const createQuotation = async (
        quotation: QuotationForm
    ): Promise<Quotation> => {
        try {
            const response = await postRequest<Quotation>(controller, quotation)
            quotations.value.push(response)
            return response
        } catch (error) {
            throw error
        }
    }

    const getQuotationById = (id: number) => {
        quotation.value = quotations.value.find((q) => q.id === id)!
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
        statuses,
        statusColors,
        getStatusTitle,
        fetchQuotations,
        createQuotation,
        getQuotationById,
        updateQuotation,
        quotation,
    }
})
