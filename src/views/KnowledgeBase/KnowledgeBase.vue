<template>
    <div>
        <MDialog v-if="isDesktop" name="База знаний">
            <template #left-side>
                <CategoryList />
            </template>
            <template #right-side><RouterView /></template>
        </MDialog>
        <div
            v-else
            class="ty-hero-subtitle-1 font-jost"
            style="
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
            "
        >
            Эта страница пока не поддерживается на узких экранах
        </div>
    </div>
</template>

<script setup lang="ts">
import MDialog from '@/components/MDialogs/MDialog.vue'
import CategoryList from './Components/Categories.vue'

import { useBreakpoint } from '@/assets/composibles/useBreakpoins'
const { isDesktop } = useBreakpoint()
</script>

<style scoped></style>
