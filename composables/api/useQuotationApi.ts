import useBaseApi from '../useBaseApi'
import { ref } from 'vue'
import {
    type Quotation,
    type QuotationForm,
} from '~/models/quotation/quotation'
import { PRINTSTATUS, LINE, PLATE } from '~/models/enum/enum'
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
export const getStatusTitle = (value: number) =>
    statuses.value.find((status) => status.value === value)?.title ||
    'ไม่ทราบสถานะ'
export default function useQuotationApi() {
    const controller = 'quotation'
    const { getRequest, postRequest } = useBaseApi()
    return {
        async getAll(): Promise<Quotation[]> {
            try {
                const response = await getRequest<Quotation[]>(controller)
                return response
            } catch (error) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(JSON.parse(JSON.stringify(mockQuotations)))
                    }, 500)
                })
            }
        },
        async create(quotation: QuotationForm): Promise<Quotation> {
            try {
                const response = await postRequest<Quotation>(
                    controller,
                    quotation
                )
                return response
            } catch (error) {
                return new Promise((resolve) => {
                    const newQuotation = {
                        ...quotation,
                        id: mockQuotations.length + 1,
                        status: 'DRAFT',
                    }
                    mockQuotations.push(newQuotation)
                    setTimeout(() => {
                        resolve(newQuotation)
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
