<template>
  <v-row>
    <v-col cols="4" v-for="sectionProduct in sectionProducts">
      <v-card elevation="4">
        <v-card-text class="d-flex align-center justify-space-between">
          <p>
            {{ sectionProduct.title }}
          </p>
          <div class="d-flex ga-2 text-primary">
            <span>
              {{ sectionProduct.amount }}
            </span>
            <span>></span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
const sectionProducts = ref([
  { title: "ออกเเบบ", amount: 3 },
  { title: "พิมพ์", amount: 12 },
  { title: "เย็บเข้าเล่ม", amount: 21 },
  { title: "แพ็ค", amount: 32 },
  { title: "พร้อมจัดส่ง", amount: 12 },
]);
</script>
