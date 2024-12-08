<template>
    <v-row>
        <v-col v-for="(sectionProduct, index) in sectionProducts" :key="index">
            <v-card elevation="2" class="pa-4 rounded-card hover-card">
                <v-card-text class="d-flex align-center justify-space-between">
                    <div class="d-flex flex-column justify-start ga-1">
                        <v-icon
                            :style="{ color: sectionProduct.color }"
                            class="mr-3"
                            size="36"
                        >
                            {{ sectionProduct.icon }}
                        </v-icon>
                        <p
                            class="mb-0 font-weight-bold text-title"
                            style="font-size: 1.2rem"
                        >
                            {{ sectionProduct.title }}
                        </p>
                    </div>
                    <div>
                        <span
                            class="font-weight-bold text-amount"
                            :style="{
                                color: sectionProduct.color,
                                fontSize: '2.5rem',
                            }"
                        >
                            {{ sectionProduct.amount }}
                        </span>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
const sectionProducts = ref([
    { title: 'ออกเเบบ', amount: 3, icon: 'mdi-pencil-ruler', color: '#5E60CE' },
    { title: 'พิมพ์', amount: 12, icon: 'mdi-printer', color: '#4C566A' },
    {
        title: 'เย็บเข้าเล่ม',
        amount: 21,
        icon: 'mdi-book-open-blank-variant',
        color: '#0081A7',
    },
    {
        title: 'แพ็ค',
        amount: 32,
        icon: 'mdi-package-variant',
        color: '#F4A261',
    },
    {
        title: 'พร้อมจัดส่ง',
        amount: 12,
        icon: 'mdi-truck-delivery',
        color: '#2A9D8F',
    },
])
</script>
