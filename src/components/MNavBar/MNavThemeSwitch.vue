<template>
    <button class="navbar__tab icon ty-btn-text-l" @click="toggleTheme">
        <m-icon icon="themeSwitch" :size="24" />
    </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/assets/composibles/useTheme.ts'

const { toggleTheme } = useTheme()
</script>
