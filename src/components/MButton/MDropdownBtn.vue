<template>
    <div ref="dropdownRef" class="dropdown-button">
        <button
            class="dropdown-button__activator"
            :class="{ 'dropdown-button__activator--disabled': !modelValue }"
            v-bind="$attrs"
            @click="toggle"
        >
            <slot
                :is-open="isOpen"
                name="activator"
                :text="activatorText"
                :value="modelValue"
            >
                <span>{{ modelValue ? selectedText : activatorText }}</span>
            </slot>

            <slot v-if="!hideIcon" :is-open="isOpen" name="icon">
                <m-icon
                    :flip="isOpen ? 'vertical' : null"
                    icon="triangleDown"
                    size="16"
                />
            </slot>
        </button>

        <Teleport v-if="isOpen" to="body">
            <div class="dropdown-button__menu" :style="menuStyle">
                <slot :close="close" name="before-items" />

                <template
                    v-for="(group, groupIndex) in groupedItems"
                    :key="groupIndex"
                >
                    <div
                        v-for="(item, itemIndex) in group.items"
                        :key="`${groupIndex}-${itemIndex}`"
                        class="dropdown-button__item"
                        :class="[
                            {
                                'dropdown-button__item--selected':
                                    isSelected(item),
                            },
                        ]"
                        :data-value="item.value"
                        @click="handleItemClick(item)"
                    >
                        <slot
                            :close="close"
                            :index="itemIndex"
                            :is-selected="isSelected(item)"
                            :item="item"
                            name="item"
                        >
                            <span class="dropdown-button__item-text">{{
                                item.text
                            }}</span>
                        </slot>
                    </div>

                    <hr
                        v-if="groupIndex < groupedItems.length - 1"
                        class="dropdown-button__divider"
                    />
                </template>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    computed,
    nextTick,
    onMounted,
    onUnmounted,
    useTemplateRef,
} from 'vue'
import { DropdownButtonItem } from './types'

interface GroupedItem {
    label: string | null
    items: DropdownButtonItem[]
}

interface Props {
    items: DropdownButtonItem[]
    activatorText?: string
    activatorClass?: string
    hideIcon?: boolean
    closeOnSelect?: boolean
    autoClose?: boolean
    groupBy?: string // Поле для группировки
    groupOrder?: string[] // Порядок групп
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    activatorText: 'Выберите',
    hideIcon: false,
    closeOnSelect: true,
    autoClose: true,
    groupBy: 'group',
    groupOrder: () => [],
})

const emit = defineEmits<{
    'update:modelValue': [value: any]
    change: [value: any, item: DropdownButtonItem]
    open: []
    close: []
    'click-outside': []
}>()

const dropdownRef = useTemplateRef('dropdownRef')
const isOpen = ref(false)
const menuStyle = ref({})

const groupedItems = computed<GroupedItem[]>(() => {
    const groupsMap = new Map<string | null, DropdownButtonItem[]>()

    props.items.forEach(item => {
        const groupKey = item.group || ''

        if (!groupsMap.has(groupKey)) {
            groupsMap.set(groupKey, [])
        }
        groupsMap.get(groupKey)!.push(item)
    })

    let orderedGroups: (string | null)[] = []

    if (props.groupOrder.length > 0) {
        orderedGroups = [
            ...props.groupOrder,
            ...Array.from(groupsMap.keys()).filter(
                key => !props.groupOrder.includes(key as string)
            ),
        ]
    } else {
        orderedGroups = Array.from(groupsMap.keys()).sort((a, b) => {
            if (a === null) return 1
            if (b === null) return -1
            return String(a).localeCompare(String(b))
        })
    }

    return orderedGroups.map(key => ({
        label: key,
        items: groupsMap.get(key) || [],
    }))
})

const selectedText = computed(() => {
    if (props.modelValue == null) return ''

    for (const item of props.items) {
        if (item.value === props.modelValue) {
            return item.text
        }
    }
    return ''
})

const isSelected = (item: DropdownButtonItem) => {
    return props.modelValue === item.value
}

const toggle = () => {
    if (isOpen.value) {
        close()
    } else {
        open()
    }
}

const open = async () => {
    if (isOpen.value) return

    isOpen.value = true
    emit('open')

    await nextTick()
    updateMenuPosition()
}

const close = () => {
    if (!isOpen.value) return

    isOpen.value = false
    emit('close')
}

const handleItemClick = (item: DropdownButtonItem) => {
    emit('update:modelValue', item.value)
    emit('change', item.value, item)

    if (props.closeOnSelect) {
        close()
    }
}

const updateMenuPosition = () => {
    if (!dropdownRef?.value) return

    const rect = dropdownRef.value.getBoundingClientRect()

    menuStyle.value = {
        position: 'absolute',
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        minWidth: `${rect.width}px`,
        zIndex: '600',
    }
}

// Обработка клика вне компонента
const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement

    if (
        isOpen.value &&
        props.autoClose &&
        dropdownRef?.value &&
        !dropdownRef.value.contains(target)
    ) {
        close()
        emit('click-outside')
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss" src="./MDropdownBtn.scss" />
