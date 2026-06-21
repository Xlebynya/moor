<template>
    <p v-for="(i, k) in text" :key="k" v-bind="$attrs">{{ i }}</p>
</template>

<script setup lang="ts">
interface Props {
    text: string[]
}
defineProps<Props>()
</script>
