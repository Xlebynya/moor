<template>
    <Transition name="loader-fade">
        <MLoader v-if="loading" fullscreen />
    </Transition>
    <header class="app__header">
        <MNavBar />
    </header>
    <main class="app__main">
        <RouterView class="app__content" />
    </main>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import MLoader from './components/MLoader/MLoader.vue'
import MNavBar from './components/MNavBar'
import { initializeAppTheme } from '@/assets/composibles/useTheme.ts'

const router = useRouter()

const loading = ref(false)

const waitForFonts = async () => {
    if (document.fonts) {
        await document.fonts.ready
    }
}

const hideInitialLoader = async () => {
    loading.value = true
    try {
        await Promise.all([waitForFonts(), router.isReady()])
        await nextTick()
        await new Promise(resolve => setTimeout(resolve, 300))
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    initializeAppTheme()
    hideInitialLoader()
})
</script>

<style scoped lang="scss">
.loader-fade-enter-active,
.loader-fade-leave-active {
    transition: opacity 0.1s ease;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
    opacity: 0;
}
</style>
