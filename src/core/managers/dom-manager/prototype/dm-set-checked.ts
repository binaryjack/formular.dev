/**
 * Sets the checked state of an element by its ID.
 *
 * If the element does not exist in the manager's references, an error is logged via the tracker.
 *
 * @template T - The type of HTMLElement managed.
 * @param {string} id - The ID of the element to set the checked state for.
 * @param {boolean} value - The checked state to set (true or false).
 */
import { IDomManager } from '../dom-manager.types'

/**
 * Sets the checked state of an element by its ID.
 * @param id - The ID of the element to set the checked state for.
 * @param value - The checked state to set (true or false).
 */
export function dmSetChecked<T extends HTMLElement>(
    this: IDomManager<T>,
    id: string,
    value: boolean
) {
    const element = this.dmGet(id)
    if (!element) {
        this.tracker?.internalError(
            'DomManager.dmSetChecked',
            `The element does not exist in references: ${id}`
        )
        return
    }
    ;(element as unknown as HTMLInputElement).checked = value
}
