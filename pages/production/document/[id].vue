<template>
    <UtilsBasePage :path="`/production/${route.params.id}`">
        <template #header>
            <h1>
                เอกสารใบสั่งผลิต {{ `${route.params.id}`.padStart(5, '0') }}
            </h1>
        </template>
        <div class="d-flex ga-4 align-center pa-8">
            <span> ดาวน์โหลดเอกสารไม่สำเร็จ ? </span>
            <v-btn variant="flat" @click="pdf.download()"
                >ลองดาวน์โหลดอีกครั้ง</v-btn
            >
        </div>
    </UtilsBasePage>
</template>
<script setup lang="ts">
import { productionPdf } from '~/pdfForm/productionForm'
import { toastPluginSymbol } from '~/plugins/toast'
const route = useRoute()
const id = ref('')
const pdf = productionPdf()
const toast = inject(toastPluginSymbol)!

onMounted(async () => {
    nextTick(() => {
        try {
            id.value = route.params.id as string
            pdf.setItem(id.value as string)
            pdf.download()
        } catch (error) {
            toast.error(`ดาวน์โหลดเอกสารไม่สำเร็จ ${error}`)
        }
    })
})
</script>
