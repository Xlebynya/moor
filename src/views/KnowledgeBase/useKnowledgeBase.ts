import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface CategoryItem {
    id: string
    title: string
    route_title: string
    subtitle: string | null
}

export function useknowledgeBase() {
    const route = useRoute()
    const categoryItems = ref<CategoryItem[]>([])

    const fetchCategory = async (category: string) => {
        try {
            const response = await fetch(
                `/KnowledgeBase/CategoryItems.json`
            )
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.statusText}`)
            }
            const data = await response.json()
            categoryItems.value = data[category]
        } catch (error) {
            categoryItems.value = []
            console.error('Ошибка при загрузке JSON:', error)
        }
    }
    

    watch(() => route.params.category, () => fetchCategory(route.params.category as string), {immediate: true})

    return {
        categoryItems,
    }
}
