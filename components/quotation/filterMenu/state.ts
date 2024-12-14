import type {
    CreateQuotationItem,
    FilterQuotation,
} from '~/models/quotation/quotation'
export type FilterMenuQuotationState = ReturnType<
    typeof filterMenuQuotationState
>
export const filterMenuQuotationStateSymbol: InjectionKey<FilterMenuQuotationState> =
    Symbol('$FilterMenuQuotationState')
export default function filterMenuQuotationState() {
    const dialogMenu = ref(false)
    const filter = ref<FilterQuotation>({
        school: [],
        store: [],
        status: [],
    })
    const loading = ref(false)
    let callback: ((param: FilterQuotation) => void) | null = null
    function action() {
        if (callback) {
            callback(filter.value)
            callback = null
        }
        dialogMenu.value = false
    }

    return {
        dialogMenu,
        loading,
        filter,
        action,
        setCallback(fn: (param: FilterQuotation) => void) {
            callback = fn
        },
        closeDialog: () => {
            dialogMenu.value = false
        },
        closeLoading: () => {
            loading.value = false
        },
    }
}
