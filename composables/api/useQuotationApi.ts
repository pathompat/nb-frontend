import useBaseApi, { type Pagination } from './useBaseApi'
import { ref } from 'vue'
export interface Quotation {
    id: number
    name: string
    date: string
    school: string
    shop: string
    phone: string
    address: string
    dueDate: string
    estimateDate: string
    items: QuotationItem[]
    remark?: string
}
export interface QuotationItem {
    hasPlan: boolean
    amount: number
    status: PRINTSTATUS
    plate: PLATE
    gram: number
    price: number
    color: number
    line: LINE
    page: number
}
export enum LINE {
    SINGLE = 1,
    HALF = 2,
}
export enum PLATE {
    BIG = 1,
    SMALL = 2,
    EXTRA = 3,
}
export enum PRINTSTATUS {
    OUTBOUND = 1,
    PRINT = 2,
    SEWING = 3,
    PACK = 4,
    READY = 5,
}
export const statuses = ref([
    { title: 'ออกเเบบ', value: PRINTSTATUS.OUTBOUND },
    { title: 'พิมพ์', value: PRINTSTATUS.PRINT },
    { title: 'เย็บเข้าเล่ม', value: PRINTSTATUS.SEWING },
    { title: 'แพ็ค', value: PRINTSTATUS.PACK },
    { title: 'พร้อมจัดส่ง', value: PRINTSTATUS.READY },
])
export const statusColors = [
    { id: PRINTSTATUS.PRINT, color: '#FF9800' },
    { id: PRINTSTATUS.OUTBOUND, color: '#B0BEC5' },
    { id: PRINTSTATUS.SEWING, color: '#2196F3' },
    { id: PRINTSTATUS.PACK, color: '#9C27B0' },
    { id: PRINTSTATUS.READY, color: '#4CAF50' },
]
export const lines = [
    { title: 'เดี่ยว', value: LINE.SINGLE },
    { title: 'ครึ่ง', value: LINE.HALF },
]
export const plates = [
    { title: 'ใหญ่', value: PLATE.BIG },
    { title: 'เล็ก', value: PLATE.SMALL },
    { title: 'พิเศษ', value: PLATE.EXTRA },
]
const mockQuotations: Quotation[] = [
    {
        id: 1,
        name: 'สั่งผลิตที่ 1',
        date: new Date('10/10/2024').toLocaleDateString('th-TH'),
        school: 'โรงเรียนบ้านท่าช้าง',
        shop: 'คุณจรัญ',
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
        name: 'สั่งผลิตที่ 2',
        date: new Date('10/10/2024').toLocaleDateString('th-TH'),
        school: 'โรงเรียนบ้านท่าช้าง',
        shop: 'คุณจรัญ',
        phone: '0812345678',
        address: 'ถ.สุขุมวิท ต.ท่าช้าง อ.เมือง จ.สมุทรปราการ',
        dueDate: new Date('10/10/2024').toLocaleDateString('th-TH'),
        estimateDate: new Date('10/10/2024').toLocaleDateString('th-TH'),
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
        name: 'สั่งผลิตที่ 3',
        date: new Date('10/10/2024').toLocaleDateString('th-TH'),
        school: 'โรงเรียนบ้านท่าช้าง',
        phone: '0812345678',
        address: 'ถ.สุขุมวิท ต.ท่าช้าง อ.เมือง จ.สมุทรปราการ',
        dueDate: new Date('10/10/2024').toLocaleDateString('th-TH'),
        estimateDate: new Date('10/10/2024').toLocaleDateString('th-TH'),
        shop: 'คุณจรัญ',
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
export const getStatusTitle = (value: number) =>
    statuses.value.find((status) => status.value === value)?.title ||
    'ไม่ทราบสถานะ'
export default function useQuotationApi() {
    const controller = 'quotation'
    const { getRequest, postRequest } = useBaseApi()
    return {
        async getAll(): Promise<Pagination<Quotation[]>> {
            try {
                const response =
                    await getRequest<Pagination<Quotation[]>>(controller)
                return response
            } catch (error) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            items: JSON.parse(JSON.stringify(mockQuotations)),
                            total: mockQuotations.length,
                            page: 1,
                            totalItems: mockQuotations.length,
                            itemsPerPage: 10,
                        } as Pagination<Quotation[]>)
                    }, 500)
                })
            }
        },
        async create(quotation: Quotation): Promise<Quotation> {
            try {
                const response = await postRequest<Quotation>(
                    controller,
                    quotation
                )
                return response
            } catch (error) {
                return new Promise((resolve) => {
                    quotation.id = mockQuotations.length + 1
                    mockQuotations.push(quotation)
                    setTimeout(() => {
                        resolve(quotation)
                    }, 500)
                })
            }
        },
        async getOne(id: number): Promise<Quotation> {
            try {
                const response = await getRequest<Quotation>(
                    `${controller}/${id}`
                )
                return response
            } catch (error) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(mockQuotations.find((q) => q.id === id)!)
                    }, 500)
                })
            }
        },
        async update(quotation: Quotation): Promise<Quotation> {
            return quotation
            // try {
            //   const response = await putRequest<Production>(controller, production);
            //   return response;
            // }
        },
    }
}
