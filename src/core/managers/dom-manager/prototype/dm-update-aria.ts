/**
 * Sets ARIA attributes for an element by its ID.
 *
 * Sets a specific ARIA attribute (name/value pair) for the specified element. If the element does not exist in the manager's references, a warning is logged via the tracker.
 *
 * @template T - The type of HTMLElement managed.
 * @param {string} id - The ID of the element to set ARIA attributes for.
 * @param {IAria} aria - The ARIA attribute to set (name/value pair).
 */
import { IAria, IDomManager } from '../dom-manager.types'

/**
 * Sets ARIA attributes for an element by its ID.
 * @param id - The ID of the element to set ARIA attributes for.
 * @param name - The name to set for the element.
 */
export function dmUpdateAria<T extends HTMLElement>(this: IDomManager<T>, id: string, aria: IAria) {
    const element = this.dmGet(id)
    if (!element) {
        this.tracker?.internalWarning(
            'DomManager.dmUpdateAria',
            `The element does not exist in references: ${id}`
        )
        return
    }
    const ariaName = `aria-${aria.name}`
    const ariaValue = aria.value
    element.setAttribute(ariaName, ariaValue)
}
