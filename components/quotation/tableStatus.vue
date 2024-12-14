<template>
    <v-card :loading="loading">
        <v-card-title>
            <QuotationFilterMenu />
        </v-card-title>
        <v-data-table
            :loading="loading"
            :items="filterQuotation"
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
                        <v-icon class="mr-4"
                            >{{
                                isExpanded(internalItem)
                                    ? 'mdi-chevron-up'
                                    : 'mdi-chevron-down'
                            }}
                        </v-icon>
                        {{ formatDate(new Date(item.dueDateAt!)) }}
                    </td>
                    <td>
                        <utils-return-data-slot
                            :data="
                                !item.productionId
                                    ? statuses.find(
                                          (x) => x.value == TYPE.QUOTATION
                                      )
                                    : statuses.find(
                                          (x) => x.value == TYPE.PRODUCTION
                                      )
                            "
                        >
                            <template #default="{ data }">
                                <v-chip
                                    :style="{ 'background-color': data!.color }"
                                >
                                    {{ data!.title }}
                                </v-chip>
                            </template>
                        </utils-return-data-slot>
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
                                    : `/production/${item.productionId}`
                            "
                            >รายละเอียด</v-btn
                        >
                    </td>
                    <td></td>
                </tr>
            </template>

            <template #expanded-row="{ item }">
                <tr>
                    <td colspan="12">
                        <v-data-table
                            hide-default-footer
                            :items="
                                !item.productionId
                                    ? item.items.map((item, index) => ({
                                          ...item,
                                          index: index + 1,
                                      }))
                                    : item.production!.items.map(
                                          (item, index) => ({
                                              ...item,
                                              index: index + 1,
                                          })
                                      )
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
import { TYPE } from '~/models/enum/enum'
import { toastPluginSymbol } from '~/plugins/toast'
import filterMenuQuotationState, {
    filterMenuQuotationStateSymbol,
} from '@/components/quotation/filterMenu/state'
import type { FilterQuotation } from '~/models/quotation/quotation'
const { getStatusTitle, statusColors } = useShare()
const { plates, lines, statuses } = useShare()
const { formatDate } = useFormatDate()
const stateFilter = filterMenuQuotationState()
provide(filterMenuQuotationStateSymbol, stateFilter)
const headers = ref([
    { title: 'วันที่', key: 'dueDateAt' },
    { title: 'ประเภท', key: 'type' },

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
const filterQuotation = computed(() =>
    quotations.value.filter(
        (x) =>
            filter.value.status.length === 0 ||
            filter.value.status.includes(x.status)
    )
)
const filter = ref<FilterQuotation>({
    store: [],
    status: [],
    school: [],
})
stateFilter.setCallback(async (param: FilterQuotation) => {
    filter.value = param
    // stateFilter.setCallback(async (param: FilterQuotation) => {
    //     filter.value = param
    // })
})
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
