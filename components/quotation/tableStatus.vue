<template>
    <v-card :loading="loading">
        <v-card-title>
            <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                    <div class="d-flex justify-end">
                        <v-btn color="primary" v-bind="props" variant="flat">
                            กรองข้อมูลเพิ่มเติม
                        </v-btn>
                    </div>
                </template>
                <v-card width="400">
                    <v-card-title>กรองข้อมูลเพิ่มเติม</v-card-title>
                    <v-card-text class="d-flex flex-column ga-4">
                        <v-container>
                            <v-row dense>
                                <v-col class="d-flex align-center">
                                    <v-label>โรงเรียน</v-label>
                                </v-col>
                                <v-col cols="9" class="d-flex align-center">
                                    <v-select label="เลือกโรงเรียน"></v-select
                                ></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col class="d-flex align-center">
                                    <v-label>ร้านค้า</v-label></v-col
                                >
                                <v-col cols="9" class="d-flex align-center">
                                    <v-select label="เลือกร้านค้า"></v-select
                                ></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col class="d-flex align-center">
                                    <v-label>เลือกสถานะ</v-label></v-col
                                >
                                <v-col cols="9" class="d-flex align-center">
                                    <v-select label="เลือกสถานะ"></v-select
                                ></v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" variant="plain">ล้างข้อมูล</v-btn>
                        <v-btn color="primary" variant="flat">ค้นหา</v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
        </v-card-title>
        <v-data-table
            :loading="loading"
            :items="quotations"
            :expand-on-click="true"
            show-expand
            :headers="headers"
        >
            <template
                v-slot:item="{ internalItem, item, isExpanded, toggleExpand }"
            >
                <tr
                    :style="{
                        backgroundColor: isExpanded(internalItem)
                            ? '#f0f0f0'
                            : 'white',
                    }"
                >
                    <td
                        @click="toggleExpand(internalItem)"
                        class="cursor-pointer"
                    >
                        <v-icon class="mr-4">{{
                            isExpanded(internalItem)
                                ? 'mdi-chevron-up'
                                : 'mdi-chevron-down'
                        }}</v-icon>
                        <!-- {{ item.date }} -->
                    </td>
                    <td>{{ item.schoolName }}</td>
                    <td>
                        <v-icon> mdi-map-marker</v-icon> {{ item.storeName }}
                    </td>
                    <td>
                        <v-chip
                            density="compact"
                            class="text-white"
                            :style="{
                                backgroundColor:
                                    statusColors.find(
                                        (s) => s.id == item.status
                                    )?.color || 'gray',
                            }"
                        >
                            {{ getStatusTitle(item.status) }}
                        </v-chip>
                    </td>
                    <td>
                        <v-btn
                            variant="outlined"
                            class="text-primary"
                            :to="
                                !item.productionId
                                    ? `/quotation/${item.id}`
                                    : `/production/${item.productionId!}`
                            "
                            >รายละเอียด</v-btn
                        >
                    </td>
                </tr>
            </template>

            <template #expanded-row="{ item }">
                <tr>
                    <td colspan="12">
                        <v-data-table
                            hide-default-footer
                            :items="
                                item.items.map((item, index) => ({
                                    ...item,
                                    index: index + 1,
                                }))
                            "
                            :headers="headerExpanded"
                        >
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
                                </v-chip>
                            </template>
                            <template #item.description="{ item }">
                                {{
                                    plates.find((p) => p.value === item.plate)
                                        ?.title || ''
                                }}/{{ item.gram }}/{{ item.color }}/{{
                                    item.page
                                }}/{{
                                    lines.find((l) => l.value === item.pattern)
                                        ?.title || ''
                                }}
                            </template>
                            <template #item.hasReference="{ item }">
                                <v-icon v-if="item.hasReference">
                                    mdi-check-circle</v-icon
                                >
                            </template>
                        </v-data-table>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</template>
<script setup lang="ts">
import { toastPluginSymbol } from '~/plugins/toast'
const { getStatusTitle, statusColors } = useShare()
const { plates, lines } = useShare()
const headers = ref([
    { title: 'วันที่', key: 'dueDateAt' },
    { title: 'โรงเรียน', key: 'schoolName' },
    { title: 'ร้านค้า', key: 'storeName' },
    { title: 'สถานะ', key: 'status' },
    { title: '#', key: 'action' },
])
const headerExpanded = ref([
    { title: 'No.', value: 'index' },
    { title: 'เพรท/แกรม/สี/แผ่น/เส้น', value: 'description' },
    { title: 'มีเเบบ', value: 'hasReference' },
    { title: 'จำนวน', value: 'quantity' },
    { title: 'สถานะงานพิมพ์', value: 'status' },
])
const loading = ref(false)
const quotationStore = useQuotationStore()
const toast = inject(toastPluginSymbol)!
const { fetchQuotations } = quotationStore
const { quotations } = storeToRefs(quotationStore)
onMounted(async () => {
    loading.value = true
    try {
        await fetchQuotations()
    } catch (error) {
        toast.error(`${error}`)
    }
    loading.value = false
})
</script>

<style scoped>
.expanded-row {
    background-color: #f0f0f0 !important;
}
</style>
