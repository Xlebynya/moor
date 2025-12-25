import { ref, computed, onMounted, onUnmounted } from 'vue'

const BREAKPOINTS = {
    mobile: 425,
    tablet: 768,
}

const currentWidth = ref<number | null>(null)

const updateWidth = () => {
    currentWidth.value = window.innerWidth
}

export function useBreakpoint() {
    onMounted(() => {
        updateWidth()
        window.addEventListener('resize', updateWidth)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateWidth)
    })

    const isMobile = computed(() => (currentWidth.value ?? 0) <= BREAKPOINTS.mobile)
    const isTablet = computed(
        () =>
            (currentWidth.value ?? 0) > BREAKPOINTS.mobile &&
            (currentWidth.value ?? 0) <= BREAKPOINTS.tablet,
    )
    const isDesktop = computed(() => (currentWidth.value ?? 0) > BREAKPOINTS.tablet)

    return {
        isMobile,
        isTablet,
        isDesktop,
    }
}
