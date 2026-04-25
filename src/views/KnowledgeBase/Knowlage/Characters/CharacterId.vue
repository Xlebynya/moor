<template>
    <ItemId>
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
            <span class="ty-heading-6">История</span>
            <div class="character__main-info">
                <img
                    v-if="character.avatar_img"
                    :alt="character.name"
                    class="character__img"
                    :src="character.avatar_img"
                />
                <div>
                    <p v-for="(p, i) in character.history" :key="i">
                        {{ p }}
                    </p>
                </div>
            </div>
        </template>
        <template #footer>
            <div v-if="hasRelations" class="character__footer">
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
import { computed, Ref, ref } from 'vue'
import ItemId from '@/views/KnowledgeBase/Components/ItemId.vue'
import { CharacterData } from '@/views/KnowledgeBase/Knowlage/types'
import { useKnowlageBase } from '@/views/KnowledgeBase/useKnowlageBase.ts'

const { itemData } = useKnowlageBase()
const character = ref(itemData) as Ref<CharacterData>

const hasRelations = computed(() => {
    return !!character.value?.related_characters?.length
})
</script>

<style scoped lang="scss">
.breadcrumb {
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
}

.character {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__header {
        display: flex;
        gap: 16px;
    }

    &__main-info {
    }

    &__footer {
    }

    &__img {
        max-width: 150px;
        float: right;
        margin-left: 8px;
    }
}
</style>
