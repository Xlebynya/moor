<template>
    <ItemId title="Девять старших богов">
        <div class="flex-column gap-4">
            <div style="margin-bottom: 8px">
                {{ preamb }}
            </div>
            <p v-for="(god, id) in gods" :key="id">
                <span class="font-medium"> {{ god.name }} </span>
                <MText
                    v-if="god.shortDescription?.length > 1"
                    style="margin-left: 8px"
                    :text="god.shortDescription"
                />
                <span v-else>
                    : {{ getShortDescription(god.shortDescription) }}</span
                >
            </p>
            <div style="margin-top: 8px">
                <MText :text="story" />
            </div>
        </div>
    </ItemId>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemId from '@/views/KnowledgeBase/Components/ItemId.vue'

interface IElderNine {
    name: string
    shortDescription: string[]
}
const preamb = ref<string[]>([])
const gods = ref<IElderNine[]>([])
const story = ref<string[]>([])

const fetchGods = async () => {
    try {
        const response = await fetch('/KnowledgeBase/Gods/Девять старших.json')
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()
        gods.value = data.gods
        preamb.value = data.preamb
        story.value = data.story
    } catch (error) {
        console.error('Ошибка при загрузке JSON:', error)
        gods.value = []
    }
}

const getShortDescription = (text: string[]) => {
    return text[0]
}

onMounted(fetchGods)
</script>

<style scoped lang="scss"></style>
