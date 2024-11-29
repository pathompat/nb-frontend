<template>
  <slot :data="props.data"></slot>
</template>

<script lang="ts" setup generic="T">
import { defineProps, ref } from "vue";

const props = defineProps<{
  data: T;
}>();
</script>
