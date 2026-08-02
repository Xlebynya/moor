<template>
    <div v-if="categories.length" class="wrapper">
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
    <MLoader v-else-if="categoriesLoading" :size="32" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MListElement from '@/components/MList/MListElement.vue'
import MLoader from '@/components/MLoader/MLoader.vue'
import { useBreakpoint } from '@/assets/composibles/useBreakpoins'
import { useknowledgeBase } from '@/views/KnowledgeBase/useKnowledgeBase'

const route = useRoute()
const { isDesktop } = useBreakpoint()

const { fetchCategories, categories, categoriesLoading } = useknowledgeBase()

const activeItem = computed(() => {
    if (!isDesktop) return null
    return categories.value.find(item => route.path.startsWith(item.path))
})

onMounted(() => fetchCategories())
</script>

<style scoped lang="scss">
.wrapper {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;

    @include tablet-and-mobile {
        margin-top: 16px;
    }
}
</style>
