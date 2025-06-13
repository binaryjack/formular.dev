/**
 * Retrieves an element by its ID from the registered elements.
 *
 * @template T - The type of HTMLElement managed.
 * @param {string} id - The ID of the element to retrieve.
 * @returns {T | null} The element if found, otherwise null.
 */
import { IDomManager } from '../dom-manager.types'

/**
 * Retrieves an element by its ID from the registered elements.
 * @param id - The ID of the element to retrieve.
 * @returns The element if found, otherwise null.
 */
export function dmGet<T extends HTMLElement>(this: IDomManager<T>, id: string) {
    return this.elements.find((o) => o.id === id) ?? null
}
