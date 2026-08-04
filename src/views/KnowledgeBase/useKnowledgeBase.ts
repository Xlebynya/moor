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

const categories = ref<Category[]>([])
const categoryItems = ref<CategoryItem[]>([])
const categoriesLoading = ref(false)
const categoryItemsLoading = ref(false)

const fetchCategories = async () => {
    categoriesLoading.value = true
    try {
        const response = await fetch(`/KnowledgeBase/Categories.json`)
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.statusText}`)
        }
        categories.value = await response.json()
    } catch (error) {
        categories.value = []
        console.error('Ошибка при загрузке JSON:', error)
    } finally {
        categoriesLoading.value = false
    }
}
const fetchCategoryItems = async (category: string) => {
    categoryItemsLoading.value = true
    try {
        const response = await fetch(`/KnowledgeBase/CategoryItems.json`)
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.statusText}`)
        }
        const data = await response.json()
        categoryItems.value = data[category]
    } catch (error) {
        categoryItems.value = []
        console.error('Ошибка при загрузке JSON:', error)
    } finally {
        categoryItemsLoading.value = false
    }
}

export function useknowledgeBase() {
    const route = useRoute()
    const isRoot = computed(() => route.path === '/knowledge')

    const categoryTitle = computed(() => {
        return categories.value.find(el => el.path === route.path)?.title
    })

    watch(
        () => route.params.category,
        () => {
            fetchCategoryItems(route.params.category as string)
            fetchCategories()
        },
        { immediate: true }
    )

    return {
        categoryItems,
        categoryItemsLoading,
        categories,
        categoriesLoading,
        isRoot,
        categoryTitle,
        fetchCategories,
    }
}
