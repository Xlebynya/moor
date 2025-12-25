<template>
    <MDropdownBtn
        v-model="currentTab"
        :items="displayItems"
        class="w-full ty-btn-text"
        activatorClass="navbar__tab ty-btn-text-l"
        v-bind="$attrs"
    >
    </MDropdownBtn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MDropdownBtn from '../MButton/MDropdownBtn.vue'

const route = useRoute()
const router = useRouter()

const routesMap = {
    home: 'Главная',
    knowlage: 'База знаний',
    maps: 'Карты',
    library: 'Библиотека',
} as const

type RouteKey = keyof typeof routesMap

const displayItems = Object.values(routesMap)

const currentTab = computed({
    get: () => {
        const routeName = route.name as string | symbol
        if (typeof routeName === 'string' && routeName in routesMap) {
            return routesMap[routeName as RouteKey] || displayItems[0]
        }
        return displayItems[0]
    },
    set: (displayValue: string) => {
        const routeName = Object.keys(routesMap).find(
            (key) => routesMap[key as RouteKey] === displayValue,
        )
        if (routeName) {
            router.push({ name: routeName })
        }
    },
})
</script>
