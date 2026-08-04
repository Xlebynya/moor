<template>
    <div class="wrapper">
        <div class="setting">
            <span class="setting__label"> Тема </span>
            <MDropdownBtn
                v-model="theme"
                :items="selectorThemes"
                @update:model-value="setTheme($event as Theme)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import MDropdownBtn from '@/components/MButton/MDropdownBtn.vue'
import { DropdownButtonItem } from '@/components/MButton/types'
import type { Theme } from '@/assets/composibles/useTheme'
import { useTheme } from '@/assets/composibles/useTheme'

const selectorThemes = [
    { text: 'Темная', value: 'dark' },
    { text: 'Светлая', value: 'light' },
] as DropdownButtonItem[]

const { setTheme, theme } = useTheme()
</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding-top: 16px;
    row-gap: 16px;
    width: 100%;

    .setting {
        display: inline-flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding-inline: 32px;

        &__label {
            font-weight: 500; //medium
        }
    }
}
</style>
