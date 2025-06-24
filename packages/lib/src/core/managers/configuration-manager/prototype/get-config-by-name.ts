import { IConfigurationManager } from '../interfaces/i-configuration-manager'

export const getConfigByName = function <T>(
    this: IConfigurationManager,
    ...names: string[]
): T | undefined {
    if (names.length === 0) {
        return undefined
    }

    // Navigate through the configuration using the provided path
    let current: any = this.activeConfiguration

    // Navigate to the parent container (all elements except the last)
    for (let i = 0; i < names.length - 1; i++) {
        const element = names[i]
        if (!current || typeof current !== 'object') {
            return undefined
        }

        current = current[element]
    }

    // Handle the last element based on whether the container is an array or object
    const lastElement = names[names.length - 1]

    if (!current) {
        return undefined
    }

    // If it's an array, search by find(o => o.name === lastElement)
    if (Array.isArray(current)) {
        return current.find((item: any) => item && item.name === lastElement) as T | undefined
    }

    // If it's an object, search by Object.keys(current).find(key => current[key][lastElement] === true)
    if (typeof current === 'object') {
        const foundKey = Object.keys(current).find((key) => {
            const item = current[key]
            return item && typeof item === 'object' && item[lastElement] === true
        })

        if (foundKey) {
            return current[foundKey] as T | undefined
        }
    }

    return undefined
}
