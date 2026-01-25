import { ref, computed, onMounted, onUnmounted } from 'vue'

const BREAKPOINTS = {
    mobile: 425,
    tablet: 768,
}

export function useBreakpoint() {
    const currentWidth = ref(window.innerWidth)

    const updateWidth = () => {
        currentWidth.value = window.innerWidth
    }

    onMounted(() => {
        updateWidth()
        window.addEventListener('resize', updateWidth)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateWidth)
    })

    const isMobile = computed(() => currentWidth.value <= BREAKPOINTS.mobile)
    const isTablet = computed(
        () => currentWidth.value > BREAKPOINTS.mobile && currentWidth.value <= BREAKPOINTS.tablet,
    )
    const isDesktop = computed(() => currentWidth.value > BREAKPOINTS.tablet)

    return {
        isMobile,
        isTablet,
        isDesktop,
    }
}
