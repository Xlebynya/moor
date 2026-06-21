<template>
    <div>
        <div v-if="!isDesktop" class="title-row">
            <div>
                <MBackBtn />
            </div>
            <div class="ty-heading-2">
                {{ categoryTitle }}
            </div>
        </div>
        <div class="filter-row"></div>
        <div class="grid-wrapper">
            <MCard
                v-for="(categoryItem, id) in categoryItems"
                :key="id"
                as="router-link"
                :subtitle="categoryItem.subtitle"
                :title="categoryItem.title"
                :to="$route.path + '/' + categoryItem.route_title"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBreakpoint } from '@/assets/composibles/useBreakpoins'
import MCard from '@/components/MCard/MCard.vue'
import { useknowledgeBase } from '@/views/KnowledgeBase/useknowledgeBase'
import { MBackBtn } from '@/components'
const { categoryItems, categoryTitle } = useknowledgeBase()
const { isDesktop } = useBreakpoint()
</script>

<style scoped lang="scss">
.filter-row {
    height: 48px;
}
.title-row {
    display: grid;
    padding-top: 32px;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
}

.grid-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 8px;
    justify-items: center;
}
</style>
