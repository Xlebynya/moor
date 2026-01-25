import { ref, watch, readonly } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'app-theme'

export const getStoredTheme = (): Theme | null => {
    if (typeof window === 'undefined') return null

    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
        return stored
    }
    return null
}

const getSystemTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
}

class ThemeStore {
    private theme = ref<Theme>('light')

    constructor() {
        this.initThemeSync()
    }

    private initThemeSync = () => {
        if (typeof window !== 'undefined') {
            const storedTheme = getStoredTheme()
            const systemTheme = getSystemTheme()
            const initialTheme = storedTheme || systemTheme

            this.setThemeImmediate(initialTheme)
        }
    }

    private setThemeImmediate = (newTheme: Theme) => {
        this.theme.value = newTheme
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('app-theme', newTheme)
        }
    }

    public setTheme = (newTheme: Theme) => {
        this.theme.value = newTheme
    }

    public toggleTheme = () => {
        const newTheme = this.theme.value === 'light' ? 'dark' : 'light'
        this.setTheme(newTheme)
    }

    public getTheme = () => {
        return this.theme.value
    }

    public readonlyTheme = readonly(this.theme)

    public subscribe = () => {
        return watch(
            this.theme,
            (newTheme) => {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(STORAGE_KEY, newTheme)
                }
                if (typeof document !== 'undefined') {
                    document.documentElement.setAttribute('app-theme', newTheme)
                }
            },
            { immediate: true },
        )
    }
}

let _themeInstance: ThemeStore | null = null

const getThemeInstance = (): ThemeStore => {
    if (!_themeInstance) {
        _themeInstance = new ThemeStore()
    }
    return _themeInstance
}

export const useTheme = () => {
    const store = getThemeInstance()

    store.subscribe()

    return {
        theme: store.readonlyTheme,
        toggleTheme: store.toggleTheme,
        setTheme: store.setTheme,
        getTheme: store.getTheme,
    }
}

export const initializeAppTheme = () => {
    if (typeof window !== 'undefined') {
        const storedTheme = getStoredTheme()
        const systemTheme = getSystemTheme()
        const initialTheme = storedTheme || systemTheme

        if (document.documentElement) {
            document.documentElement.setAttribute('app-theme', initialTheme)
        }
    }
}
