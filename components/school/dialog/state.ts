import type { CraeteSchool } from '~/models/school/school'
import { useSchoolStore } from '~/stores/school'
export type DialogSchoolState = ReturnType<typeof dialogSchoolState>
export const dialogSchoolStateSymbol: InjectionKey<DialogSchoolState> =
    Symbol('$dialogSchoolState')
export default function dialogSchoolState() {
    const { fetchSchoolById } = useSchoolStore()
    const tier = ref<[]>([])
    const dialogOpen = ref(false)
    const initFormEdit = ref<CraeteSchool>({
        address: '',
        name: '',
        telephone: '',
    })
    const loading = ref(false)
    const schoolId = ref<string>('')
    let resolveFn: ((user: CraeteSchool) => void) | null = null
    function action() {
        if (!resolveFn) return
        loading.value = true
        resolveFn(initFormEdit.value)
    }
    const openDialog = async (id?: string): Promise<CraeteSchool> => {
        schoolId.value = id || ''
        initFormEdit.value = {
            address: '',
            name: '',
            telephone: '',
        }
        loading.value = true
        dialogOpen.value = true
        tier.value = []
        if (schoolId.value) {
            await fetchSchoolById(schoolId.value)
        }
        loading.value = false

        return new Promise<CraeteSchool>((resolve) => {
            resolveFn = resolve
        })
    }
    return {
        dialogOpen,
        initFormEdit,
        loading,
        tier,
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
