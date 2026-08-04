<template>
    <div class="wrapper">
        <MLoader v-if="loading" :size="24" />
        <template v-else>
            <div v-for="(version, num) in changelog" :key="num">
                <div class="font-medium">{{ num }}</div>
                <m-text :text="version" />
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useFetchJson } from '@/assets/composibles/useFetchJson.ts'
import MLoader from '@/components/MLoader/MLoader.vue'
import MText from '../MText/MText.vue'
import { computed } from 'vue'

interface Props {
    // Сколько версия отображаем
    limit?: number
}

const props = withDefaults(defineProps<Props>(), { limit: 0 })

const { data, loading } = useFetchJson('/ChangeLog/Changelog.json')

type TChangelog = Record<string, string[]> | null

const changelog = computed<TChangelog>(() => {
    if (!data.value) return null

    const entries = Object.entries(data.value)
    if (props.limit > 0) {
        return Object.fromEntries(entries.slice(0, props.limit)) as TChangelog
    }

    return data.value
})
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>
