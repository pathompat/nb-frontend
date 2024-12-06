import pdfMake from 'pdfmake'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import path from 'path'
import { fileURLToPath } from 'url'
import { HEADER } from '~/models/enum/enum'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fontPaths = {
    THSarabunNew: {
        normal: path.join(
            __dirname,
            '../',
            '../',
            'assets',
            '/fonts/THSarabunNew.ttf'
        ),
        bold: path.join(
            __dirname,
            '../',
            '../',
            'assets',
            '/fonts/THSarabunNew Bold.ttf'
        ),
        bolditalics: path.join(
            __dirname,
            '../',
            '../',
            'assets',
            '/fonts/THSarabunNew BoldItalic.ttf'
        ),
        italics: path.join(
            __dirname,
            '../',
            '../',
            'assets',
            '/fonts/THSarabunNew Italic.ttf'
        ),
    },
}

const footers = {
    defaultFooter: (currentPage: number, pageCount: number) => {
        return {
            text: `หน้า ${currentPage} จาก ${pageCount}`,
            alignment: 'right',
            margin: [0, 0, 50, 0],
            fontSize: 12,
        }
    },
}
async function createPdfBinary(pdfDoc: TDocumentDefinitions): Promise<Buffer> {
    const printer = new pdfMake(fontPaths)
    const doc = printer.createPdfKitDocument(pdfDoc)
    const chunks: any[] = []

    return new Promise((resolve, reject) => {
        doc.on('data', (chunk) => chunks.push(chunk))
        doc.on('end', () => resolve(Buffer.concat(chunks)))
        doc.on('error', (err) => reject(err))
        doc.end()
    })
}

function getHeader(header: HEADER, currentPage?: number, pageCount?: number) {
    if (header === HEADER.QUOTATION) {
        return
    } else if (header === HEADER.PRODUCTION) {
    } else {
        return ''
    }
}
export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) as any
    const selectedFooter = footers.defaultFooter

    const docDefinition = {
        content: body.content,
        defaultStyle: body.defaultStyle,
        pageSize: body.pageSize,
        pageMargins: body.pageMargins,
        styles: body.styles,
        header: getHeader(HEADER.QUOTATION)(
            '123',
            'shopname',
            '1',
            '2022-01-01',
            'schoolname'
        ),
        footer: selectedFooter,
    } as any
    console.log(docDefinition)

    try {
        const pdfBuffer = await createPdfBinary(docDefinition)
        setResponseHeader(event, 'Content-Type', 'application/pdf')
        return send(event, pdfBuffer)
    } catch (error) {
        return sendError(event, error as Error)
    }
})
