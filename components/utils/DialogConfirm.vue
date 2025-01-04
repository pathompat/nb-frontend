<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <slot name="header"></slot>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <slot name="body"></slot>
            </v-card-text>
            <v-card-actions>
                <v-btn variant="flat" color="primary" @click="confirmDialog"
                    >ตกลง</v-btn
                >
                <v-btn color="red" @click="closeDialog">ยกเลิก</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
const dialog = ref(false)
const resolve = ref<((value: boolean) => void) | null>(null)
function closeDialog() {
    dialog.value = false
    resolve.value!(false)
}
function confirmDialog() {
    dialog.value = false
    resolve.value!(true)
}
function openConfirm() {
    dialog.value = true
    return new Promise((_resolve) => {
        resolve.value = _resolve
    })
}
defineExpose({ openConfirm })
</script>
