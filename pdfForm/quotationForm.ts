export function quotationPdf() {
    const pdf = usePdf()
    const quotationStore = useQuotationStore()
    const { quotation } = storeToRefs(quotationStore)

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
                                    ...quotation.value.items.map(
                                        (item, index) => [
                                            index + 1,
                                            item.category +
                                                '/' +
                                                item.gram +
                                                '/' +
                                                item.color +
                                                '/' +
                                                item.page +
                                                '/' +
                                                item.pattern,
                                            item.options,
                                            item.hasReference ? 'มี' : 'ไม่มี',
                                            item.quantity,
                                            item.price,
                                        ]
                                    ),
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
                    appointmentDate: '90',
                    duedate: quotation.value.appointmentAt?.toString() || '',
                    quotationId: quotation.value.id.toString(),
                    schoolname: quotation.value.schoolName,
                    shopname: quotation.value.storeName,
                }
            )
            pdf.download('quotation-pdf')
        },
    }
}
