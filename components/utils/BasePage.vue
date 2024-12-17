<template>
    <div class="d-flex ga-2 align-center">
        <v-btn
            v-if="path"
            variant="text"
            @click="handleClick"
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
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
    path?: string | (() => void)
}>()

function handleClick() {
    if (typeof props.path === 'string') {
        router.push({ path: props.path })
    } else if (typeof props.path === 'function') {
        props.path()
    }
}
</script>
