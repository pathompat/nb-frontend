<template>
    <main>
        <div class="d-flex justify-space-between mx-8">
            <h1>
                แบบฟอร์มเสนอราคา
                {{
                    props.id ? `#QT${props.id.toString().padStart(5, '0')}` : ''
                }}
            </h1>
            <div class="d-flex ga-2">
                <v-btn variant="flat" color="success" @click="download"
                    >ดาวน์โหลดเอกสาร</v-btn
                >
            </div>
        </div>
        <section class="pa-8">
            <v-card :loading="loading">
                <v-card-text
                    ><v-layout class="pt-4"
                        ><v-row>
                            <v-col cols="4">
                                <v-select
                                    item-title="username"
                                    item-value="id"
                                    label="User"
                                    :disabled="
                                        userProfile?.role != SYSTEM_ROLE.ADMIN
                                    "
                                    :model-value="quotationForm.userId"
                                    @update:model-value="updateCustomerSelect"
                                    :items="users"
                                ></v-select>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="ร้าน *"
                                    disabled
                                    :model-value="storeSelect"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-autocomplete
                                    label="โรงเรียน *"
                                    :loading="loadingSchool"
                                    item-title="name"
                                    :items="schools"
                                    :disabled="quotationForm.userId === ''"
                                    v-model="quotationForm.schoolId"
                                >
                                    <template v-slot:prepend-item>
                                        <v-list-item @click="createNewSchool">
                                            <template v-slot:prepend>
                                                <v-icon>mdi-plus </v-icon>
                                            </template>

                                            <v-list-item-title>
                                                เพิ่มโรงเรียนใหม่
                                            </v-list-item-title>
                                        </v-list-item>
                                        <v-divider class="mt-2"></v-divider>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="2">
                                <div>
                                    <!-- <v-switch
                                        v-model="isCustomDate"
                                        size="small"
                                        label="กำหนดส่ง"
                                    ></v-switch> -->
                                    <v-radio-group
                                        inline
                                        :model-value="isCustomDate"
                                        @update:model-value="updateCustomDate"
                                    >
                                        <v-radio
                                            label="ส่งทันที"
                                            :value="false"
                                        ></v-radio>
                                        <v-radio
                                            label="กำหนดส่ง"
                                            :value="true"
                                        ></v-radio>
                                    </v-radio-group>
                                </div>
                            </v-col>

                            <v-col cols="2">
                                <v-date-input
                                    v-if="isCustomDate"
                                    v-model="quotationForm.dueDateAt"
                                    label="วันที่ต้องส่ง"
                                ></v-date-input
                            ></v-col>
                            <v-col cols="2">
                                <v-date-input
                                    v-model="quotationForm.appointmentAt"
                                    label="วันที่พร้อมรับสินค้า"
                                ></v-date-input>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    label="ที่อยู่ *"
                                    disabled
                                    :model-value="schoolSelect?.address"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    label="เบอร์ติดต่อ *"
                                    disabled
                                    :model-value="schoolSelect?.telephone"
                                ></v-select>
                            </v-col> </v-row
                    ></v-layout>
                    <div class="mt-4">
                        <div class="d-flex justify-space-between align-center">
                            <h2>รายการสินค้า</h2>
                            <v-btn
                                variant="text"
                                @click="addItem"
                                icon
                                color="primary"
                            >
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-data-table
                            class="my-4"
                            hideDefaultFooter
                            :items="quotationForm.items"
                            :headers="headerItems"
                        >
                            <template #body="{ items }">
                                <tr v-if="items.length === 0">
                                    <td :colspan="11" class="text-center">
                                        ไม่มีรายการ
                                    </td>
                                </tr>
                                <tr v-for="(item, index) in items" :key="index">
                                    <UtilsReturnDataSlot
                                        :data="
                                            isSaved.find(
                                                (i) => i.index === index
                                            )?.isSaved
                                        "
                                    >
                                        <template #default="{ data }">
                                            <td>{{ index + 1 }}</td>
                                            <td>
                                                <div v-if="!data && !props.id">
                                                    <v-select
                                                        v-model="item.plate"
                                                    ></v-select>
                                                </div>
                                                <div v-else>
                                                    {{
                                                        plates.find(
                                                            (p) =>
                                                                p.value ===
                                                                item.plate
                                                        )?.title
                                                    }}
                                                </div>
                                            </td>
                                            <td>
                                                <div v-if="!data && !props.id">
                                                    <v-select
                                                        v-model="item.gram"
                                                    ></v-select>
                                                </div>
                                                <div v-else>
                                                    {{ item.gram }}
                                                </div>
                                            </td>
                                            <td>
                                                <div v-if="!data && !props.id">
                                                    <v-select
                                                        v-model="item.color"
                                                    ></v-select>
                                                </div>
                                                <div v-else>
                                                    {{ item.color }}
                                                </div>
                                            </td>
                                            <td>
                                                <div v-if="!data && !props.id">
                                                    <v-select
                                                        v-model="item.page"
                                                    ></v-select>
                                                </div>
                                                <div v-else>
                                                    {{ item.page }}
                                                </div>
                                            </td>
                                            <td>
                                                <div v-if="!data && !props.id">
                                                    <v-select
                                                        v-model="item.line"
                                                    ></v-select>
                                                </div>
                                                <div v-else>
                                                    {{
                                                        lines.find(
                                                            (l) =>
                                                                l == item.line
                                                        )
                                                    }}
                                                </div>
                                            </td>
                                            <td>
                                                <v-checkbox
                                                    v-model="item.hasPlan"
                                                ></v-checkbox>
                                            </td>
                                            <td>
                                                <div v-if="!data && !props.id">
                                                    <v-text-field
                                                        type="number"
                                                        label="จำนวน"
                                                        v-model="item.amount"
                                                    ></v-text-field>
                                                </div>
                                                <div v-else>
                                                    {{ item.amount }}
                                                </div>
                                            </td>
                                            <td>
                                                <div v-if="!data && !props.id">
                                                    <v-text-field
                                                        type="number"
                                                        label="ราคา"
                                                        v-model="item.price"
                                                    ></v-text-field>
                                                </div>
                                                <div v-else>
                                                    {{ item.price }}
                                                </div>
                                            </td>
                                            <td>
                                                {{ item.price * item.amount }}
                                            </td>
                                            <td>
                                                <div v-if="!data && !props.id">
                                                    <v-icon
                                                        @click="saveItem(index)"
                                                        color="black"
                                                        class="rounded-circle cursor-pointer"
                                                        style="
                                                            padding: 18px;
                                                            background-color: #2e7d324d;
                                                        "
                                                        >mdi-check-circle-outline</v-icon
                                                    >
                                                </div>
                                                <v-btn
                                                    v-else
                                                    variant="text"
                                                    icon
                                                    color="error"
                                                    @click="deleteItem(index)"
                                                >
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </td>
                                        </template>
                                    </UtilsReturnDataSlot>
                                </tr>
                            </template>
                        </v-data-table>
                        <div
                            class="d-flex justify-end align-center ga-16 text-h6"
                        >
                            <p>รวม :</p>
                            <p>
                                {{
                                    quotationForm.items.reduce(
                                        (sum, item) =>
                                            sum + item.price * item.amount,
                                        0
                                    )
                                }}
                            </p>
                        </div>
                        <v-divider class="my-4"></v-divider>
                        <v-textarea
                            label="หมายเหตุ"
                            v-model="quotationForm.remark"
                        ></v-textarea>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn variant="flat" to="/"> หน้าแรก </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        variant="flat"
                        v-if="!props.id"
                        @click="reset"
                        color="warning"
                        >รีเซ็ต</v-btn
                    >
                    <v-btn
                        variant="flat"
                        v-if="!props.id"
                        @click="create"
                        color="success"
                        >บันทึก</v-btn
                    >
                    <v-btn
                        variant="flat"
                        v-if="props.id"
                        @click="approve"
                        color="success"
                        >อนุมัติ</v-btn
                    >

                    <v-btn
                        variant="flat"
                        v-if="props.id"
                        @click="cancel"
                        color="error"
                        >ยกเลิก</v-btn
                    >
                </v-card-actions>
            </v-card>
        </section>
    </main>
    <SchoolDialogSchool></SchoolDialogSchool>
