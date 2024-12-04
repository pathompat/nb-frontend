<template>
    <v-dialog v-model="dialogOpen" width="800">
        <v-card :loading="loading">
            <v-card-title>{{
                !userId ? 'เพิ่ม User' : `แก้ไข User #${userId}`
            }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form class="ma-4" v-model="valid">
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="initFormEdit.username"
                                label="Username"
                                :rules="userNameRule"
                                :hide-details="false"
                                :disabled="loading || !!userId"
                                :loading="loading"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                type="password"
                                v-model="initFormEdit.password"
                                :disabled="loading"
                                :loading="loading"
                                :rules="passwordRule"
                                :hide-details="false"
                                label="Password"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="initFormEdit.storeName"
                                :disabled="loading"
                                :loading="loading"
                                :rules="emtpyRule"
                                :hide-details="false"
                                label="ร้านค้า"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select
                                v-model="initFormEdit.tierId"
                                :items="tiers"
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
                    :disabled="!valid || loading"
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
const { tiers } = useShare()
const { passwordRule, userNameRule, emtpyRule } = useRules()
const dialogOpen = ref(false)
const initFormEdit = ref<CreateUser>({
    username: '',
    password: '',
    storeName: '',
    tierId: 1,
})
const valid = ref(false)
const userId = ref('')
const { fetchUserById, user } = useUserStore()
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
        tierId: 1,
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
    setLoadingOff: () => {
        loading.value = false
    },
})
</script>
