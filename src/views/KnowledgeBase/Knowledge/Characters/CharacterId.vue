<template>
    <ItemId v-if="character">
        <template #header>
            <span class="ty-heading-3">{{ character.name }}</span>
            <span
                v-if="character.subtitle"
                class="ty-heading-5"
                style="color: var(--caption-text)"
            >
                {{ character.subtitle }}
            </span>
        </template>
        <template #default>
            <img
                v-if="character.avatar"
                :alt="character.name"
                class="character__img"
                :src="character.avatar"
            />
            <div class="character__main-info">
                <div v-if="character.history">
                    <span class="ty-heading-6">История</span>
                    <p v-for="(p, i) in character.history" :key="i">
                        {{ p }}
                    </p>
                </div>
                <div v-if="character.about">
                    <span class="ty-heading-6">О персонаже</span>
                    <p v-for="(p, i) in character.about" :key="i">
                        {{ p }}
                    </p>
                </div>
            </div>
        </template>
        <template v-if="hasRelations" #footer>
            <div class="character__footer">
                Связанные персонажи:
                <router-link
                    v-for="(relation, index) in character.related_characters"
                    :key="index"
                    :to="relation.path"
                >
                    {{ relation.title }}
                </router-link>
            </div>
        </template>
    </ItemId>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ItemId from '@/views/KnowledgeBase/Components/ItemId.vue'
import { useRoute } from 'vue-router'

interface ICharacter {
    name: string
    subtitle?: string
    history?: string[]
    about?: string[]
    avatar?: string //путь к файлу
    related_characters: { path: string; title: string }[]
}
const route = useRoute()
const character = ref<ICharacter>()

const fetchCharacters = async (name: string) => {
    try {
        const response = await fetch(`/KnowledgeBase/Characters/${name}.json`)
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.statusText}`)
        }
        character.value = await response.json()
    } catch (error) {
        character.value = undefined
        console.error('Ошибка при загрузке JSON:', error)
    }
}

watch(
    () => route.params.name,
    to => {
        if (to) fetchCharacters(to as string)
    },
    { immediate: true }
)

const hasRelations = computed(() => {
    return !!character.value?.related_characters?.length
})
</script>

<style scoped lang="scss">
.character {
    &__img {
        max-width: 150px;
        float: right;
        margin-left: 8px;
    }
    &__main-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
}
</style>
