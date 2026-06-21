import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface Category {
    id: string
    title: string
    path: string
}

interface CategoryItem {
    id: string
    title: string
    route_title: string
    subtitle: string | null
}

export function useknowledgeBase() {
    const route = useRoute()
    const isRoot = computed(() => route.path === '/knowledge');
    const categories = ref<Category[]>([])
    const categoryItems = ref<CategoryItem[]>([])

    const fetchCategories = async () => {
        try {
            const response = await fetch(
                `/KnowledgeBase/Categories.json`
            )
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.statusText}`)
            }
            const data = await response.json()
            categories.value = data
        } catch (error) {
            categories.value = []
            console.error('Ошибка при загрузке JSON:', error)
        }
    }
    const fetchCategoryItems = async (category: string) => {
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

    const categoryTitle = computed(()=> {return categories.value.find(el => el.path === route.path)?.title})

    watch(() => route.params.category, () => {fetchCategoryItems(route.params.category as string); fetchCategories();}, {immediate: true})

    return {
        categoryItems,
        isRoot,
        categoryTitle,
        categories,
        fetchCategories
    }
}
