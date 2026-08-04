<template>
    <template v-if="text?.length">
        <p v-for="(i, k) in text" :key="k" v-bind="$attrs">{{ i }}</p>
    </template>
</template>

<script setup lang="ts">
interface Props {
    text?: string[]
}

withDefaults(defineProps<Props>(), {
    text: () => [],
})
</script>
