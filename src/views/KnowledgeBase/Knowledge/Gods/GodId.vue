<template>
    <ItemId>
        <template #header>
            <span class="ty-heading-3">{{ god.name }}</span>
            <span
                v-if="god.subtitle"
                class="ty-heading-5"
                style="color: var(--caption-text)"
            >
                {{ god.subtitle }}
            </span>
        </template>
        <template #default> </template>
        <template #footer> </template>
    </ItemId>
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref, watch } from 'vue'
import ItemId from '@/views/KnowledgeBase/Components/ItemId.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const god = ref({})
</script>
