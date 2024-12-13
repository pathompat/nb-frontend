<template>
    <main>
        <div class="d-flex justify-space-between">
            <h1>รายการสั่งผลิต</h1>
            <div class="d-flex ga-2">
                <v-btn variant="flat" color="success" to="/quotation/create">
                    เพิ่มรายการสั่งผลิต
                </v-btn>
            </div>
        </div>
        <section class="py-8">
            <List />
        </section>
        <section>
            <Table />
        </section>
    </main>
</template>
<script setup lang="ts">
import List from '@/components/quotation/list.vue'
import Table from '@/components/quotation/tableStatus.vue'
</script>
