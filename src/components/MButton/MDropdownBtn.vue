<template>
    <div class="dropdown">
        <button
            @click="toggleDropdown"
            class="flex flex-nowrap items-center gap-[4px]"
            :class="activatorClass"
        >
            <span>{{ model || currentItem }}</span>
            <slot name="append" :is-active="isActive">
                <m-icon icon="triangleDown" size="16" :flip="isActive ? 'vertical' : null" />
            </slot>
        </button>

        <ul v-show="isActive" class="dropdown-menu">
            <li
                v-for="(item, index) in props.items"
                :key="index"
                @click="selectItem(item)"
                class="dropdown-item ty-btn-l"
            >
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'

const model = defineModel()

const props = defineProps({
    items: { type: Array<string>, required: true },
    activatorClass: { type: String, default: 'px-[12px] py-[8px]' },
})

const currentItem = computed(() => {
    return props.items[0]
})

const isActive = ref(false)

const toggleDropdown = () => {
    isActive.value = !isActive.value
}

const selectItem = (item: string) => {
    model.value = item
    isActive.value = false
}

// onClickOutside
const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.dropdown')) {
        isActive.value = false
    }
}
document.addEventListener('click', handleClickOutside)
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
.dropdown {
    position: relative;
    display: block;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    z-index: 200;
    list-style: none;
    width: fit-content;
    box-shadow:
        2px 2px 8px rgba(0, 0, 0, 0.1),
        -2px 2px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
    padding: 8px 12px;
    cursor: pointer;
    background-color: var(--gray-bg);

    &:hover {
        background-color: var(--gray-bg--hover);
    }
}
</style>
