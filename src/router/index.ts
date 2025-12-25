import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import KnowledgeBase from '@/views/KnowledgeBase/KnowledgeBase.vue'
import NotFound from '@/components/404/NotFound.vue'
import GameMaps from '@/views/Maps/GameMaps.vue'
import GamesLibrary from '@/views/Library/GamesLibrary.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/knowlage',
            name: 'knowlage',
            component: KnowledgeBase,
        },
        {
            path: '/maps',
            name: 'maps',
            component: GameMaps,
        },
        {
            path: '/library',
            name: 'library',
            component: GamesLibrary,
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: NotFound,
        },
    ],
})

export default router
