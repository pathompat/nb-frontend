<template>
    <v-dialog v-model="dialogOpen" width="800">
        <v-card :loading="loading">
            <v-card-title>{{
                !initFormEdit.id
                    ? 'เพิ่ม User'
                    : `แก้ไข User #${initFormEdit.id}`
            }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form class="my-2">
                    <v-row class="py-1 px-1">
                        <v-col class="py-1 px-1">
                            <v-text-field
                                v-model="initFormEdit.username"
                                label="Username"
                                :disabled="loading || !!initFormEdit.id"
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
                                v-model="initFormEdit.shop"
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
                                v-model="initFormEdit.tier"
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
import type { Tier, User } from '@/composables/api/useUserApi'
import useUserApi from '@/composables/api/useUserApi'
const tier = ref<Tier[]>([])
const dialogOpen = ref(false)
const initFormEdit = ref<Partial<User>>({})
const userApi = useUserApi()
const loading = ref(false)
let resolveFn: ((user: Partial<User>) => void) | null = null
function action() {
    if (!resolveFn) return
    loading.value = true
    resolveFn(initFormEdit.value)
}
const openDialog = async (id?: string): Promise<Partial<User>> => {
    initFormEdit.value = {
        username: '',
        password: '',
        shop: '',
    }
    loading.value = true
    dialogOpen.value = true
    tier.value = await userApi.getTierOptions()
    if (id) {
        initFormEdit.value = await userApi.getOne(id)
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
