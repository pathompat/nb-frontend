<template>
    <UtilsBasePage path="/">
        <template #header>
            <h1>
                แบบฟอร์มเสนอราคา
                {{ id ? `#QT${id!.toString().padStart(5, '0')}` : '' }}
            </h1>
            <!-- <v-chip></v-chip> -->
        </template>
        <CardDetail :id="+id" />
    </UtilsBasePage>
</template>
<script setup lang="ts">
import CardDetail from '@/components/quotation/cardDetail.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { id } = route.params as { id: string }
</script>
