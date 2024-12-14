<template>
    <UtilsBasePage path="/">
        <template #header>
            <h1>เอกสารใบเสนอราคา {{ `${param.id}`.padStart(5, '0') }}</h1>
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
import { quotationPdf } from '~/pdfForm/quotationForm'
import { toastPluginSymbol } from '~/plugins/toast'
const route = useRoute()
const param = computed(() => route.params)
const pdf = quotationPdf()
const toast = inject(toastPluginSymbol)!

onMounted(async () => {
    nextTick(() => {
        try {
            pdf.setItem(param.value.id as string)
            pdf.download()
        } catch (error) {
            toast.error(`ดาวน์โหลดเอกสารไม่สำเร็จ ${error}`)
        }
    })
})
</script>
