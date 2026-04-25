<template>
    <MCard
        class="size-reset list-item"
        :class="{ 'list-item--chosen': props.active }"
        v-bind="$attrs"
    >
        <span class="ty-heading-4">
            <slot />
        </span>
    </MCard>
</template>

<script setup lang="ts">
import MCard from '@/components/MCard/MCard.vue'

interface Props {
    active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    active: false,
})
</script>

<style scoped lang="scss">
.list-item {
    padding: 16px;

    &--chosen {
        background-color: var(--primary-bg);
        border-color: var(--primary-border);
        color: var(--on-primary);
    }
}
</style>
