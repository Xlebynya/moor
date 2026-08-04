<template>
    <ItemId :loading="loading">
        <template #header>
            <span v-if="god" class="ty-heading-3">{{ god.name }}</span>
            <span
                v-if="god?.subtitle"
                class="ty-heading-5"
                style="color: var(--caption-text)"
            >
                {{ god.subtitle }}
            </span>
        </template>
        <template #default>
            <template v-if="god">
                <img
                    v-if="god.avatar"
                    :alt="god.name"
                    class="god__img"
                    :src="god.avatar"
                />
                <div v-if="god.about" class="god__main-info">
                    <span class="ty-heading-6">О божестве</span>
                    <p v-for="(p, i) in god.about" :key="i">
                        {{ p }}
                    </p>
                </div>
            </template>
        </template>
    </ItemId>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ItemId from '@/views/KnowledgeBase/Components/ItemId.vue'
import { useRoute } from 'vue-router'

interface IGod {
    name: string
    subtitle?: string
    about?: string[]
    avatar?: string //путь к файлу
}
const route = useRoute()
const god = ref<IGod>()
const loading = ref(false)

const fetchData = async (name: string) => {
    loading.value = true
    try {
        const response = await fetch(`/KnowledgeBase/Gods/${name}.json`)
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.statusText}`)
        }
        god.value = await response.json()
    } catch (error) {
        god.value = undefined
        console.error('Ошибка при загрузке JSON:', error)
    } finally {
        loading.value = false
    }
}

watch(
    () => route.params.name,
    to => {
        if (to) fetchData(to as string)
    },
    { immediate: true }
)
</script>

<style scoped lang="scss">
.god {
    &__img {
        max-width: 150px;
        float: right;
        margin-left: 8px;
    }
    &__main-info {
        display: flex;
        flex-direction: column;
    }
}
</style>
