import useBaseApi from '~/composables/useBaseApi'
import { PRINTSTATUS, LINE, PLATE } from '~/models/enum/enum'
import type { Production, ProductionItem } from '~/models/production/production'

const mockProductions: Production[] = [
    {
        id: 1,
        date: new Date('10/10/2024').toLocaleDateString('th-TH'),
        school: 'โรงเรียนบ้านท่าช้าง',
        shop: 'คุณจรัญ',
        quotationId: 1,
        phone: '0812345678',
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
        quotationId: 2,
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
        quotationId: 3,
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

export const useProductionStore = defineStore('production', () => {
    const productions = ref<Production[]>([])

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
    async function getProductionById(id: number) {
        const { getRequest } = useBaseApi()
        try {
            return await getRequest<Production>(`production/${id}`)
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
        fetchAllProductions,
        createProduction,
        getProductionById,
        updateProduction,
    }
})
