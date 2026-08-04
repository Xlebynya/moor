<template>
    <div class="loader" :class="{ 'loader--fullscreen': fullscreen }">
        <div class="loader__spinner" :style="spinnerStyle"></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    fullscreen?: boolean
    size?: number | string
}

const props = withDefaults(defineProps<Props>(), {
    fullscreen: false,
    size: 48,
})

const spinnerStyle = computed(() => {
    const size = typeof props.size === 'number' ? `${props.size}px` : props.size
    return { width: size, height: size }
})
</script>

<style scoped lang="scss">
.loader {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;

    &--fullscreen {
        position: fixed;
        inset: 0;
        z-index: 1000;
        padding: 0;
        background-color: var(--gray-bg);
    }

    &__spinner {
        border: 4px solid var(--primary-surface-border);
        border-top-color: var(--primary-5);
        border-radius: 50%;
        animation: loader-spin 0.8s linear infinite;
    }
}

@keyframes loader-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
