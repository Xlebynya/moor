import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import KnowledgeBase from '@/views/KnowledgeBase/KnowledgeBase.vue'
import NotFound from '@/views/404/NotFound.vue'
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
            redirect: '/knowlage/characters',
            component: KnowledgeBase,
            children: [
                {
                    path: ':category',
                    name: 'knowledge-category',
                    component: () =>
                        import('@/views/KnowledgeBase/Components/List.vue'),
                },
                {
                    path: 'characters/:name',
                    component: () =>
                        import(
                            '@/views/KnowledgeBase/Knowlage/Characters/CharacterId.vue'
                        ),
                },
            ],
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
            path: '/settings',
            name: 'settings',
            component: () => import('@/views/Settings/SettingsPage.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: NotFound,
        },
    ],
})

export default router
