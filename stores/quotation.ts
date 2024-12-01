import {
    type Quotation,
    type QuotationForm,
} from '~/models/quotation/quotation'
import { PRINTSTATUS, LINE, PLATE } from '~/models/enum/enum'

const mockQuotations: Quotation[] = [
    {
        id: 1,
        date: new Date('10/10/2024').toLocaleDateString('th-TH'),
        school: 'โรงเรียนบ้านท่าช้าง',
        shop: 'คุณจรัญ',
        phone: '0812345678',
        status: 'DRAFT',
        address: 'ถ.สุขุมวิท ต.ท่าช้าง อ.เมือง จ.สมุทรปราการ',
        dueDate: new Date('10/10/2024').toLocaleDateString('th-TH'),
        estimateDate: new Date('10/10/2024').toLocaleDateString('th-TH'),
        items: [
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                price: 100,
                color: 1,
                line: LINE.HALF,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 12000,
                status: PRINTSTATUS.SEWING,
                plate: PLATE.SMALL,
                gram: 60,
                price: 100,
                color: 1,
                line: LINE.HALF,
                page: 40,
            },
            {
                hasPlan: false,
                amount: 3300,
                status: PRINTSTATUS.OUTBOUND,
                plate: PLATE.BIG,
                gram: 60,
                price: 100,
                color: 1,
                line: LINE.HALF,
                page: 40,
            },
        ],
        remark: 'สั่งผลิตที่ 1',
    },
    {
        id: 2,
        date: new Date('10/10/2024').toLocaleDateString('th-TH'),
        school: 'โรงเรียนบ้านท่าช้าง',
        shop: 'คุณจรัญ',
        phone: '0812345678',
        address: 'ถ.สุขุมวิท ต.ท่าช้าง อ.เมือง จ.สมุทรปราการ',
        dueDate: new Date('10/10/2024').toLocaleDateString('th-TH'),
        estimateDate: new Date('10/10/2024').toLocaleDateString('th-TH'),
        status: 'DRAFT',
        items: [
            {
                hasPlan: false,
                amount: 3300,
                status: PRINTSTATUS.OUTBOUND,
                plate: PLATE.BIG,
                gram: 60,
                price: 100,
                color: 1,
                line: LINE.HALF,
                page: 40,
            },
        ],
    },
    {
        id: 3,
        date: new Date('10/10/2024').toLocaleDateString('th-TH'),
        school: 'โรงเรียนบ้านท่าช้าง',
        phone: '0812345678',
        address: 'ถ.สุขุมวิท ต.ท่าช้าง อ.เมือง จ.สมุทรปราการ',
        dueDate: new Date('10/10/2024').toLocaleDateString('th-TH'),
        estimateDate: new Date('10/10/2024').toLocaleDateString('th-TH'),
        shop: 'คุณจรัญ',
        status: 'DRAFT',
        items: [
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
            {
                hasPlan: true,
                amount: 6000,
                status: PRINTSTATUS.PRINT,
                plate: PLATE.SMALL,
                gram: 60,
                color: 1,
                line: LINE.HALF,
                price: 100,
                page: 40,
            },
        ],
    },
]

export const useQuotationStore = defineStore('quotation', () => {
    const { getRequest, postRequest } = useBaseApi()
    const controller = 'quotation'

    const quotations = ref<Quotation[]>([])
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
            quotations.value = JSON.parse(JSON.stringify(mockQuotations))
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
            const newQuotation = {
                ...quotation,
                id: quotations.value.length + 1,
                status: 'DRAFT',
            }
            quotations.value.push(newQuotation)
            return newQuotation
        }
    }

    const getQuotationById = (id: number): Quotation | undefined => {
        return quotations.value.find((q) => q.id === id)
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
    }
})
