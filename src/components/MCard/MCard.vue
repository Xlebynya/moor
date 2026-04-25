<template>
    <component :is="as" class="card">
        <slot>
            <div class="card__content">
                <div class="ty-heading-6 center" v-if="props.title">
                    {{ props.title }}
                </div>
                <div class="ty-caption center" v-if="props.subtitle">
                    {{ props.subtitle }}
                </div>
            </div>
        </slot>
    </component>
</template>

<script setup lang="ts">
interface Props {
    as?: string
    title?: string | null
    subtitle?: string | null
}

const props = withDefaults(defineProps<Props>(), {
    as: 'div',
    title: null,
    subtitle: null,
})
</script>

<style scoped lang="scss">
.card {
    text-align: inherit;
    background-color: var(--primary-surface);
    color: var(--on-primary-surface);
    border: solid 1px var(--primary-surface-border);
    border-radius: 8px;
    min-width: 100px;
    max-width: 300px;
    width: 100%;
    min-height: 100px;
    max-height: 150px;
    height: 100%;
    padding: 8px;

    &__content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>
