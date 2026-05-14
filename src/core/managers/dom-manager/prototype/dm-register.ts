/**
 * Registers a new element if it does not already exist.
 *
 * If the element is already registered, a warning is logged via the tracker. Otherwise, the element is added to the manager.
 *
 * @template T - The type of HTMLElement managed.
 * @param {T | null} element - The element to register.
 */
import { IDomManager } from '../dom-manager.types'

/**
 * Registers a new element if it does not already exist.
 * @param element - The element to register.
 */
export function dmRegister<T extends HTMLElement>(this: IDomManager<T>, element: T | null) {
    if (!element) return

    if (this.dmExists(element.id)) {
        this.tracker?.internalWarning(
            'DomManager.register',
            `The element you try to add already exists: ${element.id}`
        )
        return
    }

    // Capture initial className as data-class for dynamic class updates
    // This preserves the user's className while formular manages state classes
    if (element.className) {
        element.setAttribute('data-class', element.className)
    }

    this.elements.push(element)
}
