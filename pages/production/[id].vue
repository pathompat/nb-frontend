<template>
  <CardDetail :id="+id" />
</template>
<script setup lang="ts">
import CardDetail from "@/components/production/cardDetail.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const { id } = route.params as { id: string };
</script>
