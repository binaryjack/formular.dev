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
        console.warn(`Default Configuration not found! Searched Path: ${names.join('.')}`)
        return undefined
    }

    // If it's an array, search by find(o => o.name === lastElement)
    if (Array.isArray(current)) {
        return current.find((item: any) => item && item.name === lastElement) as T | undefined
    }

    // If it's an object, first try direct property access
    if (typeof current === 'object') {
        // Direct property access - this handles simple nested objects
        if (current.hasOwnProperty(lastElement)) {
            return current[lastElement] as T | undefined
        }

        // Fallback to the original logic for special cases
        // Search by Object.keys(current).find(key => current[key][lastElement] === true)
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
