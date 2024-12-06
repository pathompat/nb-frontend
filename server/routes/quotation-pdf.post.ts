function getHeader(
    quotationId: string,
    shopname: string,
    appointmentDateRemain: string,
    duedate: string,
    schoolname: string
) {
    return {
        stack: [
            {
                text: `แบบฟอร์มสั่งผลิต #PR-${quotationId.padStart(5, '0')}`,
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
                            text: `Job No.: PR-${new Date().getFullYear()}-${quotationId.padStart(5, '0')}`,
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
                            text: `กำหนดชำระ: ${appointmentDateRemain} วัน`,
                            style: 'headerSub',
                            alignment: 'right',
                        },
                    ],
                ],
            },
            // {
            //     text: 'รายการสินค้า',
            //     style: 'headerSection',
            //     margin: [0, 10, 0, 0],
            // },
            // {
            //     canvas: [
            //         {
            //             type: 'line',
            //             x1: 0,
            //             y1: 0,
            //             x2: 515,
            //             y2: 0,
            //             lineWidth: 1,
            //         },
            //     ],
            // },
        ],
        margin: [40, 20, 40, 10],
    }
}
import { pdfServer } from '~/server/basePdfServer'
export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) as any

    // const selectedFooter = footers.defaultFooter

    const docDefinition = {
        content: body.content,
        defaultStyle: body.defaultStyle,
        pageSize: body.pageSize,
        pageMargins: body.pageMargins,
        styles: body.styles,
        header: getHeader('123', 'shopname', '1', '2022-01-01', 'schoolname'),
    } as any
    return await pdfServer(event, docDefinition)
})
