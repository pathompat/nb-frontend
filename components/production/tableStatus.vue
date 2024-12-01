<template>
    <v-card :loading="loading">
        <v-card-title>
            <div class="d-flex justify-end">
                <div class="d-flex ga-4">
                    <v-text-field label="ค้นหา" style="width: 300px" />
                    <v-select label="สถานะ" style="width: 170px"></v-select>
                </div>
            </div>
        </v-card-title>
        <v-data-table :loading="loading" :items="tableState" :headers="headers">
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
                        <span>
                            {{ item.date }}
                        </span>
                    </td>
                    <td>
                        {{ item.school }}
                    </td>

                    <td v-if="userProfile?.tier == TIER.ADMIN">
                        <v-icon> mdi-map-marker</v-icon> {{ item.shop }}
                    </td>
                    <td>
                        <v-chip
                            density="compact"
                            class="text-white"
                            :style="{
                                backgroundColor:
                                    statusColors.find(
                                        (s) =>
                                            s.id ===
                                            getItemLowestStatus(item.items)
                                    )?.color || 'gray',
                            }"
                        >
                            {{
                                getStatusTitle(getItemLowestStatus(item.items))
                            }}
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
                            :headers="headerItems"
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
                                    lines.find((l) => l.value === item.line)
                                        ?.title || ''
                                }}
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
import useProductionApi, {
    statusColors,
    getStatusTitle,
    plates,
    lines,
} from '@/composables/api/useProductionApi'
import { contextPluginSymbol } from '@/plugins/context'
import type { Production, ProductionItem } from '@/models/production/production'
const tableState = ref<Production[]>([])
const { userProfile } = inject(contextPluginSymbol)!
const loading = ref(false)
const productApi = useProductionApi()
const headerItems = ref([
    {
        title: 'No.',
        value: 'index',
        headerProps: { style: { fontWeight: 'bold' } },
    },
    {
        title: 'เพรท/แกรม/สี/แผ่น/เส้น',
        value: 'description',
        headerProps: { style: { fontWeight: 'bold' } },
    },
    {
        title: 'มีเเบบ',
        value: 'hasPlan',
        headerProps: { style: { fontWeight: 'bold' } },
    },
    {
        title: 'จำนวน',
        value: 'amount',
        headerProps: { style: { fontWeight: 'bold' } },
    },
    {
        title: 'สถานะงานพิมพ์',
        value: 'status',
        headerProps: { style: { fontWeight: 'bold' } },
    },
])
function getItemLowestStatus(items: ProductionItem[]) {
    return items.sort((a, b) => a.status - b.status)[0].status
}
onMounted(async () => {
    loading.value = true
    try {
        const res = await productApi.getAll()
        tableState.value = res
    } catch (error) {
        console.error(error)
    }
    loading.value = false
})
const headers = computed(() => {
    const header = [
        { title: 'วันที่', key: 'date' },
        { title: 'โรงเรียน', key: 'school' },
        {
            title: 'ร้านค้า',
            key: 'shop',
        },
        { title: 'สถานะ', key: 'status' },
        { title: '#', key: 'action' },
    ]
    return header.filter(
        (h) => userProfile.value?.role !== 'user' || h.key !== 'shop'
    )
})
</script>
