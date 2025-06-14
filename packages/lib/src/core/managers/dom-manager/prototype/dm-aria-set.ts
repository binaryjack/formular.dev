/**
 * Sets ARIA attributes for an element by its ID.
 *
 * Sets the 'aria-labelledby' and 'name' attributes for the specified element.
 * If the element does not exist in the manager's references, a warning is logged via the tracker.
 *
 * @template T - The type of HTMLElement managed.
 * @param {string} id - The ID of the element to set ARIA attributes for.
 * @param {string} name - The name to set for the element.
 */
import { conventions } from '@conventions/conventions'
import { IDomManager } from '../dom-manager.types'

/**
 * Sets ARIA attributes for an element by its ID.
 * @param id - The ID of the element to set ARIA attributes for.
 * @param name - The name to set for the element.
 */
export function dmAriaSet<T extends HTMLElement>(this: IDomManager<T>, id: string, name: string) {
    const element = this.dmGet(id)
    if (!element) {
        this.tracker?.internalWarning(
            'DomManager.dmAriaSet',
            `The element does not exist in references: ${id}`
        )
        return
    }
    element.setAttribute('aria-labelledby', `${id}${conventions.suffix.labelId}`)
    element.setAttribute('name', name)
}
