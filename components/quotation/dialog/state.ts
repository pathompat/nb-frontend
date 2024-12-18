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
    const { prices } = storeToRefs(usePriceStore())
    const { handlerByItemPriceRef } = useCalculatorQuotationItem()
    let resolveFn: ((user: CreateQuotationItem) => void) | null = null
    function action() {
        if (!resolveFn) return
        loading.value = true
        resolveFn(quotationItem.value)
    }
    function defaultQuotationItem(): CreateQuotationItem {
        return {
            id: undefined,
            category: undefined,
            options: undefined,
            plate: undefined,
            gram: undefined,
            color: undefined,
            page: undefined,
            pattern: undefined,
            hasReference: false,
            quantity: undefined,
            price: undefined,
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
        setItemAndOpen(item: CreateQuotationItem) {
            loading.value = false
            quotationItem.value = item
            dialogOpen.value = true
            return new Promise<CreateQuotationItem>((resolve) => {
                resolveFn = resolve
            })
        },
        closeDialog: () => {
            dialogOpen.value = false
        },
        closeLoading: () => {
            loading.value = false
        },
    }
}
