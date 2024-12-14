<template>
    <UtilsBasePage path="/">
        <template #header>
            <h1>
                แบบฟอร์มเสนอราคา
                {{ `${id ? `#PR${id!.toString().padStart(5, '0')}` : ''}` }}
            </h1>
        </template>
        <CardDetail :id="+id" />
    </UtilsBasePage>
</template>
<script setup lang="ts">
import CardDetail from '@/components/production/cardDetail.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { id } = route.params as { id: string }
</script>
