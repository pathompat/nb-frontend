<template>
    <div class="d-flex ga-2 align-center">
        <v-btn
            v-if="props.path"
            variant="text"
            @click="$router.push({ path: props.path })"
            icon
            color="black"
        >
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1>{{ props.title }}</h1>
    </div>
    <div>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string
    path?: string
}>()
</script>
