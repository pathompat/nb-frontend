<template>
    <UtilsBasePage :path="handleBack">
        <template #header>
            <h1>เอกสารใบเสนอราคา {{ `${id}`.padStart(5, '0') }}</h1>
        </template>
        <div class="d-flex ga-4 align-center pa-8">
            <span> ดาวน์โหลดเอกสารไม่สำเร็จ ? </span>
            <v-btn
                variant="flat"
                @click="download"
                :disabled="loading"
                :loading="loading"
                >ลองดาวน์โหลดอีกครั้ง</v-btn
            >
        </div>
    </UtilsBasePage>
</template>
<script setup lang="ts">
import { quotationPdf } from '~/pdfForm/quotationForm'
import { toastPluginSymbol } from '~/plugins/toast'
const route = useRouter().currentRoute
const id = ref('')
const pdf = quotationPdf()
const toast = inject(toastPluginSymbol)!
const loading = ref(false)
async function download() {
    loading.value = true
    await pdf.setItem(id.value)
    await pdf.download()
}
onMounted(async () => {
    try {
        id.value = route.value.params.id as string
        await download()
    } catch (error) {
        toast.error(`ดาวน์โหลดเอกสารไม่สำเร็จ ${error}`)
    } finally {
        loading.value = false
    }
})
const router = useRouter()
function handleBack() {
    if (window.history.length > 1) {
        router.back()
    } else {
        router.push(`/quotation/${id}`)
    }
}
</script>
