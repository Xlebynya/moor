<template>
    <div class="wrapper">
        <div class="ty-heading-2 center">{{ props.name }}</div>
        <div class="main">
            <slot />
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
}

.main {
    width: 100%;
    overflow-y: auto;
}
</style>
