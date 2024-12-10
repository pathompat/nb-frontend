<template>
    <main>
        <div class="d-flex justify-space-between" v-if="false">
            <div class="d-flex ga-2">
                <v-btn
                    variant="flat"
                    v-if="props.id"
                    color="success"
                    :to="`/quotation/document/${props.id}`"
                    >ดาวน์โหลดเอกสาร</v-btn
                >
            </div>
        </div>
        <section class="py-8">
            <v-card :loading="loading">
                <v-card-text>
                    <v-form v-model="valid">
                        <v-layout class="pt-4"
                            ><v-row>
                                <v-col cols="4">
                                    <v-select
                                        item-title="username"
                                        item-value="id"
                                        label="User"
                                        :rules="emtpyRule"
                                        :hide-details="false"
                                        :disabled="
                                            userProfile?.role !=
                                            SYSTEM_ROLE.ADMIN
                                        "
                                        :model-value="quotationForm.userId"
                                        @update:model-value="
                                            updateCustomerSelect
                                        "
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
                                        item-value="id"
                                        :items="schools"
                                        :rules="emtpyRule"
                                        :hide-details="false"
                                        :disabled="quotationForm.userId === ''"
                                        v-model="quotationForm.schoolId"
                                    >
                                        <template v-slot:prepend-item>
                                            <v-list-item
                                                @click="createNewSchool"
                                            >
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
                                            @update:model-value="
                                                updateCustomDate
                                            "
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
                                        :rules="
                                            isCustomDate ? emtpyRule : [true]
                                        "
                                        :hide-details="false"
                                        :disabled="!isCustomDate"
                                        v-model="quotationForm.appointmentAt"
                                        label="วันที่ต้องส่ง"
                                    ></v-date-input
                                ></v-col>
                                <v-col cols="2">
                                    <v-date-input
                                        :rules="emtpyRule"
                                        :hide-details="false"
                                        v-model="quotationForm.dueDateAt"
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
                            <div
                                class="d-flex justify-space-between align-center"
                            >
                                <h2>รายการสินค้า</h2>
                                <v-btn
                                    variant="flat"
                                    @click="addItem"
                                    color="primary"
                                    v-if="!props.id"
                                >
                                    เพิ่มรายการสินค้าใหม่
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
                                        <td :colspan="13" class="text-center">
                                            ไม่มีรายการ
                                        </td>
                                    </tr>

                                    <tr
                                        v-for="(item, index) in items"
                                        :key="index"
                                    >
                                        <td>
                                            {{ index + 1 }}
                                        </td>
                                        <td>
                                            {{ item.category }}
                                        </td>
                                        <td
                                            v-if="
                                                userProfile?.role ===
                                                SYSTEM_ROLE.ADMIN
                                            "
                                        >
                                            <div>
                                                {{
                                                    plates.find(
                                                        (p) =>
                                                            p.value ==
                                                            item.plate
                                                    )?.title
                                                }}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {{ item.gram }}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {{ item.color }}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {{ item.page }}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {{
                                                    lines.find(
                                                        (l) =>
                                                            l.value ==
                                                            item.pattern
                                                    )?.title
                                                }}
                                            </div>
                                        </td>
                                        <td>
                                            <v-checkbox
                                                :disabled="true"
                                                v-model="item.hasReference"
                                            ></v-checkbox>
                                        </td>
                                        <td>
                                            <div>
                                                {{ item.options }}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {{ item.quantity }}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {{ item.price }}
                                            </div>
                                        </td>
                                        <td>
                                            {{ item.price * item.quantity }}
                                        </td>
                                        <td>
                                            {{ item.price * item.quantity }}
                                        </td>
                                        <td>
                                            <v-btn
                                                variant="text"
                                                icon
                                                v-if="
                                                    !props.id ||
                                                    userProfile?.role ===
                                                        SYSTEM_ROLE.ADMIN
                                                "
                                                color="primary"
                                                @click="editItem(index)"
                                            >
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn
                                                variant="text"
                                                icon
                                                v-if="
                                                    !props.id ||
                                                    userProfile?.role ===
                                                        SYSTEM_ROLE.ADMIN
                                                "
                                                color="error"
                                                @click="deleteItem(index)"
                                            >
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                            <v-divider class="my-4"></v-divider>
                            <div
                                class="d-flex w-100 justify-end align-center text-h6"
                            >
                                <div class="w-25 d-flex justify-space-between">
                                    <div>เพลท สี ตัด 9 :</div>
                                    <div>
                                        {{
                                            quotationForm.items.reduce(
                                                (sum, item) =>
                                                    sum +
                                                    item.price * item.quantity,
                                                0
                                            )
                                        }}
                                    </div>
                                </div>
                            </div>
                            <v-divider class="my-4"></v-divider>
                            <div
                                class="d-flex w-100 justify-end align-center text-h6"
                            >
                                <div class="w-25 d-flex justify-space-between">
                                    <p>เพลท ขาวดำ ตัด 9 :</p>
                                    <div>
                                        {{
                                            quotationForm.items.reduce(
                                                (sum, item) =>
                                                    sum +
                                                    item.price * item.quantity,
                                                0
                                            )
                                        }}
                                    </div>
                                </div>
                            </div>

                            <v-divider class="my-4"></v-divider>
                            <div
                                class="d-flex w-100 justify-end align-center text-h6"
                            >
                                <div class="w-25 d-flex justify-space-between">
                                    <p>เพลท รายงาน:</p>
                                    <div>
                                        {{
                                            quotationForm.items.reduce(
                                                (sum, item) =>
                                                    sum +
                                                    item.price * item.quantity,
                                                0
                                            )
                                        }}
                                    </div>
                                </div>
                            </div>

                            <v-divider class="my-4"></v-divider>
                            <div
                                class="d-flex w-100 justify-end align-center text-h6"
                            >
                                <div class="w-25 d-flex justify-space-between">
                                    <p>ส่วนลดท้ายบิล:</p>
                                    <div>
                                        <v-text-field
                                            type="number"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </div>

                            <v-divider class="my-4"></v-divider>
                            <div
                                class="d-flex w-100 justify-end align-center text-h6"
                            >
                                <div class="w-25 d-flex justify-space-between">
                                    <p>รวม :</p>
                                    <div>
                                        {{
                                            quotationForm.items.reduce(
                                                (sum, item) =>
                                                    sum +
                                                    item.price * item.quantity,
                                                0
                                            )
                                        }}
                                    </div>
                                </div>
                            </div>

                            <v-divider class="my-4"></v-divider>
                            <v-textarea
                                :rules="noEmojiOrEscapeCharacterRule"
                                label="หมายเหตุ"
                                :hide-details="false"
                                v-model="quotationForm.remark"
                            ></v-textarea>
                        </div>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <!-- <v-btn variant="flat" to="/"> หน้าแรก </v-btn> -->
                    <v-spacer></v-spacer>
                    <!-- <v-btn
                        variant="flat"
                        v-if="!props.id"
                        @click="reset"
                        color="warning"
                        >รีเซ็ต</v-btn
                    > -->

                    <v-btn
                        variant="flat"
                        v-if="!props.id"
                        @click="create"
                        :disabled="!valid || quotationForm.items.length === 0"
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
    <QuotationDialogItemQuotation></QuotationDialogItemQuotation>
