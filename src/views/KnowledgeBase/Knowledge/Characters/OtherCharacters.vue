<template>
    <ItemId v-if="characters">
        <template #header>
            <span class="ty-heading-3">Прочие персонажи</span>
        </template>
        <template v-if="characters?.length > 0" #default>
            <p v-for="(char, id) in characters" :key="id">
                <span class="font-medium"> {{ char.name }}: </span>
                {{ char.shortDescription }}.
            </p>
        </template>
    </ItemId>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemId from '@/views/KnowledgeBase/Components/ItemId.vue'

interface IOtherCharacter {
    name: string
    shortDescription?: string[]
}
const characters = ref<IOtherCharacter[]>([])

const fetchCharacters = async () => {
    try {
        const response = await fetch('/KnowledgeBase/Characters/Прочие.json')
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        characters.value = await response.json()
    } catch (error) {
        console.error('Ошибка при загрузке JSON:', error)
        characters.value = []
    }
}

onMounted(fetchCharacters)
</script>

<style scoped lang="scss"></style>
