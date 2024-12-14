<template>
    <main class="d-flex h-100 flex-column justify-center align-center">
        <div style="width: 400px">
            <div class="d-flex justify-start my-2">
                <h1>เข้าสู่ระบบ</h1>
            </div>
            <v-form
                ref="form"
                v-model="valid"
                class="d-flex flex-column ga-4"
                @submit.prevent="submit"
            >
                <div class="d-flex flex-column ga-4">
                    <v-text-field
                        v-model="userform.username"
                        label="บัญชีผู้ใช้งาน"
                        type="text"
                        id="username"
                        name="username"
                        autocomplete="on"
                        :hide-details="false"
                        :rules="userNameRule"
                        placeholder="กรุณากรอกบัญชีผู้ใช้งาน"
                    ></v-text-field>
                    <v-text-field
                        v-model="userform.password"
                        label="รหัสผ่าน"
                        autocomplete="on"
                        id="password"
                        :hide-details="false"
                        name="password"
                        type="password"
                        :rules="passwordRule"
                        placeholder="กรุณากรอกรหัสผ่าน"
                    ></v-text-field>
                </div>

                <v-btn
                    :disabled="!valid"
                    :loading="loading"
                    variant="flat"
                    type="submit"
                >
                    เข้าสู่ระบบ
                </v-btn>
            </v-form>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { toastPluginSymbol } from '~/plugins/toast'
const { passwordRule, userNameRule } = useRules()
const valid = ref(true)
definePageMeta({
    layout: 'login',
    middleware: undefined,
})
const form = ref()

const userform = ref({
    username: '',
    password: '',
})
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const toast = inject(toastPluginSymbol)!

const submit = async () => {
    loading.value = true
    try {
        await authStore.login(userform.value.username, userform.value.password)
        router.push({ path: '/' })
    } catch (error) {
        toast.error(error as string)
    } finally {
        loading.value = false
    }
}
</script>
