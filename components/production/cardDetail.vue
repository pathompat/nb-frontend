<template>
    <main>
        <div class="d-flex justify-space-between mx-8">
            <v-spacer></v-spacer>
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
                                    v-model="production.storeName"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-select
                                    label="โรงเรียน *"
                                    disabled
                                    v-model="production.schoolName"
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
                                    v-model="production.schoolAddress"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    label="ที่อยู่ *"
                                    disabled
                                    v-model="production.schoolTelephone"
                                ></v-select>
                            </v-col> </v-row
                    ></v-layout>
                    <div class="mt-4">
                        <div class="d-flex justify-space-between align-center">
                            <h2>รายการสินค้า</h2>
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
                                <v-checkbox
                                    disabled
                                    v-model="item.hasReference"
                                ></v-checkbox>
                            </template>
                            <template #item.plate="{ item }">
                                {{
                                    plates.find((p) => p.value === item.plate)
                                        ?.title
                                }}
                            </template>
                            <template #item.line="{ item }">
                                {{
                                    lines.find((l) => l.value === item.pattern)
                                        ?.title
                                }}
                            </template>
                            <template #item.status="{ item }">
                                <v-chip
                                    density="compact"
                                    class="text-white"
                                    :style="{
                                        backgroundColor:
                                            itemStatuses.find(
                                                (s) => s.value === item.status
                                            )?.color || 'gray',
                                    }"
                                >
                                    {{ getStatusTitle(item.status) }}
                                </v-chip></template
                            >
                            <template #item.action="{ item }">
                                <utils-return-data-slot
                                    :data="
                                        getNextStatus(
                                            itemStatuses.find(
                                                (x) => x.value == item.status
                                            )?.value!
                                        )
                                    "
                                >
                                    <template #default="{ data }">
                                        <v-btn
                                            v-if="
                                                data != null &&
                                                userProfile?.role ===
                                                    SYSTEM_ROLE.ADMIN
                                            "
                                            size="small"
                                            variant="flat"
                                            @click="
                                                updateStatus(
                                                    `${production.id}`,
                                                    item,
                                                    data.value!
                                                )
                                            "
                                            :color="
                                                data == null
                                                    ? 'gray'
                                                    : itemStatuses.find(
                                                          (s) =>
                                                              s.value ===
                                                              data.value
                                                      )?.color || 'gray'
                                            "
                                        >
                                            {{
                                                getStatusTitle(data.value || '')
                                            }}
                                        </v-btn>
                                    </template>
                                </utils-return-data-slot>
                            </template>
                        </v-data-table>
                        <v-textarea
                            label="หมายเหตุ"
                            disabled
                            v-model="production.remark"
                        ></v-textarea>
                    </div>
                </v-card-text>
            </v-card>
        </section>
    </main>
</template>
<script setup lang="ts">
import {
    type Production,
    type ProductionItem,
} from '@/models/production/production'
import { useProductionStore } from '@/stores/production'
import { useShare } from '~/composables/useShare'
import { STATUS, SYSTEM_ROLE } from '~/models/enum/enum'
import { toastPluginSymbol } from '~/plugins/toast'
const { lines, plates, getStatusTitle, itemStatuses, getNextStatus } =
    useShare()
const authStore = useAuthStore()
const { userProfile } = storeToRefs(authStore)
const toast = inject(toastPluginSymbol)!
const { getProductionById, updateProductionItem } = useProductionStore()
const loading = ref(false)
function defaultForm(): Partial<Production> {
    return {
        schoolName: '',
        storeName: '',
        schoolTelephone: '',
        schoolAddress: '',
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
async function updateStatus(
    productionId: string,
    item: ProductionItem,
    status: STATUS
) {
    loading.value = true
    try {
        const oldStatus = item.status
        const res = await updateProductionItem(productionId, item.id!, {
            status: status,
        })
        item.status = res.status
        toast.success(
            `อัพเดทสถานะสำเร็จ จาก ${itemStatuses.value.find((x) => x.value == oldStatus)?.title} เป็น ${itemStatuses.value.find((x) => x.value == res.status)?.title}`
        )
    } catch (error) {
        toast.success(`อัพเดทสถานะไม่สำเร็จ ${error}`)
    }

    loading.value = false
}
onMounted(async () => {
    defaultForm()
    if (props.id) {
        loading.value = true
        try {
            production.value = await getProductionById(`${props.id}`)
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
