<template>
    <div class="container">
        <div class="hero__text">
            <div class="ty-hero-title-1 primary-text">МООР</div>
            <div
                class="ty-hero-subtitle-1"
                style="padding-inline: 8px; text-align: center"
            >
                Город, в котором оживают истории
            </div>
        </div>
        <MChangelog :limit="5" />
    </div>
</template>
<script lang="ts" setup>
import MChangelog from '@/components/MChangelog/MСhangelog.vue'
</script>
<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    align-items: center;
    height: 100%;

    .hero__text {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
    }
}
</style>
