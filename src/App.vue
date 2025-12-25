<script setup lang="ts">
import { RouterView } from 'vue-router'
import MNavBar from './components/MNavBar'
</script>

<template>
    <header class="app__header">
        <MNavBar />
    </header>
    <main class="app__main">
        <RouterView class="app__content"/>
    </main>
</template>
