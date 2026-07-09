<template>
    <div>
        <MDialog v-if="isDesktop" name="База знаний">
            <template #left-side>
                <CategoryList />
            </template>
            <template #right-side><RouterView /></template>
        </MDialog>
        <template v-else>
            <MDialogMobile v-if="isRoot" name="База знаний">
                <CategoryList />
            </MDialogMobile>
            <RouterView v-else />
        </template>
    </div>
</template>

<script setup lang="ts">
import MDialog from '@/components/MDialogs/MDialog.vue'
import MDialogMobile from '@/components/MDialogs/MDialogMobile.vue'
import CategoryList from './Components/Categories.vue'

import { useBreakpoint } from '@/assets/composibles/useBreakpoins'
import { useknowledgeBase } from './useKnowledgeBase'

const { isDesktop } = useBreakpoint()

const { isRoot } = useknowledgeBase()
</script>

<style scoped></style>
