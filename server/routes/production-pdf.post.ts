import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { PdfBaseRequest, ProductionPdfRequest } from '~/models/api/api'
import { pdfServer } from '~/server/basePdfServer'
function getHeader({
    productionId,
    shopname,
    appointmentDate,
    duedate,
    schoolname,
}: ProductionPdfRequest) {
    return {
        stack: [
            {
                text: `ใบสั่งผลิตสินค้า #PR-${productionId.padStart(5, '0')}`,
                alignment: 'left',
                fontSize: 20,
                bold: true,
                margin: [0, 30, 0, 10],
            },
            {
                columns: [
                    [
                        {
                            text: `วันที่: ${new Date().toLocaleDateString()}`,
                            style: 'headerSub',
                            fontSize: 14,
                        },
                        {
                            text: `Job No.: PR-${new Date().getFullYear()}-${productionId.padStart(5, '0')}`,
                            style: 'headerSub',
                            fontSize: 14,
                        },
                        {
                            text: `ร้านค้า: ${shopname}`,
                            style: 'headerSub',
                            fontSize: 14,
                        },
                        {
                            text: `โรงเรียน: ${schoolname}`,
                            style: 'headerSub',
                            fontSize: 14,
                        },
                    ],
                    [
                        {
                            text: `ส่ง: ${duedate}`,
                            style: 'headerSub',
                            alignment: 'right',
                            fontSize: 14,
                        },
                        {
                            text: `กำหนดชำระ: ${appointmentDate} วัน`,
                            style: 'headerSub',
                            alignment: 'right',
                            fontSize: 14,
                        },
                    ],
                ],
            },
            {
                text: 'รายการสินค้า',
                fontSize: 17,
                bold: true,
                margin: [0, 10, 0, 0],
            },
        ],
        margin: [40, 20, 40, 10],
    }
}
export default defineEventHandler(async (event) => {
    const { pdf, header } = (await readBody(
        event
    )) as PdfBaseRequest<ProductionPdfRequest>
    const docDefinition = {
        content: pdf.content,
        defaultStyle: pdf.defaultStyle,
        pageSize: pdf.pageSize,
        pageMargins: pdf.pageMargins,
        styles: pdf.styles,
        header: getHeader({
            productionId: header.productionId,
            shopname: header.shopname,
            appointmentDate: header.appointmentDate,
            duedate: header.duedate,
            schoolname: header.schoolname,
        }),
    } as TDocumentDefinitions
    return await pdfServer(event, docDefinition)
})
