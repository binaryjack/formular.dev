import { IDommable } from '@core/dommable/dommable.types'

/**
 * Checks if an element with the given ID exists in the registered elements.
 * @param id - The ID of the element to check.
 * @returns True if the element exists, otherwise false.
 */
export function dmExists<T extends HTMLElement>(this: IDommable<T>, id: string) {
    return !!this.elements.find((o) => o.id === id)
}
