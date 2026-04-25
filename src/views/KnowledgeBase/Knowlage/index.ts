import { CharacterData } from './types'
import type { ICategory } from '@/views/KnowledgeBase/useKnowlageBase'

import Characters from '@/views/KnowledgeBase/Knowlage/Characters/index'

export const CATEGORIES: ICategory[] = [
    {
        id: 0,
        title: 'Персонажи',
        path: '/knowlage/characters',
        categoryItems: Characters,
    },
]

export type DataTypes = CharacterData
