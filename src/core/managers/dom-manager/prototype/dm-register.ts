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
    this.elements.push(element)
}
