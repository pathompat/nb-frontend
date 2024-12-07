import pdfMake from 'pdfmake/build/pdfmake'
import type { Content, TDocumentDefinitions } from 'pdfmake/interfaces'
import { pdfFont } from '~/assets/font.js'
import type { PdfBaseRequest, QuotationPdfRequest } from '~/models/api/api'
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
    const header = ref<QuotationPdfRequest>({
        appointmentDate: '',
        duedate: '',
        quotationId: '',
        schoolname: '',
        shopname: '',
    })
    return {
        setContent(
            content: TDocumentDefinitions,
            pdfHeader: QuotationPdfRequest
        ) {
            docDefinition.value = { ...docDefinition.value, ...content }
            header.value = pdfHeader
        },
        download: async (controller: string) => {
            try {
                const result = (await $fetch(`/${controller}`, {
                    body: JSON.stringify({
                        pdf: docDefinition.value,
                        header: header.value,
                    } as PdfBaseRequest<QuotationPdfRequest>),
                    method: 'post',
                    responseType: 'blob',
                })) as Blob

                const pdfUrl = URL.createObjectURL(result)

                window.open(pdfUrl, '_blank')
            } catch (ex) {
                console.log(ex)
                throw ex
            }
        },
    }
}
