<template>
    <div class="wrapper">
        <div class="filter-row"></div>
        <div class="grid-wrapper">
            <MCard
                v-for="categoryItem in categoryItems"
                :key="categoryItem.id"
                as="router-link"
                :subtitle="categoryItem.subtitle"
                :title="categoryItem.title"
                :to="$route.path + '/' + categoryItem.title"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import MCard from '@/components/MCard/MCard.vue'
import { useKnowlageBase } from '@/views/KnowledgeBase/useKnowlageBase'

const { categoryItems } = useKnowlageBase()
</script>

<style scoped lang="scss">
.wrapper {
}

.filter-row {
    height: 48px;
}

.grid-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}
</style>
