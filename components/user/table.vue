<template>
    <v-card>
        <v-card-title class="d-flex justify-space-between pt-4">
            <div style="width: 400px">
                <v-text-field
                    :loading="loading"
                    :disabled="loading"
                    v-model="search"
                    label="ค้นหา"
                    placeholder="id,username,ร้านค้า"
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
        <v-data-table
            :loading="loading"
            :items="userFilter"
            :headers="tableheader"
        >
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
            <template #item.createdAt="{ item }">
                {{ formatDate.formatDate(new Date(item.createdAt)) }}
            </template>
        </v-data-table>
    </v-card>
    <v-dialog width="400" v-model="dialogDisable" v-if="users != undefined">
        <v-card>
            <v-card-title
                >ยืนยันปิดใช้งาน
                {{ users.find((v) => v.id == userId)?.username }}
                ?</v-card-title
            >
            <v-card-text>
                {{ users.find((v) => v.id == userId)?.username }}
                จะไม่สามารถทำรายการใดๆได้อีก
            </v-card-text>
            <v-card-actions>
                <v-btn variant="flat" color="success" @click="deleteUser"
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
import { useUserStore } from '@/stores/user'
import Modal from '@/components/user/dialogUser.vue'
import { toastPluginSymbol } from '~/plugins/toast'
const toast = inject(toastPluginSymbol)!
const dialogDisable = ref(false)
const userId = ref('')
const modal = ref<typeof Modal | null>(null)
const loading = ref(false)
const userStore = useUserStore()
const formatDate = useFormatDate()
const search = ref('')
const { updateUser, createUser, disableUser, fetchAllUsers } = userStore
const { users } = storeToRefs(userStore)
async function onEdit(id: string) {
    try {
        const user = await modal.value?.openDialog(id)
        await updateUser(id, user)
        modal.value?.closeDialog()
        toast.success('สร้างสำเร็จ')
        await init()
    } catch (e) {
        toast.error(`${e}`)
    } finally {
        modal.value?.setLoadingOff()
    }
}
async function onCreate() {
    try {
        const user = await modal.value?.openDialog()
        await createUser(user)
        modal.value?.closeDialog()
        toast.success('สร้างสำเร็จ')
        await init()
    } catch (e) {
        toast.error(`${e}`)
    } finally {
        modal.value?.setLoadingOff()
    }
}
async function deleteUser() {
    loading.value = true
    try {
        await disableUser(userId.value)
        dialogDisable.value = false
        userId.value = ''
        toast.success('ยกเลิกใช้งานสำเร็จ')
        await init()
    } catch (e) {
        toast.error(`${e}`)
    }
    loading.value = false
}
const tableheader = ref([
    { sortable: false, title: 'ID', key: 'id' },
    { sortable: false, title: 'Username', key: 'username' },
    { sortable: false, title: 'ร้านค้า', key: 'storeName' },
    { sortable: false, title: 'วันที่สร้าง', key: 'createdAt' },
    { sortable: false, title: 'แก่ไข/ยกเลิกใช้งาน', key: 'action' },
])
async function init() {
    loading.value = true
    await fetchAllUsers()
    loading.value = false
}
const userFilter = computed(() => {
    return users.value?.filter((v) => {
        return (
            v.username.toLowerCase().includes(search.value.toLowerCase()) ||
            v.storeName.toLowerCase().includes(search.value.toLowerCase()) ||
            v.id.toLowerCase().includes(search.value.toLowerCase())
        )
    })
})
onMounted(() => {
    init()
})
</script>
