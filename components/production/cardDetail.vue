<template>
    <main>
        <div class="d-flex justify-space-between mx-8">
            <h1>
                แบบฟอร์มสั่งผลิต
                {{
                    props.id ? `#PR${props.id.toString().padStart(5, '0')}` : ''
                }}
            </h1>
            <div class="d-flex ga-2">
                <v-btn
                    variant="flat"
                    color="success"
                    :to="`/quotation/document/${production.quotationId}`"
                    >ใบเสนอราคา</v-btn
                >
                <v-btn
                    variant="flat"
                    color="purple"
                    :to="`/production/document/${production.id}`"
                    >เอกสารสั่งผลิต</v-btn
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
                                    v-model="production.id"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="ร้าน *"
                                    disabled
                                    v-model="production.shop"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-select
                                    label="โรงเรียน *"
                                    disabled
                                    v-model="production.school"
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
                                    v-model="production.address"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    label="ที่อยู่ *"
                                    disabled
                                    v-model="production.phone"
                                ></v-select>
                            </v-col> </v-row
                    ></v-layout>
                    <div class="mt-4">
                        <div class="d-flex justify-space-between align-center">
                            <h2>รายการสินค้า</h2>
                            <v-btn variant="text" icon color="primary">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-data-table
                            class="my-4"
                            hideDefaultFooter
                            :items="production.items"
                            :headers="headers"
                        >
                            <template #item.id="{ index }">
                                {{ index + 1 }}
                            </template>
                            <template #item.hasPlan="{ item }">
                                <v-checkbox v-model="item.hasPlan"></v-checkbox>
                            </template>
                            <template #item.plate="{ item }">
                                {{
                                    plates.find((p) => p.value === item.plate)
                                        ?.title
                                }}
                            </template>
                            <template #item.line="{ item }">
                                {{
                                    lines.find((l) => l.value === item.line)
                                        ?.title
                                }}
                            </template>
                            <template #item.status="{ item }">
                                <v-chip
                                    density="compact"
                                    class="text-white"
                                    :style="{
                                        backgroundColor:
                                            statusColors.find(
                                                (s) => s.id === item.status
                                            )?.color || 'gray',
                                    }"
                                >
                                    {{ getStatusTitle(item.status) }}
                                </v-chip></template
                            >
                            <template #item.action="{ item }">
                                <v-btn
                                    size="small"
                                    variant="flat"
                                    :color="
                                        statusColors.find(
                                            (s) => s.id === item.status + 1
                                        )?.color || 'gray'
                                    "
                                >
                                    {{ getStatusTitle(item.status + 1) }}
                                </v-btn>
                            </template>
                        </v-data-table>
                        <v-textarea
                            label="หมายเหตุ"
                            v-model="production.remark"
                        ></v-textarea>
                    </div>
                </v-card-text>
            </v-card>
        </section>
    </main>
</template>
<script setup lang="ts">
import { type Production } from '@/models/production/production'
import { useProductionStore } from '@/stores/production'
import { useShare } from '~/composables/useShare'
const { lines, plates, getStatusTitle, statusColors } = useShare()
const { getProductionById } = useProductionStore()
const loading = ref(false)
const router = useRouter()
function defaultForm(): Partial<Production> {
    return {
        date: '',
        school: '',
        shop: '',
        phone: '',
        address: '',
        dueDate: '',
        estimateDate: '',
        items: [],
    }
}
const production = ref<Partial<Production>>(defaultForm())
const headers = ref([
    { title: 'ลำดับ', key: 'id' },
    { title: 'เพลท', key: 'plate' },
    { title: 'แกรม', key: 'gram' },
    { title: 'สี', key: 'color' },
    { title: 'แผ่น', key: 'page' },
    { title: 'เส้น', key: 'line' },
    { title: 'มีแบบ', key: 'hasPlan' },
    { title: 'จำนวน', key: 'amount' },
    { title: 'สถานะ', key: 'status' },
    { title: 'อัพเดท', key: 'action' },
])
onMounted(async () => {
    defaultForm()
    if (props.id) {
        loading.value = true
        try {
            production.value = await getProductionById(props.id)
        } catch (error) {
        } finally {
            loading.value = false
        }
    }
})
const props = defineProps<{
    id?: number
}>()
</script>
