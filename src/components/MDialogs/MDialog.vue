<template>
    <div class="wrapper">
        <div class="ty-heading-2">{{ props.name }}</div>
        <div class="main">
            <div class="main__left"><slot name="left-side" /></div>
            <div class="main__right"><slot name="right-side" /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    name: string
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.wrapper {
    max-height: 100%;
    padding-top: 32px;
    display: grid;
    grid-template-rows: auto 1fr;
}

.main {
    display: grid;
    width: 100%;
    grid-template-columns: 4fr 8fr;
    column-gap: 24px;
    overflow-y: auto;

    &__left {
        width: 100%;
        max-height: 100%;
        overflow-y: auto;
    }

    &__right {
        width: 100%;
        max-height: 100%;
        overflow-y: auto;
    }
}
</style>
