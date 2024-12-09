import type { TableLayout } from 'pdfmake/interfaces'
import { toastPluginSymbol } from '~/plugins/toast'

export function quotationPdf() {
    const pdf = usePdf()
    const quotationStore = useQuotationStore()
    const { quotation } = storeToRefs(quotationStore)
    const layoutTable: TableLayout = {
        hLineWidth: () => 0.5,
        vLineWidth: () => 0.5,
        paddingTop: () => 2,
        paddingBottom: () => 2,
    }
    return {
        async setItem(id: string) {
            try {
                await quotationStore.getQuotationById(+id)
            } catch (error) {
                throw error
            }
        },
        async download() {
            pdf.setContent(
                {
                    pageSize: 'A4',
                    pageMargins: [40, 210, 40, 40],
                    content: [
                        {
                            table: {
                                headerRows: 1,
                                widths: ['10%', '*', '*', '10%', '10%', '10%'],
                                body: [
                                    [
                                        { text: 'ลำดับ', bold: true },
                                        {
                                            text: 'ประเภท/แกรม/สี/แผ่น/เส้น',
                                            bold: true,
                                        },
                                        { text: 'เพิ่มเติม', bold: true },
                                        { text: 'มีแบบ', bold: true },
                                        { text: 'จำนวน', bold: true },
                                        { text: 'ราคา', bold: true },
                                    ],
                                    ...Array.from({ length: 40 }, (_, i) => [
                                        i + 1,
                                        i % 2 === 0
                                            ? '55/44/80/เดี่ยว'
                                            : '55/44/80/เดี่ยว',
                                        'uv,lcd,pdf,png',
                                        i % 2 === 0 ? 'มี' : 'ไม่มี',
                                        i % 2 === 0 ? '2' : '4',
                                        (i + 1) * 120,
                                    ]),
                                ],
                            },
                            layout: 'lightHorizontalLines',
                        },
                    ],
                    styles: {
                        headerTitle: {
                            fontSize: 16,
                            bold: true,
                            alignment: 'center',
                            margin: [0, 0, 0, 10],
                        },
                        headerSub: {
                            fontSize: 10,
                            margin: [0, 2, 0, 2],
                        },
                        headerSection: {
                            fontSize: 12,
                            bold: true,
                            margin: [0, 10, 0, 10],
                        },
                    },
                },
                {
                    appointmentDate: '2021-09-01',
                    duedate: '2021-09-15',
                    quotationId: '00001',
                    schoolname: 'โรงเรียนสองสองสอง',
                    shopname: 'ร้านค้าสองสองสอง',
                }
            )
            pdf.download('quotation-pdf')
        },
    }
}
