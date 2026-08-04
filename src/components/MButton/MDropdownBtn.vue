<template>
    <div ref="rootEl" class="dropdown" v-bind="$attrs">
        <button
            class="dropdown__trigger"
            :class="{ 'dropdown__trigger--custom': $slots.activator }"
            type="button"
            @click="toggle"
        >
            <slot name="activator">
                <span class="dropdown__label">{{ selectedLabel }}</span>
                <m-icon
                    v-if="!hideIcon"
                    class="dropdown__chevron"
                    :class="{ 'dropdown__chevron--open': open }"
                    icon="triangleDown"
                    :size="18"
                />
            </slot>
        </button>
        <div v-if="open" class="dropdown__menu">
            <template v-for="(item, index) in items" :key="index">
                <div
                    v-if="showDivider(item, index)"
                    class="dropdown__divider"
                />
                <button
                    class="dropdown__item"
                    :class="{
                        'dropdown__item--active': item.value === modelValue,
                    }"
                    type="button"
                    @click="select(item)"
                >
                    {{ item.text }}
                </button>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { DropdownButtonItem } from './types'

interface Props {
    modelValue: DropdownButtonItem['value']
    items: DropdownButtonItem[]
    hideIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    hideIcon: false,
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: DropdownButtonItem['value']): void
}>()

const rootEl = ref<HTMLElement>()
const open = ref(false)

const selectedLabel = computed(() => {
    const selected = props.items.find(item => item.value === props.modelValue)
    return selected?.text ?? ''
})

const showDivider = (item: DropdownButtonItem, index: number) => {
    if (index === 0) return false
    return props.items[index - 1].group !== item.group
}

const toggle = () => {
    open.value = !open.value
}

const select = (item: DropdownButtonItem) => {
    emit('update:modelValue', item.value)
    open.value = false
}

const onDocumentClick = (e: MouseEvent) => {
    if (!rootEl.value?.contains(e.target as Node)) {
        open.value = false
    }
}

const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        open.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', onDocumentClick)
    document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
    document.removeEventListener('click', onDocumentClick)
    document.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped lang="scss">
.dropdown {
    position: relative;
    display: inline-block;

    &__trigger {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        height: 100%;
        padding: 8px 12px;
        border: 1px solid var(--primary-surface-border);
        border-radius: 8px;
        background-color: var(--primary-surface);
        color: var(--on-primary-surface);

        &--custom {
            padding: 0;
            border: none;
            border-radius: 0;
            background: none;
        }
    }

    &__label {
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__chevron {
        transition: transform 0.2s ease;
        color: var(--caption-text);

        &--open {
            transform: rotate(180deg);
        }
    }

    &__menu {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        z-index: 200;
        min-width: 100%;
        padding: 8px 0;
        border: 1px solid var(--primary-surface-border);
        border-radius: 8px;
        background-color: var(--primary-surface);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    &__item {
        display: block;
        width: 100%;
        padding: 8px 12px;
        text-align: left;
        color: var(--on-primary-surface);

        &:hover {
            background-color: var(--primary-bg--hover);
        }

        &--active {
            background-color: var(--primary-bg);
            color: var(--on-primary);

            &:hover {
                background-color: var(--primary-bg);
                color: var(--on-primary);
            }
        }
    }

    &__divider {
        height: 1px;
        margin-block: 4px;
        background-color: var(--light-border);
    }
}
</style>
