<template>
    <UtilsBasePage path="/">
        <template #header>
            <h1>
                แบบฟอร์มเสนอราคา
                {{ id ? `#QT${id!.toString().padStart(5, '0')}` : '' }}
            </h1>

            <UtilsReturnDataSlot
                :data="itemStatuses.find((x) => x.value == status)"
            >
                <template #default="{ data }">
                    <v-chip
                        class="text-white"
                        :style="{ backgroundColor: data?.color }"
                    >
                        <span>{{ data?.title }}</span>
                    </v-chip>
                </template>
            </UtilsReturnDataSlot>
        </template>
        <CardDetail :id="+id" @status="(e) => (status = e)" />
    </UtilsBasePage>
</template>
<script setup lang="ts">
import CardDetail from '@/components/quotation/cardDetail.vue'
import { useRoute } from 'vue-router'
const { itemStatuses } = useShare()
const status = ref('')
const route = useRoute()
const { id } = route.params as { id: string }
</script>
