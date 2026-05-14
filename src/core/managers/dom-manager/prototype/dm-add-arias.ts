/**
 * Adds ARIA attributes to an element by its ID.
 *
 * Iterates over the provided ARIA attributes and sets them on the element with the given ID.
 * If the element does not exist in the manager's references, a warning is logged via the tracker.
 *
 * @template T - The type of HTMLElement managed.
 * @param {string} id - The ID of the element to add ARIA attributes to.
 * @param {IAria[]} arias - The ARIA attributes to add (name/value pairs).
 */
import { IAria, IDomManager } from '../dom-manager.types'

export function dmAddArias<T extends HTMLElement>(
    this: IDomManager<T>,
    id: string,
    arias: IAria[]
) {
    const element = this.dmGet(id)
    if (!element) {
        this.tracker?.internalWarning(
            'DomManager.dmAddArias',
            `The element does not exist in references: ${id}`
        )
        return
    }
    for (const a of arias) {
        element.setAttribute(`aria-${a.name}`, a.value)
    }
}
