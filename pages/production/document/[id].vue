<template>
    <div class="d-flex ga-4 align-center">
        <span> ดาวน์โหลดเอกสารไม่สำเร็จ ? </span>
        <v-btn variant="flat" @click="pdf.download()"
            >ลองดาวน์โหลดอีกครั้ง</v-btn
        >
    </div>
</template>
<script setup lang="ts">
import { productionPdf } from '~/pdfForm/productionForm'
import { toastPluginSymbol } from '~/plugins/toast'
const route = useRoute()
const { id } = route.params
const pdf = productionPdf()
const toast = inject(toastPluginSymbol)!

onMounted(async () => {
    try {
        await pdf.setItem(id as string)
        await pdf.download()
    } catch (error) {
        toast.error(`ดาวน์โหลดเอกสารไม่สำเร็จ ${error}`)
    }
})
</script>
