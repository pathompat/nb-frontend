import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { PdfBaseRequest, QuotationPdfRequest } from '~/models/api/api'
import { pdfServer } from '~/server/basePdfServer'
function getHeader({
    quotationId,
    shopname,
    appointmentDate,
    duedate,
    schoolname,
}: QuotationPdfRequest) {
    return {
        stack: [
            {
                text: `ใบเสนอราคา #QT-${quotationId.padStart(5, '0')}`,
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
                            text: `Job No.: PR-${new Date().getFullYear()}-${quotationId.padStart(5, '0')}`,
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
    )) as PdfBaseRequest<QuotationPdfRequest>
    const docDefinition = {
        content: pdf.content,
        defaultStyle: pdf.defaultStyle,
        pageSize: pdf.pageSize,
        pageMargins: pdf.pageMargins,
        styles: pdf.styles,
        header: getHeader({
            quotationId: header.quotationId,
            shopname: header.shopname,
            appointmentDate: header.appointmentDate,
            duedate: header.duedate,
            schoolname: header.schoolname,
        }),
    } as TDocumentDefinitions
    return await pdfServer(event, docDefinition)
})
