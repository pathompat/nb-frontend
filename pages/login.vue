<template>
    <main class="d-flex h-100 flex-column justify-center align-center">
        <div style="width: 400px">
            <div class="d-flex justify-start">
                <h1>เข้าสู่ระบบ</h1>
            </div>
            <form @submit.prevent="onSubmit">
                <div class="d-flex flex-column">
                    <div class="d-flex flex-column ga-4">
                        <v-text-field
                            v-model="userform.username"
                            label="บัญชีผู้ใช้งาน"
                            placeholder="กรุณากรอกบัญชีผู้ใช้งาน"
                            :error-messages="errors.username"
                            @blur="validateField('username')"
                        ></v-text-field>
                        <v-text-field
                            v-model="userform.password"
                            label="รหัสผ่าน"
                            type="password"
                            placeholder="กรุณากรอกรหัสผ่าน"
                            :error-messages="errors.password"
                            @blur="validateField('password')"
                        ></v-text-field>
                    </div>
                    <div class="d-flex justify-end">
                        <div class="d-flex align-center">
                            <v-checkbox hide-details></v-checkbox>
                            <div>จำรหัสผ่าน</div>
                        </div>
                    </div>
                    <v-btn
                        :loading="loading"
                        variant="flat"
                        type="submit"
                        :disabled="!meta.valid"
                    >
                        เข้าสู่ระบบ
                    </v-btn>
                </div>
            </form>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toastPluginSymbol } from '~/plugins/toast'
const userform = ref({
    username: '',
    password: '',
})
definePageMeta({
    layout: 'login',
    middleware: undefined,
})

const schema = yup.object({
    username: yup
        .string()
        .required('กรุณากรอกบัญชีผู้ใช้งาน')
        .min(6, 'บัญชีผู้ใช้งานต้องมีความยาวอย่างน้อย 6 ตัวอักษร')
        .matches(
            /^[a-zA-Z]+$/,
            'บัญชีผู้ใช้งานต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น'
        ),
    password: yup
        .string()
        .required('กรุณากรอกรหัสผ่าน')
        .min(8, 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร')
        .matches(/[A-Z]/, 'รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว')
        .matches(/[a-z]/, 'รหัสผ่านต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว')
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            'รหัสผ่านต้องมีอักขระพิเศษอย่างน้อย 1 ตัว'
        ),
})

const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const toast = inject(toastPluginSymbol)!

const { handleSubmit, errors, validateField, meta } = useForm({
    validationSchema: schema,
    validateOnMount: false,
})

const onSubmit = handleSubmit(async (values) => {
    loading.value = true
    try {
        await authStore.login(values.username, values.password)
        router.push({ path: '/' })
    } catch (error) {
        toast.error(error as string)
    } finally {
        loading.value = false
    }
})
</script>
