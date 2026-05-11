<template>
    <div v-if="categories" class="wrapper">
        <MListElement
            v-for="item in categories"
            :key="item.id"
            :active="item === activeItem"
            as="router-link"
            style="justify-content: left"
            :to="{ path: item.path }"
        >
            {{ item.title }}
        </MListElement>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MListElement from '@/components/MList/MListElement.vue'

const route = useRoute()

const categories = [
    { id: 'characters', title: 'Персонажи', path: '/knowledge/characters' },
    { id: 'gods', title: 'Боги', path: '/knowledge/gods' },
    // { id: 'locations', title: 'Локации', path: '/knowledge/locations' },
]

const activeItem = computed(() =>
    categories.find(item => route.path.startsWith(item.path))
)
</script>

<style scoped lang="scss">
.wrapper {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
}
</style>
