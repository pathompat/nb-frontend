<template>
    <v-card>
        <v-card-title class="d-flex justify-space-between pt-4">
            <div style="width: 400px">
                <v-text-field
                    :loading="loading"
                    :disabled="loading"
                    label="ค้นหา"
                    placeholder="username,ร้านค้า"
                ></v-text-field>
            </div>
            <v-btn
                color="primary "
                prepend-icon="mdi-account-plus"
                :loading="loading"
                :disabled="loading"
                @click="onCreate"
                >เพิ่มผู้ใช้งาน</v-btn
            >
        </v-card-title>
        <v-data-table :loading="loading" :items="users" :headers="tableheader">
            <template #item.action="{ item }">
                <div class="d-flex ga-4">
                    <v-btn
                        color="primary "
                        size="small"
                        @click="onEdit(item.id)"
                        >แก้ไข</v-btn
                    >
                    <v-btn
                        color="error "
                        size="small"
                        @click="
                            () => {
                                dialogDisable = true
                                userId = item.id
                            }
                        "
                        >ยกเลิก</v-btn
                    >
                </div>
            </template>
        </v-data-table>
    </v-card>
    <v-dialog width="400" v-model="dialogDisable">
        <v-card>
            <v-card-title
                >ยืนยันปิดใช้งาน
                {{ users.find((v) => v.id == userId)?.username }}
                ?</v-card-title
            >
            <v-card-text>
                user
                {{ users.find((v) => v.id == userId)?.username }}
                จะไม่สามารถทำรายการใดๆได้อีก
            </v-card-text>
            <v-card-actions>
                <v-btn variant="flat" color="success" @click="disableUser"
                    >ยืนยัน</v-btn
                >
                <v-btn
                    variant="flat"
                    color="error"
                    @click="
                        () => {
                            dialogDisable = false
                            userId = ''
                        }
                    "
                    >ยกเลิก</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
    <Modal ref="modal" />
</template>
<script setup lang="ts">
import type { User } from '@/models/user/user'
import Modal from '@/components/user/dialogUser.vue'
const { fetchAllUsers, updateUser, createUser, disableUser, users } =
    useUserStore()
const dialogDisable = ref(false)
const userId = ref('')
const modal = ref<typeof Modal | null>(null)
const loading = ref(false)
async function onEdit(id: string) {
    const user = await modal.value?.openDialog(id)
    await updateUser(id, user)
    modal.value?.closeDialog()
    await init()
}
async function onCreate() {
    const user = await modal.value?.openDialog()
    await createUser(user)
    modal.value?.closeDialog()
    await init()
}
async function disabled() {
    loading.value = true
    await disableUser(userId.value)
    dialogDisable.value = false
    userId.value = ''
    await fetchAllUsers()
    loading.value = false
}
const tableheader = ref([
    { sortable: false, title: 'ID', key: 'id' },
    { sortable: false, title: 'Username', key: 'username' },
    { sortable: false, title: 'ร้านค้า', key: 'shop' },
    { sortable: false, title: 'วันที่สร้าง', key: 'createdDate' },
    { sortable: false, title: 'แก่ไข/ยกเลิกใช้งาน', key: 'action' },
])
async function init() {
    loading.value = true
    await fetchAllUsers()
    loading.value = false
}
onMounted(async () => {
    init()
})
</script>
