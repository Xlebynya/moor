<template>
    <router-link
        :to="to"
        class="navbar__tab ty-btn-text-l"
        :class="{ 'navbar__tab--active': isActive }"
    >
        <slot />
    </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const props = defineProps({
    to: { type: String, required: true },
})
const route = useRoute()
const isActive = computed(() => {
    if (!props.to || props.to === '/') {
        return route.path === '/'
    }
    return route.path.startsWith(props.to)
})
</script>
