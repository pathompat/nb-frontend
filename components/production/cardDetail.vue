<template>
    <main>
        <div class="d-flex justify-space-between mx-8">
            <v-spacer></v-spacer>
            <div class="d-flex ga-2">
                <v-btn
                    data-testid="quotation-document-download-button"
                    variant="flat"
                    color="success"
                    :to="`/quotation/document/${production.quotationId}`"
                    >ใบเสนอราคา</v-btn
                >
                <v-btn
                    data-testid="production-document-download-button"
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
                                <v-select
                                    data-testid="user-select"
                                    label="User"
                                    item-title="username"
                                    item-value="id"
                                    disabled
                                    :items="users"
                                    v-model="production.userId"
                                ></v-select>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    data-testid="store-name-field"
                                    label="ร้าน *"
                                    disabled
                                    v-model="production.storeName"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-select
                                    data-testid="school-select"
                                    label="โรงเรียน *"
                                    disabled
                                    v-model="production.schoolName"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-date-input
                                    data-testid="appointment-date-input"
                                    disabled
                                    :model-value="production.appointmentAt"
                                    label="วันที่พร้อมรับสินค้า"
                                ></v-date-input>
                            </v-col>
                            <v-col cols="3">
                                <v-date-input
                                    disabled
                                    data-testid="due-date-input"
                                    :model-value="production.dueDateAt"
                                    label="วันที่ต้องส่ง"
                                ></v-date-input
                            ></v-col>
                            <v-col cols="3">
                                <v-select
                                    data-testid="address-select"
                                    label="ที่อยู่ *"
                                    disabled
                                    v-model="production.schoolAddress"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    data-testid="telephone-select"
                                    label="เบอร์ติดต่อ *"
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
                                        ?.title || 'ไม่พบ'
                                }}
                            </template>
                            <template #item.line="{ item }">
                                {{
                                    lines.find((l) => l.value === item.pattern)
                                        ?.title || 'ไม่พบ'
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
                                <div class="d-flex ga-4 align-center">
                                    <utils-return-data-slot
                                        :data="
                                            getNextStatus(
                                                itemStatuses.find(
                                                    (x) =>
                                                        x.value == item.status
                                                )?.value!
                                            )
                                        "
                                    >
                                        <template #default="{ data }">
                                            <v-btn
                                                data-testid="update-status-production-button"
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
                                                    getStatusTitle(
                                                        data.value || ''
                                                    )
                                                }}
                                            </v-btn>
                                        </template>
                                    </utils-return-data-slot>
                                    <utils-return-data-slot
                                        :data="
                                            getPrevStatus(
                                                itemStatuses.find(
                                                    (x) =>
                                                        x.value == item.status
                                                )?.value!
                                            )
                                        "
                                    >
                                        <template #default="{ data }">
                                            <div
                                                class="d-flex ga-4 align-center"
                                            >
                                                <v-btn
                                                    v-if="
                                                        data != null &&
                                                        userProfile?.role ===
                                                            SYSTEM_ROLE.ADMIN
                                                    "
                                                    variant="text"
                                                    @click="
                                                        updateStatus(
                                                            `${production.id}`,
                                                            item,
                                                            data.value!
                                                        )
                                                    "
                                                >
                                                    <v-icon
                                                        >mdi-backup-restore</v-icon
                                                    >
                                                </v-btn>
                                            </div>
                                        </template>
                                    </utils-return-data-slot>
                                </div>
                            </template>
                        </v-data-table>
                        <v-textarea
                            data-testid="remark-textarea"
                            label="หมายเหตุ"
                            disabled
                            v-model="production.remark"
                        ></v-textarea>
                    </div>
                </v-card-text>
            </v-card>
        </section>
    </main>
    <utils-dialog-confirm ref="dialogConfirm">
        <template #header>ต้องการเปลี่ยนสถานะหรือไม่?</template>
        <template #body
            >หากกดตกลงเเล้วจะมีการเปลี่ยนแปลงสถานะของรายการสินค้า</template
        >
    </utils-dialog-confirm>
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
import DialogConfirm from '@/components/utils/DialogConfirm.vue'
const {
    lines,
    plates,
    getStatusTitle,
    itemStatuses,
    getNextStatus,
    getPrevStatus,
} = useShare()
const authStore = useAuthStore()
const { userProfile } = storeToRefs(authStore)
const dialogConfirm = ref<InstanceType<typeof DialogConfirm> | null>(null)
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
const userStore = useUserStore()
const { users } = storeToRefs(userStore)
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
    { title: 'ดำเนินการ', key: 'action' },
])
async function updateStatus(
    productionId: string,
    item: ProductionItem,
    status: STATUS
) {
    const result = await dialogConfirm.value!.openConfirm()
    if (!result) {
        return
    }
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
const loadingSchool = ref(false)
const schoolStore = useSchoolStore()
const router = useRouter()
async function getSchools() {
    loadingSchool.value = true
    try {
        await schoolStore.fetchAllSchoolsWithCustomer(production.value.userId!)
    } catch (e) {
        toast.error(`${e}`)
    }
    loadingSchool.value = false
}
onMounted(async () => {
    defaultForm()
    if (props.id) {
        loading.value = true
        try {
            await userStore.fetchAllUsers()
            production.value = await getProductionById(`${props.id}`)
            if (
                userProfile.value!.role !== SYSTEM_ROLE.ADMIN &&
                userProfile.value!.id !== production.value.userId
            ) {
                router.push('/')
                return
            }
            await getSchools()
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
