<template>
    <nav class="navbar">
        <div class="navbar__list">
            <div class="navbar__tabs">
                <MNavDropDown v-if="isMobile || isTablet" />
                <template v-else>
                    <MNavTabVue to="/">Главная</MNavTabVue>
                    <MNavTabVue to="/knowledge">База знаний</MNavTabVue>
                    <MNavTabVue to="/maps">Локации</MNavTabVue>
                    <MNavTabVue to="/library">Библиотека</MNavTabVue>
                </template>
            </div>
            <div v-if="!isMobile && !isTablet" class="navbar__settings">
                <MNavSettingTab />
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import MNavTabVue from './MNavTab.vue'
import MNavSettingTab from './MNavThemeSwitch.vue'
import MNavDropDown from './MNavDropDown.vue'
import { useBreakpoint } from '@/assets/composibles/useBreakpoins'
const { isMobile, isTablet } = useBreakpoint()
</script>

<style scoped src="./MNavBar.scss" lang="scss" />
