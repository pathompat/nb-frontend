import type { TableLayout, TDocumentDefinitions } from 'pdfmake/interfaces'

export function customerSellOrderPdf() {
    const pdf = usePdf()
    const layoutTable: TableLayout = {
        hLineWidth: (i, node) => (i === node.table.body.length ? 1 : 0),
        vLineWidth: () => 0,
        hLineColor: (i, node) =>
            i === node.table.body.length ? '#cccccc' : null,
        vLineColor: () => null,
        paddingLeft: () => 12,
        paddingRight: () => 12,
        paddingTop: () => 0,
        paddingBottom: () => 0,
    }

    return {
        async setItem(id: string) {},
        async download() {
            pdf.setContent({
                content: [
                    {
                        table: {
                            widths: ['*', '*', '*'],
                            headerRows: 5,
                            body: [
                                [
                                    // {
                                    //     image: await getBase64Image(logo),
                                    //     height: 70,
                                    //     width: 70
                                    // },
                                    {
                                        colSpan: 2,
                                        margin: [-40, 8, 0, 0],
                                        text: [
                                            {
                                                text: 'บริษัท สิบเอ็กซ์ พลัส จำกัด\n',
                                                bold: true,
                                                fontSize: 16,
                                            },
                                            {
                                                text: 'เลขที่ 2 ซอยประชาราษฎร์ 4/1 ตำบลตลาดขวัญ อำเภอเมืองนนทบุรี จังหวัดนนทบุรี 11000\n',
                                            },
                                            {
                                                text: 'เลขที่ประจำตัวผู้เสียภาษีอากร 0125558024649',
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        colSpan: 3,
                                        text: 'ใบแจ้งหนี้ / ใบส่งของ',
                                        alignment: 'center',
                                        bold: true,
                                        fontSize: 32,
                                        margin: [0, 4, 0, 0],
                                    },
                                ],
                            ],
                        },
                        layout: {
                            hLineWidth: (i, node) => 0,
                            vLineWidth: () => 0,
                            hLineColor: (i, node) => null,
                            vLineColor: () => null,
                            paddingLeft: () => 0,
                            paddingRight: () => 0,
                            paddingTop: () => 0,
                            paddingBottom: () => 0,
                        },
                    },

                    {
                        columns: [{}],
                        margin: [0, 12, 0, 0],
                    },
                    {
                        columns: [
                            {
                                stack: [
                                    {
                                        text: 'ในนาม บริษัท สิบเอ็กซ์ พลัส จำกัด',
                                        margin: [36, -4, 0, 0],
                                    },
                                    {
                                        text: 'ผู้รับมอบอำนวจ โชติรส ชัยประเสริฐ',
                                        margin: [36, 4, 0, 0],
                                    },
                                ],
                                alignment: 'center',
                            },
                        ],
                        fontSize: 12,
                        absolutePosition: { x: 40, y: 760 },
                    },
                ],
                footer: function (currentPage, pageCount) {
                    return {
                        text: [
                            { text: `หน้า`, bold: true },
                            {
                                text: `                                 ${currentPage}/${pageCount}`,
                            },
                        ],
                        alignment: 'right',
                        marginRight: 87,
                        marginTop: -547,
                    }
                },

                styles: {
                    header: {
                        fillColor: '#cccccc',
                        fontSize: 14,
                        bold: true,
                        alignment: 'center',
                        margin: [0, 5],
                    },
                },
                pageSize: 'A4',
                pageMargins: [50, 30, 50, 30],
                defaultStyle: {
                    fontSize: 14,
                    font: 'THSarabunNew',
                },
            } as TDocumentDefinitions)
            pdf.download(`tresfer - ${new Date()}`)
        },
    }
}
