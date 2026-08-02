<template>
    <button class="ty-btn-text-l ty-gray-4 backBtn" @click="router.back">
        <m-icon icon="triangleLeft" :size="24" />
        <span>Назад</span>
    </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
.backBtn {
    display: flex;
    align-items: center;
    padding: 8px 16px;
}
</style>
