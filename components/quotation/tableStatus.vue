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
                                    density="compact"
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
                                    itemStatuses.find(
                                        (s) =>
                                            s.value ==
                                            (item.production == undefined
                                                ? item.status
                                                : getMinStatus(
                                                      item.production!.items.map(
                                                          (x) => x.status
                                                      )
                                                  ))
                                    )?.color || 'gray',
                            }"
                        >
                            {{
                                item.production == undefined
                                    ? getStatusTitle(item.status)
                                    : getStatusTitle(
                                          getMinStatus(
                                              item.production!.items.map(
                                                  (x) => x.status
                                              )
                                          )
                                      )
                            }}
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
                                            itemStatuses.find(
                                                (s) => s.value === item.status
                                            )?.color || 'gray',
                                    }"
                                >
                                    {{ getStatusTitle(item.status!) }}
                                </v-chip>
                            </template>
                            <template #item.description="{ item }">
                                {{
                                    userProfile!.role == SYSTEM_ROLE.ADMIN
                                        ? (plates.find(
                                              (p) => p.value === item.plate
                                          )?.title || 'ไม่พบ') + '/'
                                        : ''
                                }}{{
                                    itemCategories.find(
                                        (x) => x.value == item.category
                                    )?.title
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
import { SYSTEM_ROLE, TYPE } from '~/models/enum/enum'
import { toastPluginSymbol } from '~/plugins/toast'
import filterMenuQuotationState, {
    filterMenuQuotationStateSymbol,
} from '@/components/quotation/filterMenu/state'
const { getStatusTitle, itemStatuses } = useShare()
const { plates, lines, statuses, getMinStatus, itemCategories } = useShare()
const { formatDate } = useFormatDate()
const stateFilter = filterMenuQuotationState()
const authStore = useAuthStore()
const { userProfile } = storeToRefs(authStore)
provide(filterMenuQuotationStateSymbol, stateFilter)
const headers = computed(() => {
    const headers = [
        { title: 'วันที่', key: 'dueDateAt' },
        { title: 'ประเภท', key: 'type' },

        { title: 'โรงเรียน', key: 'schoolName' },
        { title: 'ร้านค้า', key: 'storeName' },
        { title: 'สถานะ', key: 'status' },
        { title: '#', key: 'action' },
    ]
    return headers.filter(
        (x) =>
            !(
                userProfile.value!.role == SYSTEM_ROLE.CUSTOMER &&
                x.key == 'storeName'
            )
    )
})
const headerExpanded = computed(() => {
    const header = [
        { title: 'No.', value: 'index' },
        { title: 'เพลท/ประเภท/แกรม/สี/แผ่น/เส้น', value: 'description' },
        { title: 'มีแบบ', value: 'hasReference' },
        { title: 'จำนวน', value: 'quantity' },
        { title: 'สถานะงานพิมพ์', value: 'status' },
    ]
    if (userProfile.value!.role != SYSTEM_ROLE.ADMIN) {
        header.find((x) => x.value == 'description')!.title =
            'ประเภท/แกรม/สี/แผ่น/เส้น'
    }
    return header
})
const loading = ref(false)
const quotationStore = useQuotationStore()
const toast = inject(toastPluginSymbol)!
const { fetchQuotations } = quotationStore
const { quotations } = storeToRefs(quotationStore)
const filterQuotation = computed(() => {
    let result = quotations.value

    const {
        type,
        status,
        school,
        store,
        category,
        color,
        gram,
        page,
        pattern,
        plate,
    } = stateFilter.filter.value

    result = result.filter(
        (x) =>
            (type === TYPE.QUOTATION && x.productionId == null) ||
            (type === TYPE.PRODUCTION && x.productionId != null) ||
            type == null
    )
    result = result.filter(
        (x) => store.includes(x.storeName) || store.length === 0
    )
    result = result.filter(
        (x) => school.includes(x.schoolName) || school.length === 0
    )
    result = result.filter(
        (x) =>
            status.some((h) =>
                x.production == undefined
                    ? h == x.status
                    : x.production.items.some((s) => s.status == h)
            ) || status.length === 0
    )
    result = result.filter(
        (x) => category == null || x.items.some((s) => s.category == category)
    )
    result = result.filter(
        (x) => color == null || x.items.some((s) => s.color == color)
    )
    result = result.filter(
        (x) => gram == null || x.items.some((s) => s.gram == gram)
    )
    result = result.filter(
        (x) => page == null || x.items.some((s) => s.page == page)
    )
    result = result.filter(
        (x) => plate == null || x.items.some((s) => s.plate == plate)
    )
    result = result.filter(
        (x) => pattern == null || x.items.some((s) => s.pattern == pattern)
    )
    return result
})

onMounted(async () => {
    loading.value = true
    try {
        await fetchQuotations()
        stateFilter.storeList.value = [
            ...new Set(quotations.value.map((x) => x.storeName)),
        ]
        stateFilter.schoolList.value = [
            ...new Set(quotations.value.map((x) => x.schoolName)),
        ]
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
