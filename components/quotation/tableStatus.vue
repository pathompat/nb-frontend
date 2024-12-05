<template>
    <v-card :loading="loading">
        <v-card-title> s </v-card-title>
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
                <tr>
                    <td>
                        <v-btn icon @click.stop="toggleExpand(item as any)">
                            <v-icon>{{
                                isExpanded(internalItem)
                                    ? 'mdi-chevron-up'
                                    : 'mdi-chevron-down'
                            }}</v-icon>
                        </v-btn>
                        <!-- {{ item.date }} -->
                    </td>
                    <td>{{ item.schoolId }}</td>
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
                                        (s) => s.id == +item.status
                                    )?.color || 'gray',
                            }"
                        >
                            {{ getStatusTitle(+item.status) }}
                        </v-chip>
                    </td>
                    <td>
                        <v-btn
                            variant="outlined"
                            class="text-primary"
                            :to="`/quotation/${item.id}`"
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
                            <template #item.hasPlan="{ item }">
                                <v-icon v-if="item.hasPlan">
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
const headers = ref([
    { title: 'วันที่', key: 'date' },
    { title: 'โรงเรียน', key: 'school' },
    { title: 'ร้านค้า', key: 'shop' },
    { title: 'สถานะ', key: 'status' },
    { title: '#', key: 'action' },
])
const headerExpanded = ref([
    { title: 'No.', value: 'index' },
    { title: 'เพรท/แกรม/สี/แผ่น/เส้น', value: 'description' },
    { title: 'มีเเบบ', value: 'hasPlan' },
    { title: 'จำนวน', value: 'amount' },
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
        // await fetchQuotations()
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
