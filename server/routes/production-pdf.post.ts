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
                text: `แบบฟอร์มสั่งผลิต #PR-${productionId.padStart(5, '0')}`,
                style: 'headerTitle',
            },
            {
                columns: [
                    [
                        {
                            text: `วันที่: ${new Date().toLocaleDateString()}`,
                            style: 'headerSub',
                        },
                        {
                            text: `Job No.: PR-${new Date().getFullYear()}-${productionId.padStart(5, '0')}`,
                            style: 'headerSub',
                        },
                        {
                            text: `ร้านค้า: ${shopname}`,
                            style: 'headerSub',
                        },
                        {
                            text: `โรงเรียน: ${schoolname}`,
                            style: 'headerSub',
                        },
                    ],
                    [
                        {
                            text: `ส่ง: ${duedate}`,
                            style: 'headerSub',
                            alignment: 'right',
                        },
                        {
                            text: `กำหนดชำระ: ${appointmentDate} วัน`,
                            style: 'headerSub',
                            alignment: 'right',
                        },
                    ],
                ],
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
