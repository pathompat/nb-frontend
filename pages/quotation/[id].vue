<template>
    <UtilsBasePage
        :title="`แบบฟอร์มเสนอราคา ${
            id ? `#QT${id!.toString().padStart(5, '0')}` : ''
        }`"
        path="/"
    >
        <CardDetail :id="+id" />
    </UtilsBasePage>
</template>
<script setup lang="ts">
import CardDetail from '@/components/quotation/cardDetail.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { id } = route.params as { id: string }
</script>
