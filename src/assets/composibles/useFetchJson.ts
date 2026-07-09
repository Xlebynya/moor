import { ref } from 'vue'

export function useFetchJson(file: string) {
    const data = ref(null)
    const error = ref(null)
    const loading = ref(true)

    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.statusText}`)
            }
            return response.json()
        })
        .then(jsonData => {
            data.value = jsonData
        })
        .catch(err => {
            error.value = err
            console.error('Ошибка при загрузке JSON:', err)
        })
        .finally(() => {
            loading.value = false
        })

    return { data, error, loading }
}