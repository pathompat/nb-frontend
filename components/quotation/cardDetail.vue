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
                <v-btn
                    v-if="props.id"
                    variant="flat"
                    color="success"
                    :to="`/quotation/document/${props.id}`"
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
                                <v-text-field
                                    label="User"
                                    disabled
                                    v-model="quotation.id"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="ร้าน *"
                                    disabled
                                    v-model="quotation.shop"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-select
                                    label="โรงเรียน *"
                                    disabled
                                    v-model="quotation.school"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-date-input
                                    disabled
                                    label="Select a date"
                                ></v-date-input>
                            </v-col>
                            <v-col cols="3">
                                <v-date-input
                                    disabled
                                    label="Select a date"
                                ></v-date-input
                            ></v-col>
                            <v-col cols="3">
                                <v-select
                                    label="ที่อยู่ *"
                                    disabled
                                    v-model="quotation.address"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    label="เบอร์ติดต่อ *"
                                    disabled
                                    v-model="quotation.phone"
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
                            :items="quotation.items"
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
                                                                l.value ===
                                                                item.line
                                                        )?.title
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
                                    quotation.items.reduce(
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
                            v-model="quotation.remark"
                        ></v-textarea>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
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
                        v-if="!props.id"
                        @click="reset"
                        color="warning"
                        >รีเซ็ต</v-btn
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
</template>
<script setup lang="ts">
import { PLATE, LINE, PRINTSTATUS } from '@/models/enum/enum'
import type { SaveRow } from '~/models/share/share'
import { useQuotationStore } from '@/stores/quotation'
const { getQuotationById, createQuotation, quotation } = useQuotationStore()
const { plates, lines } = useShare()
const loading = ref(false)

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

const router = useRouter()
async function create() {
    const { id } = await createQuotation(quotation)
    router.push({
        path: `/quotation/${id}`,
    })
}
function addItem() {
    isSaved.value.push({
        index: quotation.items.length,
        isSaved: false,
    })
    quotation.items.push({
        plate: PLATE.BIG,
        gram: 0,
        color: 0,
        page: 0,
        line: LINE.SINGLE,
        hasPlan: false,
        amount: 0,
        price: 0,
        status: PRINTSTATUS.OUTBOUND,
    })
}
function deleteItem(index: number) {
    isSaved.value = isSaved.value.filter((i) => i.index !== index)
    quotation.items = quotation.items.filter((_, i) => i !== index)
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
    if (!props.id) return
    loading.value = true
    try {
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
