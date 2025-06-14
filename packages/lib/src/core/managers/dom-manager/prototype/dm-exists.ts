/**
 * Checks if an element with the given ID exists in the registered elements.
 *
 * @template T - The type of HTMLElement managed.
 * @param {string} id - The ID of the element to check.
 * @returns {boolean} True if the element exists, otherwise false.
 */
import { IDomManager } from '../dom-manager.types'

/**
 * Checks if an element with the given ID exists in the registered elements.
 * @param id - The ID of the element to check.
 * @returns True if the element exists, otherwise false.
 */
export function dmExists<T extends HTMLElement>(this: IDomManager<T>, id: string) {
    return !!this.elements.find((o) => o.id === id)
}
