import pdfMake from 'pdfmake'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fontPaths = {
    THSarabunNew: {
        normal: path.join(
            __dirname,
            '../',
            '../',
            'public',
            '/fonts/THSarabunNew.ttf'
        ),
        bold: path.join(
            __dirname,
            '../',
            '../',
            'public',
            '/fonts/THSarabunNew Bold.ttf'
        ),
        bolditalics: path.join(
            __dirname,
            '../',
            '../',
            'public',
            '/fonts/THSarabunNew BoldItalic.ttf'
        ),
        italics: path.join(
            __dirname,
            '../',
            '../',
            'public',
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

export async function pdfServer(
    event: any,
    docDefinition: TDocumentDefinitions
) {
    try {
        docDefinition.footer = footers.defaultFooter as any
        const pdfBuffer = await createPdfBinary(docDefinition)
        setResponseHeader(event, 'Content-Type', 'application/pdf')
        return send(event, pdfBuffer)
    } catch (error) {
        return sendError(event, error as Error)
    }
}
