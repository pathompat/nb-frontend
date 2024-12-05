import pdfMake from 'pdfmake/build/pdfmake'
import type { Content, TDocumentDefinitions } from 'pdfmake/interfaces'
import { pdfFont } from '~/assets/font'
export function usePdf() {
    pdfMake.vfs = pdfFont.vfs
    pdfMake.fonts = {
        Roboto: {
            normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
            bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
            italics:
                'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
            bolditalics:
                'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
        },
        THSarabunNew: {
            normal: 'THSarabunNew.ttf',
            bold: 'THSarabunNew Bold.ttf',
            bolditalics: 'THSarabunNew BoldItalic.ttf',
            italics: 'THSarabunNew Italic.ttf',
        },
    }
    const docDefinition: Ref<TDocumentDefinitions> = ref({
        content: [],
        defaultStyle: {
            font: 'THSarabunNew',
        },
        pageSize: 'A5',
        pageMargins: [40, 20, 40, 60],
    })
    return {
        setContent(content: TDocumentDefinitions) {
            docDefinition.value = { ...docDefinition.value, ...content }
        },
        download: async (fileName: string) => {
            try {
                const pdfDocGenerator = await pdfMake.createPdf(
                    docDefinition.value
                )
                pdfDocGenerator.getBlob((blob: Blob) => {
                    const url = URL.createObjectURL(blob)
                    window.open(url, '_blank')
                })
            } catch (ex) {
                console.log(ex)
                throw ex
            }
        },
    }
}
