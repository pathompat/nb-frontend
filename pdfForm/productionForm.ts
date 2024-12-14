export function productionPdf() {
    const pdf = usePdf()
    const productionStore = useProductionStore()
    const { production } = storeToRefs(productionStore)

    return {
        async setItem(id: string) {
            try {
                await productionStore.getProductionById(id)
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
                                    ...production.value!.items.map(
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
                        {
                            pageBreak:
                                production.value!.items.length > 12
                                    ? 'before'
                                    : undefined,
                            text: 'รายการวัตถุดิบ',
                            fontSize: 17,
                            margin: [0, 20, 0, 0],
                        },
                        {
                            table: {
                                headerRows: 1,
                                widths: ['*', '*', '*', '*'],
                                body: [
                                    [
                                        { text: 'ลำดับ', bold: true },
                                        { text: 'วัตถุดิบ', bold: true },
                                        { text: 'จำนวน', bold: true },
                                        { text: 'หน่วย', bold: true },
                                    ],
                                    ['', '', '', ''],
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
                    duedate: production.value!.dueDateAt?.toString() || '',
                    productionId: production.value!.id.toString(),
                    schoolname: production.value!.schoolName,
                    shopname: production.value!.storeName,
                }
            )
            pdf.download('production-pdf')
        },
    }
}
