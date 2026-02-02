<template>
    <MDropdownBtn
        v-model="currentTab"
        :items="routesMap"
        class="navbar__tab ty-btn-text-l"
        style="width: 100%;"
        v-bind="$attrs"
        hide-icon
    >
        <template #activator>
            <m-icon icon="menu" size="24" />
        </template>
    </MDropdownBtn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MDropdownBtn from '../MButton/MDropdownBtn.vue'
import { useBreakpoint } from '@/assets/composibles/useBreakpoins'
import { DropdownButtonItem } from '../MButton/types'

const route = useRoute()
const router = useRouter()

const { isMobile, isTablet } = useBreakpoint()

const routesMap = [
    {
        text: 'Главная',
        value: 'home',
    },
    {
        text: 'База знаний',
        value: 'knowlage',
    },
    {
        text: 'Карты',
        value: 'maps',
    },
    {
        text: 'Библиотека',
        value: 'library',
    },
] as DropdownButtonItem[]

if (isMobile || isTablet)
    routesMap.push({
        text: 'Настройки',
        value: 'settings',
        group: 'smallView',
    })

const currentTab = computed({
    get() {
        return route.name
    },
    set(name) {
        router.push({ name: name })
    },
})
</script>
