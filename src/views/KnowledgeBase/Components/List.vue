<template>
    <div>
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
import MCard from '@/components/MCard/MCard.vue'
import { useknowledgeBase } from '@/views/KnowledgeBase/useknowledgeBase'
const { categoryItems } = useknowledgeBase()
</script>

<style scoped lang="scss">
.filter-row {
    height: 48px;
}

.grid-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}
</style>
