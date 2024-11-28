<template>
  <main>
    <h1>รายการสั่งผลิต</h1>
    <section class="pa-8">
      <List />
    </section>
    <section>
      <Table />
    </section>
  </main>
</template>
<script setup lang="ts">
import List from "@/components/production/list.vue";
import Table from "@/components/production/tableStatus.vue";
</script>
