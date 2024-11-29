<template>
  <v-select v-model="model" :items="items"></v-select>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const items = ref<{ title: string; value: string }[]>([]);

const props = defineProps<{
  items: { title: string; value: string }[];
}>();

const model = ref<string | null>(null);
</script>
