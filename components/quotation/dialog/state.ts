import { CONFIG_TYPE, type ITEM_CATEGORY } from '~/models/enum/enum'
import type {
    CreateQuotationItem,
    QuotationConfig,
} from '~/models/quotation/quotation'
import type { TemplateCategory } from '~/models/share/share'
export type DialogItemQuotationState = ReturnType<
    typeof dialogItemQuotationState
>
export const dialogItemQuotationStateSymbol: InjectionKey<DialogItemQuotationState> =
    Symbol('$DialogItemQuotationState')
export default function dialogItemQuotationState() {
    const dialogOpen = ref(false)
    const quotationItem = ref<CreateQuotationItem>(defaultQuotationItem())
    const loading = ref(false)
    const { calculateWithConfigs } = useCalculatorQuotationItem()
    const quotationStore = useQuotationStore()
    const { configItem } = storeToRefs(quotationStore)
    const templateSelect = ref<TemplateCategory | null>(null)
    interface ItemResolve {
        item: CreateQuotationItem
    }
    let resolveFn: ((result: ItemResolve) => void) | null = null
    function action() {
        if (!resolveFn) return
        loading.value = true
        resolveFn({
            item: quotationItem.value,
        })
    }
    function defaultQuotationItem(): CreateQuotationItem {
        return {
            id: undefined,
            categoryId: undefined,
            configIds: [],
            plate: undefined,
            gram: undefined,
            color: undefined,
            page: undefined,
            pattern: undefined,
            hasReference: false,
            quantity: undefined,
            price: undefined,
            perUnitPrice: 0,
        }
    }
    const openDialog = async (id?: string): Promise<ItemResolve> => {
        quotationItem.value = defaultQuotationItem()
        templateSelect.value = null
        loading.value = true
        dialogOpen.value = true
        loading.value = false
        return new Promise<ItemResolve>((resolve) => {
            resolveFn = resolve
        })
    }
    return {
        dialogOpen,
        quotationItem,
        loading,
        templateSelect,
        action,
        openDialog,
        setItemAndOpen(item: CreateQuotationItem) {
            loading.value = false
            quotationItem.value = item
            dialogOpen.value = true
            templateSelect.value = null
            return new Promise<ItemResolve>((resolve) => {
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
