<template>
    <button class="navbar__tab icon ty-btn-text-l" @click="toggleTheme">
        <m-icon icon="themeSwitch" :size="24" />
    </button>
</template>

<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('app-theme', theme.value)
}

onMounted(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
        theme.value = savedTheme
    }
    document.documentElement.setAttribute('app-theme', theme.value)
})

watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
})
</script>
