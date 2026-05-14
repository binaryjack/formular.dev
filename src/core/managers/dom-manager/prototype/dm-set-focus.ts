/**
 * Sets focus to an element by its ID. If the element is not found, focuses on the first registered element.
 *
 * @template T - The type of HTMLElement managed.
 * @param {string} id - The ID of the element to focus.
 */
import { IDomManager } from '../dom-manager.types'

/**
 * Sets focus to an element by its ID. If the element is not found, focuses on the first registered element.
 * @param id - The ID of the element to focus.
 */
export function dmSetFocus<T extends HTMLElement>(this: IDomManager<T>, id: string) {
    const ele = this.dmGet(id)
    if (!ele) {
        this.elements?.[0]?.focus()
    } else {
        ele.focus()
    }
}
