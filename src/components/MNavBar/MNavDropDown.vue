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
}

const displayItems = Object.values(routesMap)

const currentTab = computed({
    get: () => routesMap[route.name as string] || displayItems[0],
    set: (displayValue) => {
        const routeName = Object.keys(routesMap).find((key) => routesMap[key] === displayValue)
        if (routeName) {
            router.push({ name: routeName })
        }
    },
})
</script>
