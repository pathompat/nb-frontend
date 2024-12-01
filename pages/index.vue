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
        <section class="pa-8">
            <List />
        </section>
        <section>
            <Table />
        </section>
    </main>
</template>
<script setup lang="ts">
import List from '@/components/production/list.vue'
import Table from '@/components/production/tableStatus.vue'
</script>
