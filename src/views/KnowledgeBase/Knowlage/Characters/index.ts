import { type ICategoryItem } from '@/views/KnowledgeBase/useKnowlageBase'
import CharactersData from './CharactersData'

// Поля для фильтрации
export interface ICharacter extends ICategoryItem {
    // name: string
    playerName?: string
}

const Characters: ICharacter[] = [
    {
        id: 0,
        title: 'Дрейн',
        subtitle: 'Вечная спутница',
        data: CharactersData.Drain,

        // name: 'Дрейн',
        // playerName: 'Мастер',
    },
    {
        id: 1,
        title: 'Тауриель',
        subtitle: 'Воинственная эльфийка',
        data: CharactersData.Tauriel,

        // name: 'Тауриель',
        // playerName: 'Лиза',
    },
]

export default Characters
