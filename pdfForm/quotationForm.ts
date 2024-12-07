import logo from '@/public/logo.png'
import type { TableLayout, TDocumentDefinitions } from 'pdfmake/interfaces'

export function quotationPdf() {
    const pdf = usePdf()
    const layoutTable: TableLayout = {
        hLineWidth: () => 0.5,
        vLineWidth: () => 0.5,
        paddingTop: () => 2,
        paddingBottom: () => 2,
    }
    return {
        async setItem(id: string) {},
        async download() {
            pdf.setContent(
                {
                    pageSize: 'A4',
                    pageMargins: [40, 150, 40, 40],
                    content: [
                        {
                            table: {
                                headerRows: 1,
                                widths: [
                                    'auto',
                                    'auto',
                                    'auto',
                                    'auto',
                                    'auto',
                                    'auto',
                                    'auto',
                                ],
                                body: [
                                    // แถว header ของตาราง
                                    [
                                        { text: 'ลำดับ', bold: true },
                                        { text: 'เพลา', bold: true },
                                        { text: 'เกรด', bold: true },
                                        { text: 'สี', bold: true },
                                        { text: 'แผ่น', bold: true },
                                        { text: 'เส้น', bold: true },
                                        { text: 'จำนวน', bold: true },
                                    ],
                                    // ข้อมูลตัวอย่าง
                                    ...Array.from({ length: 100 }, (_, i) => [
                                        i + 1,
                                        i % 2 === 0 ? 'ใหญ่' : 'เล็ก',
                                        '55',
                                        '4',
                                        '80',
                                        i % 2 === 0 ? 'ครั้ง' : 'เส้น',
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
