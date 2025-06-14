/**
 * Sets the value of an element by its ID.
 *
 * If the element does not exist in the manager's references, an error is logged via the tracker. The value is only updated if it differs from the current value.
 *
 * @template T - The type of HTMLElement managed.
 * @param {string} id - The ID of the element to set the value for.
 * @param {string} value - The value to set.
 */
import { IDomManager } from '../dom-manager.types'

/**
 * Sets the value of an element by its ID.
 * @param id - The ID of the element to set the value for.
 * @param value - The value to set.
 */
export function dmSetValue<T extends HTMLElement>(this: IDomManager<T>, id: string, value: string) {
    const element = this.dmGet(id) as unknown as HTMLInputElement | undefined
    if (!element) {
        this.tracker?.internalError(
            'DomManager.dmSetValue',
            `The element does not exist in references: ${id}`
        )
        return
    }
    if (element.value !== value) {
        /** we update only when value is setted by the model */
        element.value = value
    }
}
