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
            path: '/knowledge',
            name: 'knowledge',
            component: KnowledgeBase,
            children: [
                {
                    path: ':category',
                    name: 'knowledge-category',
                    component: () =>
                        import('@/views/KnowledgeBase/Components/List.vue'),
                },
                {
                    path: 'characters/other',
                    component: () =>
                        import(
                            '@/views/KnowledgeBase/Knowledge/Characters/OtherCharacters.vue'
                        ),
                },
                {
                    path: 'characters/:name',
                    component: () =>
                        import(
                            '@/views/KnowledgeBase/Knowledge/Characters/CharacterId.vue'
                        ),
                },
                {
                    path: 'gods/:name',
                    component: () =>
                        import(
                            '@/views/KnowledgeBase/Knowledge/Gods/GodId.vue'
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
