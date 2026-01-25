<template>
    <header class="app__header">
        <MNavBar />
    </header>
    <main class="app__main">
        <RouterView class="app__content" />
    </main>
</template>

<script setup lang="ts"></script>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MNavBar from './components/MNavBar'
import { onMounted } from 'vue'
import { initializeAppTheme } from '@/assets/composibles/useTheme.ts'

onMounted(() => {
    initializeAppTheme()
})
</script>
