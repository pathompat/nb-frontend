<template>
    <v-row>
        <v-col v-for="(sectionProduct, index) in statAndIconColor" :key="index">
            <v-card
                elevation="2"
                class="position-relative pa-4 rounded-card hover-card h-100 align-center"
            >
                <v-card-text
                    class="pt-6 d-flex align-center justify-space-between"
                >
                    <div class="d-flex flex-column justify-start ga-1">
                        <v-icon
                            :style="{ color: sectionProduct.color }"
                            class="mr-3"
                            size="36"
                        >
                            {{ sectionProduct.icon }}
                        </v-icon>
                        <p
                            class="mb-0 font-weight-bold text-title"
                            style="font-size: 1.2rem"
                        >
                            {{ sectionProduct.title }}
                        </p>
                    </div>
                    <div>
                        <span
                            class="font-weight-bold text-amount"
                            :style="{
                                color: sectionProduct.color,
                                fontSize: '2.5rem',
                            }"
                        >
                            {{
                                quotationStat.find(
                                    (x) => x.status == sectionProduct.value
                                )?.count || 0
                            }}
                        </span>
                        <utils-return-data-slot
                            :data="
                                statuses.find(
                                    (x) => x.value == sectionProduct.type
                                )
                            "
                        >
                            <template #default="{ data }">
                                <div
                                    class="font-weight-bold position-absolute top-0 right-0 pa-2 rounded-sm opacity-70"
                                    :style="{
                                        backgroundColor: data?.color,
                                    }"
                                >
                                    {{ data?.title }}
                                </div>
                            </template>
                        </utils-return-data-slot>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
const quotationStore = useQuotationStore()
const { quotationStat } = storeToRefs(quotationStore)
const { statAndIconColor, statuses } = useShare()
onMounted(async () => {
    await quotationStore.fetchQuotationsState()
    console.log(quotationStat.value)
})
</script>
