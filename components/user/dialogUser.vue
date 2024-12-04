<template>
    <v-dialog v-model="dialogOpen" width="800">
        <v-card :loading="loading">
            <v-card-title>{{
                !userId ? 'เพิ่ม User' : `แก้ไข User #${userId}`
            }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form class="my-2">
                    <v-row class="py-1 px-1">
                        <v-col class="py-1 px-1">
                            <v-text-field
                                v-model="initFormEdit.username"
                                label="Username"
                                :disabled="loading || !!userId"
                                :loading="loading"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col class="py-1 px-1">
                            <v-text-field
                                type="password"
                                v-model="initFormEdit.password"
                                :disabled="loading"
                                :loading="loading"
                                label="Password"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="py-1 px-1">
                        <v-col class="py-1 px-1">
                            <v-text-field
                                v-model="initFormEdit.storeName"
                                :disabled="loading"
                                :loading="loading"
                                hide-details
                                label="ร้านค้า"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="py-1 px-1">
                        <v-col class="py-1 px-1">
                            <v-select
                                v-model="initFormEdit.tierId"
                                :items="tier"
                                item-title="id"
                                item-value="id"
                                :disabled="loading"
                                :loading="loading"
                                label="tier"
                                required
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions
                ><v-btn
                    :disabled="loading"
                    :loading="loading"
                    variant="flat"
                    @click="action"
                    >บันทึก</v-btn
                >
            </v-card-actions>
        </v-card></v-dialog
    >
</template>
<script lang="ts" setup>
import type { CreateUser, User } from '@/models/user/user'
import { useUserStore } from '@/stores/user'
const tier = ref<{ id: number }[]>([])
const dialogOpen = ref(false)
const initFormEdit = ref<CreateUser>({
    username: '',
    password: '',
    storeName: '',
    tierId: 0,
})
const userId = ref('')
const { fetchAllUsers, updateUser, createUser, fetchUserById, user } =
    useUserStore()
const loading = ref(false)
let resolveFn: ((user: Partial<User>) => void) | null = null
function action() {
    if (!resolveFn) return
    loading.value = true
    resolveFn(initFormEdit.value)
}
const openDialog = async (id?: string): Promise<Partial<User>> => {
    userId.value = id || ''
    initFormEdit.value = {
        username: '',
        password: '',
        storeName: '',
        tierId: 0,
    }
    loading.value = true
    dialogOpen.value = true
    tier.value = []
    if (id) {
        await fetchUserById(id)
        initFormEdit.value = {
            username: user.username,
            password: '',
            storeName: user.storeName,
            tierId: user.tierId,
        }
    }
    loading.value = false

    return new Promise<Partial<User>>((resolve) => {
        resolveFn = resolve
    })
}
defineExpose({
    openDialog,
    closeDialog: () => {
        dialogOpen.value = false
    },
})
</script>
