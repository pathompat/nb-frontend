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

export const useProductionStore = defineStore('production', {
    state: () => ({
        statuses: [
            { title: 'ออกเเบบ', value: PRINTSTATUS.OUTBOUND },
            { title: 'พิมพ์', value: PRINTSTATUS.PRINT },
            { title: 'เย็บเข้าเล่ม', value: PRINTSTATUS.SEWING },
            { title: 'แพ็ค', value: PRINTSTATUS.PACK },
            { title: 'พร้อมจัดส่ง', value: PRINTSTATUS.READY },
        ],
        statusColors: [
            { id: PRINTSTATUS.PRINT, color: '#FF9800' },
            { id: PRINTSTATUS.OUTBOUND, color: '#B0BEC5' },
            { id: PRINTSTATUS.SEWING, color: '#2196F3' },
            { id: PRINTSTATUS.PACK, color: '#9C27B0' },
            { id: PRINTSTATUS.READY, color: '#4CAF50' },
        ],
        lines: [
            { title: 'เดี่ยว', value: LINE.SINGLE },
            { title: 'ครึ่ง', value: LINE.HALF },
        ],
        plates: [
            { title: 'ใหญ่', value: PLATE.BIG },
            { title: 'เล็ก', value: PLATE.SMALL },
            { title: 'พิเศษ', value: PLATE.EXTRA },
        ],
        productions: mockProductions,
    }),

    getters: {
        getStatusTitle: (state) => (value: number) =>
            state.statuses.find((status) => status.value === value)?.title ||
            'ไม่ทราบสถานะ',
    },

    actions: {
        async fetchAllProductions() {
            const { getRequest } = useBaseApi()
            try {
                const response = await getRequest<Production[]>('production')
                this.productions = response
            } catch (error) {
                this.productions = JSON.parse(JSON.stringify(mockProductions))
            }
        },
        async createProduction(production: Production) {
            const { postRequest } = useBaseApi()
            try {
                const response = await postRequest<Production>(
                    'production',
                    production
                )
                this.productions.push(response)
            } catch (error) {
                production.id = this.productions.length + 1
                this.productions.push(production)
            }
        },
        async getProductionById(id: number) {
            const { getRequest } = useBaseApi()
            try {
                return await getRequest<Production>(`production/${id}`)
            } catch (error) {
                return this.productions.find((p) => p.id === id)!
            }
        },
        async updateProduction(production: Production) {
            // Implement update logic here
            // Example:
            const index = this.productions.findIndex(
                (p) => p.id === production.id
            )
            if (index !== -1) {
                this.productions[index] = production
            }
        },
    },
})
