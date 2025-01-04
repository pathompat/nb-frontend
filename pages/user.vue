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
definePageMeta({
    middleware: 'adminonly',
})
</script>
