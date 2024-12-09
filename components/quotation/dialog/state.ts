import type { CreateQuotationItem } from '~/models/quotation/quotation'
export type DialogItemQuotationState = ReturnType<
    typeof dialogItemQuotationState
>
export const dialogItemQuotationStateSymbol: InjectionKey<DialogItemQuotationState> =
    Symbol('$DialogItemQuotationState')
export default function dialogItemQuotationState() {
    const dialogOpen = ref(false)
    const quotationItem = ref<CreateQuotationItem>(defaultQuotationItem())
    const loading = ref(false)
    let resolveFn: ((user: CreateQuotationItem) => void) | null = null
    function action() {
        if (!resolveFn) return
        loading.value = true
        resolveFn(quotationItem.value)
    }
    function defaultQuotationItem(): CreateQuotationItem {
        return {
            id: '',
            category: '',
            options: '',
            plate: '',
            gram: 0,
            color: '',
            page: 0,
            pattern: '',
            hasReference: false,
            quantity: 0,
            price: 0,
        }
    }
    const openDialog = async (id?: string): Promise<CreateQuotationItem> => {
        quotationItem.value = defaultQuotationItem()
        loading.value = true
        dialogOpen.value = true

        loading.value = false

        return new Promise<CreateQuotationItem>((resolve) => {
            resolveFn = resolve
        })
    }
    return {
        dialogOpen,
        quotationItem,
        loading,
        action,
        openDialog,
        closeDialog: () => {
            dialogOpen.value = false
        },
        closeLoading: () => {
            loading.value = false
        },
    }
}
