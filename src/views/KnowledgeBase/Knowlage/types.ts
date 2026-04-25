type Text = string[];
type Link = {title: string, path: string}

// интерфейсы карточек
interface CharacterData {
    name: string
    subtitle?: string
    history: Text
    avatar_img?: string // путь к файлу
    related_characters?: Link[]
}

export type {
    CharacterData,
}
