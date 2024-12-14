<template>
    <div class="d-flex ga-2 align-center">
        <v-btn
            v-if="props.path"
            variant="text"
            @click="router.push({ path: props.path })"
            icon
            color="black"
        >
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <slot name="header"><h1>ชื่อ</h1></slot>
    </div>
    <div>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
const router = useRouter()
const props = defineProps<{
    path?: string
}>()
</script>
