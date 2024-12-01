<template>
    <main class="d-flex h-100 flex-column justify-center align-center">
        <div style="width: 400px">
            <div class="d-flex justify-start">
                <h1>เข้าสู่ระบบ</h1>
            </div>
            <form @submit.prevent="login">
                <div class="d-flex flex-column">
                    <div class="d-flex flex-column ga-4">
                        <v-text-field
                            v-model="userform.username"
                            label="บัญชีผู้ใช้งาน"
                        ></v-text-field>
                        <v-text-field
                            v-model="userform.password"
                            label="รหัสผ่าน"
                            @keyup.enter="login"
                        ></v-text-field>
                    </div>
                    <div class="d-flex justify-end">
                        <div class="d-flex align-center">
                            <v-checkbox hide-details></v-checkbox>
                            <div>จำรหัสผ่าน</div>
                        </div>
                    </div>
                    <v-btn :loading="loading" variant="flat" type="submit">
                        เข้าสู่ระบบ
                    </v-btn>
                </div>
            </form>
        </div>
    </main>
</template>

<script lang="ts" setup>
import useAuth from '@/composables/useAuth'
definePageMeta({
    layout: 'login',
})
const userform = ref({
    username: '',
    password: '',
})
const loading = ref(false)
const router = useRouter()
const auth = useAuth()
const login = async () => {
    loading.value = true
    try {
        const res = await auth.login(
            userform.value.username,
            userform.value.password
        )
        router.push({ path: '/' })
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}
onMounted(() => {
    alert(
        `
    user admin 
    user : admin | password : admin 
    user customer 
    user : customer | password : customer`
    )
})
</script>
