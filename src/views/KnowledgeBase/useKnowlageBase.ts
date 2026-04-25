import { computed, ComputedRef, Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { CATEGORIES, type DataTypes } from '@/views/KnowledgeBase/Knowlage/index'

export interface ICategoryItem {
    id: number
    title: string
    subtitle?: string
    data: DataTypes
}

type CategoryItems<T extends ICategoryItem = ICategoryItem> = T[]
export interface ICategory {
    id: number
    title: string
    path: string
    active?: boolean
    categoryItems: CategoryItems
}

export function useKnowlageBase() {
    const categories = ref(CATEGORIES) as Ref<ICategory[]>
    const route = useRoute()

    const deactivateCategory = (category: ICategory) => {
        category.active = false
    }

    const activeCategory = (category: ICategory) => {
        category.active = true
    }

    const chosenCategory = computed(() =>
        categories.value.find(item => route.path.startsWith(item.path))
    )

    categories.value.forEach(item => deactivateCategory(item))

    watch(
        () => chosenCategory.value,
        (to, from) => {
            if (to) activeCategory(to)
            if (from) deactivateCategory(from)
        },
        { immediate: true }
    )

    const categoryItems: ComputedRef<CategoryItems<ICategoryItem> | undefined> =
        computed(() => chosenCategory.value?.categoryItems)

    const chosenItem = computed(() =>
        categoryItems.value?.find(item => route.params.name === item.title)
    )

    const itemData: ComputedRef<DataTypes | undefined>  = computed(() => chosenItem.value?.data)

    return {
        categories,
        chosenCategory,
        categoryItems,
        itemData,
    }
}
