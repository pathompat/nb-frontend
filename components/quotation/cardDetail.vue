<template>
    <main>
        <div class="d-flex justify-end">
            <div class="d-flex ga-2">
                <v-btn
                    data-testid="quotation-download-button"
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
                                        v-if="
                                            !quotationForm.userId ||
                                            quotationForm.status == undefined
                                        "
                                        data-testid="quotation-user-field"
                                        item-title="username"
                                        item-value="id"
                                        label="User"
                                        :rules="emtpyRule"
                                        :hide-details="false"
                                        :disabled="
                                            userProfile?.role !=
                                                SYSTEM_ROLE.ADMIN ||
                                            props.id != undefined
                                        "
                                        :model-value="quotationForm.userId"
                                        @update:model-value="
                                            updateCustomerSelect
                                        "
                                        :items="users"
                                    ></v-select>
                                    <v-text-field
                                        v-else
                                        disabled
                                        label="User"
                                        :model-value="quotationForm.userName"
                                    >
                                    </v-text-field>
                                </v-col>

                                <v-col cols="4">
                                    <v-text-field
                                        data-testid="quotation-store-field"
                                        label="ร้าน *"
                                        disabled
                                        :model-value="storeSelect"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-autocomplete
                                        data-testid="quotation-school-field"
                                        label="โรงเรียน *"
                                        :loading="loadingSchool"
                                        item-title="name"
                                        item-value="id"
                                        :items="schools"
                                        :rules="emtpyRule"
                                        :hide-details="false"
                                        :disabled="
                                            quotationForm.userId === '' ||
                                            props.id != undefined
                                        "
                                        @update:model-value="
                                            updateCustomerSelectSchool
                                        "
                                        :model-value="
                                            !quotationForm.schoolId
                                                ? quotationForm.schoolName
                                                : quotationForm.schoolId
                                        "
                                    >
                                        <template v-slot:prepend-item>
                                            <v-list-item
                                                data-testid="quotation-add-new-school"
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
                                        <v-radio-group
                                            data-testid="quotation-appointment-radio-group"
                                            inline
                                            :disabled="props.id != undefined"
                                            :model-value="isCustomDate"
                                            @update:model-value="
                                                updateCustomDate
                                            "
                                        >
                                            <v-radio
                                                data-testid="quotation-appointment-now-radio"
                                                label="ส่งทันที"
                                                :value="false"
                                            ></v-radio>
                                            <v-radio
                                                data-testid="quotation-appointment-custom-radio"
                                                label="กำหนดส่ง"
                                                :value="
                                                    true ||
                                                    quotationForm.appointmentAt !=
                                                        null
                                                "
                                            ></v-radio>
                                        </v-radio-group>
                                    </div>
                                </v-col>
                                <v-col cols="2">
                                    <v-date-input
                                        data-testid="quotation-appointment-date-field"
                                        :allowed-dates="disablePastDates"
                                        :rules="
                                            isCustomDate ? emtpyRule : [true]
                                        "
                                        :disabled="
                                            !isCustomDate ||
                                            props.id != undefined
                                        "
                                        :hide-details="false"
                                        v-model="quotationForm.appointmentAt"
                                        label="วันที่พร้อมรับสินค้า"
                                    ></v-date-input>
                                </v-col>
                                <v-col cols="2">
                                    <v-date-input
                                        :allowed-dates="disablePastDates"
                                        data-testid="quotation-due-date-field"
                                        :rules="emtpyRule"
                                        :hide-details="false"
                                        v-model="quotationForm.dueDateAt"
                                        label="deadline (เดทไลน์)"
                                        :disabled="props.id != undefined"
                                    ></v-date-input
                                ></v-col>

                                <v-col cols="2">
                                    <v-text-field
                                        data-testid="quotation-address-field"
                                        label="ที่อยู่"
                                        v-model="quotationForm.schoolAddress"
                                        :disabled="props.id != undefined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                        data-testid="quotation-telephone-field"
                                        label="เบอร์ติดต่อ"
                                        v-model="quotationForm.schoolTelephone"
                                        :hide-details="false"
                                        :disabled="props.id != undefined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                        data-testid="quotation-telephone-contact-name"
                                        label="ชื่อผู้ติดต่อ"
                                        v-model="
                                            quotationForm.schoolContactName
                                        "
                                        :hide-details="false"
                                        :disabled="props.id != undefined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-layout>
                        <div class="mt-4">
                            <div
                                class="d-flex justify-space-between align-center"
                            >
                                <h2>รายการสินค้า</h2>
                                <v-btn
                                    data-testid="quotation-add-item-button"
                                    variant="flat"
                                    :disabled="quotationForm.userId == ''"
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
                                            {{
                                                itemCategories.find(
                                                    (x) =>
                                                        x.value ==
                                                        item.categoryId
                                                )?.title || 'ไม่พบ'
                                            }}
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
                                                    )?.title || 'ไม่พบ'
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
                                                    )?.title || 'ไม่พบ'
                                                }}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {{ item.printedContent }}
                                            </div>
                                        </td>
                                        <td>
                                            <v-checkbox
                                                data-testid="quotation-reference-item-checkbox"
                                                :disabled="true"
                                                v-model="item.hasReference"
                                            ></v-checkbox>
                                        </td>
                                        <td>
                                            <div>
                                                {{
                                                    (item.configIds || [])
                                                        .map(
                                                            (h) =>
                                                                configItem?.configs.find(
                                                                    (x) =>
                                                                        x.id ==
                                                                        h
                                                                )?.label
                                                        )
                                                        .join(', ') || 'ไม่พบ'
                                                }}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {{ item.quantity }}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {{
                                                    parseFloat(
                                                        `${item.price!}`
                                                    ) +
                                                    parseFloat(
                                                        `${item.perUnitPrice}`
                                                    )
                                                }}
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                :style="`color:${
                                                    item.perUnitPrice == 0
                                                        ? 'black'
                                                        : item.perUnitPrice >= 0
                                                          ? 'green'
                                                          : 'red'
                                                }`"
                                            >
                                                {{
                                                    (item.perUnitPrice >= 0
                                                        ? '+'
                                                        : '') +
                                                    item.perUnitPrice
                                                }}
                                            </span>
                                        </td>
                                        <td>
                                            {{
                                                ceilToTwoDecimals(
                                                    parseFloat(
                                                        `${item.price! + item.perUnitPrice}`
                                                    ) *
                                                        parseInt(
                                                            `${item.quantity}`
                                                        )
                                                )
                                            }}
                                        </td>
                                        <td
                                            v-if="
                                                quotationForm.status !=
                                                    STATUS.APPROVED &&
                                                quotationForm.status !=
                                                    STATUS.CANCELED
                                            "
                                        >
                                            <v-btn
                                                data-testid="quotation-edit-item-button"
                                                variant="text"
                                                icon
                                                v-if="
                                                    !props.id ||
                                                    (userProfile?.role ===
                                                        SYSTEM_ROLE.ADMIN &&
                                                        quotationForm.status !=
                                                            STATUS.APPROVED &&
                                                        quotationForm.status !=
                                                            STATUS.CANCELED)
                                                "
                                                color="primary"
                                                @click="editItem(index)"
                                            >
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn
                                                data-testid="quotation-delete-item-button"
                                                variant="text"
                                                icon
                                                v-if="
                                                    !props.id &&
                                                    quotationForm.status !=
                                                        STATUS.APPROVED &&
                                                    quotationForm.status !=
                                                        STATUS.CANCELED
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
                            <div
                                v-for="group in configUsed
                                    .filter(
                                        (x) =>
                                            x.level !==
                                            CONFIG_TYPE.QUOTATION_ADDITIONAL_LIST_ITEMS
                                    )
                                    .reduce((acc: any, x) => {
                                        const existingItem = acc.find(
                                            (item: any) => item.key === x.key
                                        )
                                        if (existingItem) {
                                            existingItem.qty += 1
                                        } else {
                                            acc.push({
                                                ...x,
                                                qty: 1,
                                            })
                                        }
                                        return acc
                                    }, [])"
                            >
                                <v-divider class="my-4"></v-divider>
                                <div
                                    class="d-flex w-100 justify-end align-center text-h6"
                                >
                                    <div
                                        class="w-25 d-flex justify-space-between"
                                    >
                                        <div>{{ group.label }}</div>
                                        <div class="d-flex ga-4">
                                            <div>
                                                {{ group.fixedChargePrice }} x
                                                {{ group.qty }} =
                                            </div>
                                            <div>
                                                {{
                                                    ceilToTwoDecimals(
                                                        group.fixedChargePrice *
                                                            group.qty
                                                    )
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="userProfile?.role === SYSTEM_ROLE.ADMIN">
                                <v-divider class="my-4"></v-divider>
                                <div
                                    class="d-flex w-100 justify-end align-center text-h6"
                                >
                                    <div
                                        class="w-25 d-flex justify-space-between"
                                    >
                                        <p>ส่วนลดท้ายบิล:</p>
                                        <div>
                                            <v-text-field
                                                data-testid="quotation-discount-field"
                                                :disabled="
                                                    userProfile?.role !==
                                                        SYSTEM_ROLE.ADMIN ||
                                                    quotationForm.status ==
                                                        STATUS.APPROVED ||
                                                    quotationForm.status ==
                                                        STATUS.CANCELED
                                                "
                                                v-model="discount"
                                                type="number"
                                            ></v-text-field>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="userProfile?.role === SYSTEM_ROLE.ADMIN">
                                <v-divider class="my-4"></v-divider>
                                <div
                                    class="d-flex w-100 justify-end align-center text-h6"
                                >
                                    <div
                                        class="w-25 d-flex justify-space-between"
                                    >
                                        <p>ส่วนเพิ่มท้ายบิล:</p>
                                        <div>
                                            <v-text-field
                                                data-testid="quotation-discount-field"
                                                :disabled="
                                                    userProfile?.role !==
                                                        SYSTEM_ROLE.ADMIN ||
                                                    quotationForm.status ==
                                                        STATUS.APPROVED ||
                                                    quotationForm.status ==
                                                        STATUS.CANCELED
                                                "
                                                v-model="additionPrice"
                                                type="number"
                                            ></v-text-field>
                                        </div>
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
                                            ceilToTwoDecimals(
                                                total -
                                                    parseFloat(
                                                        `${discount || 0}`
                                                    ) +
                                                    parseFloat(
                                                        `${additionPrice || 0}`
                                                    )
                                            )
                                        }}
                                    </div>
                                </div>
                            </div>

                            <v-divider class="my-4"></v-divider>
                            <v-textarea
                                data-testid="quotation-remark-field"
                                :rules="noEmojiOrEscapeCharacterRule"
                                label="หมายเหตุ"
                                :hide-details="false"
                                :disabled="
                                    props.id != undefined ||
                                    quotationForm.status == STATUS.APPROVED ||
                                    quotationForm.status == STATUS.CANCELED
                                "
                                v-model="quotationForm.remark"
                            ></v-textarea>
                        </div>
                    </v-form>
                </v-card-text>
                <v-card-actions
                    v-if="
                        quotationForm.status != STATUS.APPROVED &&
                        quotationForm.status != STATUS.CANCELED
                    "
                >
                    <v-spacer></v-spacer>

                    <v-btn
                        variant="flat"
                        v-if="!props.id"
                        @click="create"
                        :disabled="!valid || quotationForm.items.length === 0"
                        color="success"
                        >บันทึก</v-btn
                    >

                    <v-btn
                        data-testid="quotation-cancle-button"
                        variant="flat"
                        v-if="
                            props.id && userProfile?.role === SYSTEM_ROLE.ADMIN
                        "
                        @click="cancel"
                        color="error"
                        >ยกเลิก</v-btn
                    >
                    <v-btn
                        variant="flat"
                        data-testid="quotation-approve-button"
                        v-if="
                            props.id && userProfile?.role === SYSTEM_ROLE.ADMIN
                        "
                        @click="approve"
                        color="success"
                        >อนุมัติ</v-btn
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
import { CONFIG_TYPE, STATUS, SYSTEM_ROLE } from '~/models/enum/enum'
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
    QuotationConfig,
    QuotationForm,
    QuotationItem,
} from '~/models/quotation/quotation'
import { usePriceStore } from '~/stores/prices'
const stateDialogCreateNewSchool = dialogSchoolState()
const statedialogItemQuotation = dialogItemQuotationState()

provide(dialogSchoolStateSymbol, stateDialogCreateNewSchool)
provide(dialogItemQuotationStateSymbol, statedialogItemQuotation)

const valid = ref(false)
const quotationStore = useQuotationStore()
const { getQuotationById, createQuotation } = quotationStore
const { quotation, configs, configBill, configItem, configPromotion } =
    storeToRefs(quotationStore)

const quotationForm = ref<QuotationForm>({
    userId: '',
    schoolId: '',
    schoolAddress: '',
    schoolTelephone: '',
    appointmentAt: null,
    schoolContactName: '',
    dueDateAt: null,
    items: [],
    userName: '',
    schoolName: '',
    remark: '',
})
const discount = ref(0)
const additionPrice = ref(0)

const { plates, lines, ceilToTwoDecimals } = useShare()
const loading = ref(false)
const userStore = useUserStore()
const schoolStore = useSchoolStore()
const priceStore = usePriceStore()
const total = ref(0)
const { emtpyRule, noEmojiOrEscapeCharacterRule } = useRules()
const { users } = storeToRefs(userStore)
const { schools } = storeToRefs(schoolStore)
const { prices } = storeToRefs(priceStore)
const configUsed = ref<QuotationConfig[]>([])
const { handlerRowItemsPriceRef, calculateWithConfigs } =
    useCalculatorQuotationItem()
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
        { title: 'เนื้อพิมพ์', key: 'printedContent' },

        { title: 'มีแบบ', key: 'hasPlan' },
        { title: 'เพิ่มเติม', key: 'options' },

        { title: 'จำนวน', key: 'amount' },
        { title: 'ราคา', key: 'price' },
        { title: '+/- ต่อตัว', key: 'perUnitPrice' },

        { title: 'รวม', key: 'sum' },
        { title: 'ดำเนินการ', key: 'action' },
    ]
    return headers.filter(
        (header) =>
            !(
                header.key == 'plate' && userProfile?.role !== SYSTEM_ROLE.ADMIN
            ) &&
            !(
                header.key == 'action' &&
                (quotationForm.value.status == STATUS.APPROVED ||
                    quotationForm.value.status == STATUS.CANCELED)
            )
    )
})
const toast = inject(toastPluginSymbol)!
const router = useRouter()
const loadingSchool = ref(false)
const storeSelect = computed(() => {
    return users.value.find((user) => user.id === quotationForm.value.userId)
        ?.storeName
})
const itemCategories = computed(() => {
    return prices.value.map((x) => {
        return {
            title: x.categoryName,
            value: x.categoryId,
        }
    })
})

function updateCustomerSelectSchool(value: string) {
    quotationForm.value.schoolId = value
    if (quotationForm.value.status != undefined) return
    const school = schools.value.find((school) => school.id === value)!
    quotationForm.value.schoolAddress = school?.address!
    quotationForm.value.schoolName = school?.name
    quotationForm.value.schoolTelephone = school?.telephone!
    quotationForm.value.schoolContactName = school?.contactName!
}
function disablePastDates(date: unknown) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selectedDate = new Date(date as string)
    return selectedDate >= today
}
const updateCustomDate = (value: boolean | null) => {
    isCustomDate.value = value!
    if (!value) quotationForm.value.appointmentAt = null
}
const updateCustomerSelect = async (value: string) => {
    quotationForm.value.userId = value
    await quotationStore.getConfig(quotationForm.value.userId)
    await Promise.all([
        priceStore.fetchAllPricesWithCustomer(quotationForm.value.userId),
        getSchools(),
    ])
    updateCustomerSelectSchool('')
}
watch(
    () => prices.value,
    async (newValue) => {
        handlerRowItemsPriceRef(quotationForm.value.items, prices.value)
    }
)

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
                quantity: +item.quantity!,
                price: +item.price!,
                status: '',
                configIds: item.configIds,
                categoryId: item.categoryId,
                printedContent: item.printedContent,
            }
        })
        const { id } = await createQuotation({
            ...quotationForm.value,
            items: items.map<QuotationItem>((x) => {
                return {
                    categoryId: x.categoryId!,
                    color: x.color!,
                    gram: x.gram!,
                    hasReference: x.hasReference!,
                    configIds: x.configIds || [],
                    page: x.page!,
                    pattern: x.pattern!,
                    plate: x.plate!,
                    status: '',
                    quantity: +x.quantity!,
                    price: +x.price!,
                    printedContent: x.printedContent,
                }
            }),
            schoolTelephone: quotationForm.value.schoolTelephone.trim(),
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
        await schoolStore.createSchool(quotationForm.value.userId, newSchool)
        stateDialogCreateNewSchool.closeDialog()
        toast.success('เพิ่มโรงเรียนสำเร็จ')
        await getSchools()
    } catch (e) {
        toast.error(`${e}`)
    }
    stateDialogCreateNewSchool.closeLoading()
}
function calculateAllItem() {
    configUsed.value = []
    const level = CONFIG_TYPE.QUOTATION_ITEMS
    const resultItem = calculateWithConfigs
        .find((x) => x.level == level)
        ?.calculate(quotationForm.value.items, configItem.value.configs || [])
    if (!resultItem) return
    console.log('s')
    configUsed.value.push(...resultItem.configs)
    quotationForm.value.items = resultItem.listItem!
    const resultPromotion = calculateWithConfigs
        .find((x) => x.level == CONFIG_TYPE.QUOTATION_ADDITIONAL_LIST_ITEMS)!
        .calculate(
            quotationForm.value.items,
            configPromotion.value.configs,
            configUsed.value
        )
    quotationForm.value.items = resultPromotion.listItem
    const resultBill = calculateWithConfigs
        .find((x) => x.level == CONFIG_TYPE.QUOTATION_ADDITIONAL_LISTS)!
        .calculate(
            quotationForm.value.items,
            configBill.value.configs,
            configUsed.value,
            quotationForm.value.items!.reduce(
                (sum, item) =>
                    sum + (item.price! + item.perUnitPrice) * item.quantity!,
                0
            )
        )
    configUsed.value.push(...resultBill.configs)
    quotationForm.value.items = resultBill.listItem
    total.value = ceilToTwoDecimals(resultBill.total)
}
async function addItem() {
    try {
        const { item } = await statedialogItemQuotation.openDialog()
        item.id = undefined
        statedialogItemQuotation.closeDialog()
        quotationForm.value.items.push(item)
        calculateAllItem()
    } catch (e) {
        toast.error(`${e}`)
    }
}
async function editItem(index: number) {
    try {
        const resultEdit = await statedialogItemQuotation.setItemAndOpen(
            JSON.parse(JSON.stringify(quotationForm.value.items[index]))
        )
        statedialogItemQuotation.closeDialog()
        if (resultEdit) {
            const editItem = resultEdit.item

            quotationForm.value.items[index] = editItem
            calculateAllItem()
            if (editItem.id == undefined) {
                return
            }
            await quotationStore.updateQuotationItem(
                `${quotation.value.id}`,
                editItem.id!,
                {
                    ...editItem,
                    price: +`${editItem.price}`,
                }
            )

            toast.success(`แก้ไขสำเร็จ`)
            return
        }
        throw new Error('ไม่สามารถแก้ไขได้')
    } catch (e) {
        toast.error(`${e}`)
    }
}
function deleteItem(index: number) {
    quotationForm.value.items = quotationForm.value.items.filter(
        (_, i) => i !== index
    )
    calculateAllItem()
}

async function approve() {
    try {
        const { productionId } = await quotationStore.updateQuotation(
            `${quotation.value.id!}`,
            {
                ...quotation.value,
                status: STATUS.APPROVED,
            }
        )
        toast.success('อนุมัติสำเร็จ')
        router.push(`/production/${productionId}`)
    } catch (e) {
        toast.error(`${e}`)
    }
}
async function cancel() {
    try {
        await quotationStore.updateQuotation(`${quotation.value.id!}`, {
            ...quotation.value,
            status: STATUS.CANCELED,
        })
        router.push({ path: '/' })
        toast.success('ยกเลิกสำเร็จ')
    } catch (e) {
        toast.error(`${e}`)
    }
}
onMounted(async () => {
    await userStore.fetchAllUsers()

    if (userProfile?.role !== SYSTEM_ROLE.ADMIN && props.id == undefined) {
        await updateCustomerSelect(userProfile!.id)
    }
    loading.value = true
    try {
        if (!props.id) return
        await getQuotationById(props.id)
        quotationForm.value = {
            userId: quotation.value.userId,
            schoolId: quotation.value.schoolId,
            remark: quotation.value.remark,
            items: quotation.value.items.map((x) => {
                return {
                    id: `${x.id}`,
                    categoryId: x.categoryId,
                    color: x.color,
                    gram: x.gram,
                    hasReference: x.hasReference,
                    configIds: x.configIds,
                    page: x.page,
                    pattern: x.pattern,
                    plate: x.plate,
                    price: x.price!,
                    quantity: x.quantity!,
                    printedContent: x.printedContent,
                    perUnitPrice: 0,
                }
            }),
            userName: quotation.value.userName,
            status: quotation.value.status,
            schoolAddress: quotation.value.schoolAddress,
            schoolTelephone: quotation.value.schoolTelephone,
            schoolName: quotation.value.schoolName,
            schoolContactName: quotation.value.schoolContactName,
            appointmentAt: quotation.value.appointmentAt
                ? new Date(quotation.value.appointmentAt)
                : null,
            dueDateAt: new Date(quotation.value.dueDateAt!),
        }
        await getSchools()
        if (
            userProfile!.role !== SYSTEM_ROLE.ADMIN &&
            userProfile!.id !== quotationForm.value.userId
        ) {
            router.push('/')
            return
        }
        await priceStore.fetchAllPricesWithCustomer(quotationForm.value.userId)
        await quotationStore.getConfig(quotationForm.value.userId)
        calculateAllItem()
        emit('status', quotationForm.value.status!)
    } catch (error) {
        toast.error(`${error}`)
    } finally {
        loading.value = false
    }
})
const props = defineProps<{
    id?: string
}>()
const emit = defineEmits<{
    (e: 'status', status: string): void
}>()
</script>
