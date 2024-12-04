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
import type { CreateUser } from '@/models/user/user'
const { fetchUserById } = useUserStore()
const tier = ref<[]>([])
const dialogOpen = ref(false)
const initFormEdit = ref<CreateUser>({
    username: '',
    password: '',
    storeName: '',
    tierId: 0,
})
const loading = ref(false)
const userId = ref<string>('')
let resolveFn: ((user: CreateUser) => void) | null = null
function action() {
    if (!resolveFn) return
    loading.value = true
    resolveFn(initFormEdit.value)
}
const openDialog = async (id?: string): Promise<CreateUser> => {
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
    if (userId.value) {
        await fetchUserById(userId.value)
    }
    loading.value = false

    return new Promise<CreateUser>((resolve) => {
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
