<template>
    <main>
        <h1>จัดการ User</h1>

        <section class="mt-8">
            <Table />
        </section>
    </main>
</template>
<script setup lang="ts">
import Table from '@/components/user/table.vue'
import { SYSTEM_ROLE } from '~/models/enum/enum'
const { userProfile } = useAuthStore()
const router = useRouter()

definePageMeta({
    middleware: 'adminonly',
})
</script>
