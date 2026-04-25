<template>
    <div class="breadcrumb"><MBackBtn @click="goBack" /></div>
    <div class="item">
        <div class="item__header">
            <slot name="header">
                <span class="ty-heading-3">{{ title }}</span>
            </slot>
        </div>
        <div class="item__main">
            <slot />
        </div>
        <MDivider v-if="$slots.footer" />
        <slot name="footer"></slot>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { MBackBtn, MDivider } from '@/components'

defineProps({
    title: { type: String, defaul: '' },
})

const router = useRouter()
const goBack = () => {
    router.go(-1)
}
</script>

<style scoped lang="scss">
.breadcrumb {
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
}

.item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__header {
        display: flex;
        align-items: baseline;
        gap: 16px;
    }

    &__main {
        display: block;
    }
}
</style>