</template>
<script setup lang="ts">
import { useQuotationStore } from '@/stores/quotation'
import { SYSTEM_ROLE } from '~/models/object/object'
import dialogSchoolState, {
    dialogSchoolStateSymbol,
} from '@/components/school/dialog/state'

import dialogItemQuotationState, {
    dialogItemQuotationStateSymbol,
} from '@/components/quotation/dialog/state'

import { toastPluginSymbol } from '~/plugins/toast'
import { useSchoolStore } from '~/stores/school'
import type {
    CreateQuotationItem,
    QuotationForm,
} from '~/models/quotation/quotation'
import { usePriceStore } from '~/stores/prices'
const stateDialogCreateNewSchool = dialogSchoolState()
const statedialogItemQuotation = dialogItemQuotationState()

provide(dialogSchoolStateSymbol, stateDialogCreateNewSchool)
provide(dialogItemQuotationStateSymbol, statedialogItemQuotation)

const valid = ref(false)
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
const priceStore = usePriceStore()
const { emtpyRule, noEmojiOrEscapeCharacterRule } = useRules()
const { users } = storeToRefs(userStore)
const { schools } = storeToRefs(schoolStore)
const { prices } = storeToRefs(priceStore)

const { userProfile } = useAuthStore()
const isCustomDate = ref(false)
const headerItems = computed(() => {
    const headers = [
        { title: 'ลำดับ', key: 'id' },
        { title: 'ประเภท', key: 'category' },
        { title: 'เพลท', key: 'plate' },

        { title: 'แกรม', key: 'gram' },
        { title: 'สี', key: 'color' },
        { title: 'แผ่น', key: 'page' },
        { title: 'เส้น', key: 'line' },
        { title: 'มีแบบ', key: 'hasPlan' },
        { title: 'เพิ่มเติม', key: 'options' },

        { title: 'จำนวน', key: 'amount' },
        { title: 'ราคา', key: 'price' },
        { title: '+/- ต่อตัว', key: 'priceUnit' },

        { title: 'รวม', key: 'sum' },
        { title: 'ดำเนินการ', key: 'action' },
    ]
    return headers.filter(
        (header) =>
            !(header.key == 'plate' && userProfile?.role !== SYSTEM_ROLE.ADMIN)
    )
})
const toast = inject(toastPluginSymbol)!
const router = useRouter()
const loadingSchool = ref(false)
const storeSelect = computed(() => {
    return users.value.find((user) => user.id === quotationForm.value.userId)
        ?.storeName
})
const schoolSelect = computed(() => {
    return schools.value.find(
        (school) => school.id === quotationForm.value.schoolId
    )
})
const updateCustomDate = (value: boolean | null) => {
    isCustomDate.value = value!
    if (!value) quotationForm.value.dueDateAt = null
}
const updateCustomerSelect = async (value: string) => {
    quotationForm.value.userId = value
    await Promise.all([
        priceStore.fetchAllPricesWithCustomer(quotationForm.value.userId),
        getSchools(),
    ])
    quotationForm.value.schoolId = ''
}
let oldItems = JSON.parse(JSON.stringify(quotationForm.value.items))
watch(
    quotationForm.value.items,
    (newValue) => {
        handlerPriceRef(newValue)
    },
    { deep: true }
)
watch(
    () => prices.value,
    async (newValue) => {
        handlerPriceRef(quotationForm.value.items)
    }
)
function handlerPriceRef(newValue: CreateQuotationItem[]) {
    newValue.forEach((item, index) => {
        if (
            !item.plate ||
            !item.gram ||
            !item.color ||
            !item.page ||
            !item.pattern
        ) {
            return
        }
        // if (item.quantity <= 0 || item.price <= 0) {
        //     item.isValid = false
        // } else {
        //     item.isValid = true
        // }
        const oldItem = oldItems[index]
        if (oldItem) {
            if (
                item.plate == oldItem.plate &&
                item.gram == oldItem.gram &&
                item.color == oldItem.color &&
                item.page == oldItem.page &&
                item.pattern == oldItem.line &&
                item.hasReference == oldItem.hasReference &&
                item.quantity == oldItem.quantity
            ) {
                return
            }
        }
        const priceRef = prices.value.find(
            (price) =>
                price.plate == item.plate &&
                price.gram == item.gram &&
                price.color == item.color &&
                price.page == item.page &&
                price.pattern == item.pattern &&
                price.hasReference == item.hasReference
        )
        if (!priceRef) {
            // item.price = 0
            return
        }
        item.price = priceRef.priceRef
    })
    oldItems = JSON.parse(JSON.stringify(newValue))
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
        const items = quotationForm.value.items.map((item) => {
            return {
                plate: item.plate,
                gram: item.gram,
                color: item.color,
                page: item.page,
                pattern: item.pattern,
                hasReference: item.hasReference,
                quantity: +item.quantity,
                price: +item.price,
                status: '',
                options: item.options,
                category: item.category,
            }
        })
        const { id } = await createQuotation({
            ...quotationForm.value,
            items,

            appointmentAt: quotationForm.value.appointmentAt
                ? new Date(quotationForm.value.appointmentAt)
                : null,

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
async function addItem() {
    try {
        const newItems = await statedialogItemQuotation.openDialog()
        statedialogItemQuotation.closeDialog()
        quotationForm.value.items.push(newItems)
    } catch (e) {
        toast.error(`${e}`)
    }
}
async function editItem(index: number) {
    try {
        const editItem = await statedialogItemQuotation.setItemAndOpen(
            JSON.parse(JSON.stringify(quotationForm.value.items[index]))
        )
        statedialogItemQuotation.closeDialog()
        if (editItem) {
            quotationForm.value.items[index] = editItem
        }
    } catch (e) {
        toast.error(`${e}`)
    }
}
function deleteItem(index: number) {
    quotationForm.value.items = quotationForm.value.items
        .filter((_, i) => i !== index)
        .map((item, newIndex) => {
            return { ...item, index: newIndex }
        })
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
        // addItem()
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
