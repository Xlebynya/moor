<template>
    <button class="ty-btn-text ty-gray-4 backBtn" @click="$router.back">
        <!-- <MIcon icon="triangleLeft" size="24" /> -->
        <span> Назад </span>
    </button>
</template>

<style scoped>
.backBtn {
    /* padding: 8px; */
    display: flex;
    align-items: center;
    gap: 4px;
}
</style>