</template>
<script setup lang="ts">
import { PLATE, LINE, PRINTSTATUS } from '@/models/enum/enum'
import type { SaveRow } from '~/models/share/share'
import { useQuotationStore } from '@/stores/quotation'
import { SYSTEM_ROLE } from '~/models/object/object'
import { quotationPdf } from '~/pdfForm/quotationForm'
import dialogSchoolState, {
    dialogSchoolStateSymbol,
} from '@/components/school/dialog/state'
import { toastPluginSymbol } from '~/plugins/toast'
import { useSchoolStore } from '~/stores/school'
import type { QuotationForm } from '~/models/quotation/quotation'
const stateDialogCreateNewSchool = dialogSchoolState()
provide(dialogSchoolStateSymbol, stateDialogCreateNewSchool)
const pdf = quotationPdf()
const { getQuotationById, createQuotation } = useQuotationStore()
const quotationForm = ref<QuotationForm>({
    userId: '',
    schoolId: '',
    appointmentAt: null,
    dueDateAt: null,
    items: [],
    remark: '',
})
const { plates, lines } = useShare()
const loading = ref(false)
const userStore = useUserStore()
const schoolStore = useSchoolStore()
const { users } = storeToRefs(userStore)
const { schools } = storeToRefs(schoolStore)
const { userProfile } = useAuthStore()
const isCustomDate = ref(false)
const headerItems = ref([
    { title: 'ลำดับ', key: 'id' },
    { title: 'เพลท', key: 'plate' },
    { title: 'แกรม', key: 'gram' },
    { title: 'สี', key: 'color' },
    { title: 'แผ่น', key: 'page' },
    { title: 'เส้น', key: 'line' },
    { title: 'มีแบบ', key: 'hasPlan' },
    { title: 'จำนวน', key: 'amount' },
    { title: 'ราคา', key: 'price' },
    { title: 'รวม', key: 'sum' },
    { title: 'ลบ', key: 'action' },
])
const isSaved = ref<SaveRow[]>([])
const toast = inject(toastPluginSymbol)!
const router = useRouter()
const loadingSchool = ref(false)
const storeSelect = computed(() => {
    return users.value.find((user) => user.id === quotationForm.value.userId)
        ?.storeName
})
const schoolSelect = computed(() => {
    return schools.value.find(
        (school) => school.name === quotationForm.value.schoolId
    )
})
const updateCustomDate = (value: boolean | null) => {
    isCustomDate.value = value!
    if (!value) quotationForm.value.dueDateAt = null
}
const updateCustomerSelect = async (value: string) => {
    quotationForm.value.userId = value
    await getSchools()
    quotationForm.value.schoolId = ''
}
async function getSchools() {
    loadingSchool.value = true
    try {
        await schoolStore.fetchAllSchoolsWithCustomer(
            quotationForm.value.userId
        )
    } catch (e) {
        toast.error(`${e}`)
    }
    loadingSchool.value = false
}
async function create() {
    try {
        const { id } = await createQuotation({
            ...quotationForm.value,
            appointmentAt: new Date(quotationForm.value.appointmentAt!),

            dueDateAt: new Date(quotationForm.value.dueDateAt!),
        })
        toast.success('บันทึกสำเร็จ')
        router.push({
            path: `/quotation/${id}`,
        })
    } catch (ex) {
        toast.error(`${ex}`)
    }
}
async function createNewSchool() {
    try {
        const newSchool = await stateDialogCreateNewSchool.openDialog()
        console.log(newSchool)
        await schoolStore.createSchool(quotationForm.value.userId, newSchool)
        stateDialogCreateNewSchool.closeDialog()
        toast.success('เพิ่มโรงเรียนสำเร็จ')
        await getSchools()
    } catch (e) {
        toast.error(`${e}`)
    }
    stateDialogCreateNewSchool.closeLoading()
}
function addItem() {
    isSaved.value.push({
        index: quotationForm.value.items.length,
        isSaved: false,
    })
    quotationForm.value.items.push({
        plate: PLATE.BIG,
        gram: 0,
        color: 0,
        page: 0,
        line: '',
        hasPlan: false,
        amount: 0,
        price: 0,
        status: PRINTSTATUS.OUTBOUND,
    })
}
async function download() {
    await pdf.download()
}
function deleteItem(index: number) {
    isSaved.value = isSaved.value.filter((i) => i.index !== index)
    quotationForm.value.items = quotationForm.value.items.filter(
        (_, i) => i !== index
    )
}
function saveItem(index: number) {
    const item = isSaved.value.find((i) => i.index === index)
    if (item) item.isSaved = true
}
async function approve() {
    // const { id } = await quotationApi.approve(props.id);
    router.push(`/production/${props.id}`)
    // await productApi.approve(props.id);
}
async function reset() {}
async function cancel() {}
onMounted(async () => {
    if (userProfile?.role !== SYSTEM_ROLE.ADMIN) {
        quotationForm.value.userId = userProfile!.id
        getSchools()
    }

    loading.value = true
    try {
        await userStore.fetchAllUsers()
        if (!props.id) return
        await getQuotationById(props.id)
    } catch (error) {
    } finally {
        loading.value = false
    }
})
const props = defineProps<{
    id?: number
}>()
</script>
