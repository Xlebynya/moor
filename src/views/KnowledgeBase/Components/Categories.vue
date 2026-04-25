<template>
    <div class="wrapper">
        <MListElement
            v-for="item in categories"
            :key="item.id"
            :active="item.active"
            as="router-link"
            style="justify-content: left"
            :to="{ path: item.path }"
        >
            {{ item.title }}
        </MListElement>
    </div>
</template>

<script setup lang="ts">
import MListElement from '@/components/MList/MListElement.vue'
import { useKnowlageBase } from '@/views/KnowledgeBase/useKnowlageBase'

const { categories } = useKnowlageBase()
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
