import { IDomManager } from '../dom-manager.types'

/**
 * Registers an element by its ID if it exists in the DOM.
 * @param id - The ID of the element to register.
 */
export function dmRegisterById<T extends HTMLElement>(this: IDomManager<T>, id: string) {
    if (!id) return

    if (this.dmExists(id)) {
        return
    }
    const _tmpElement = document.getElementById(id) as T
    if (!_tmpElement) {
        this.tracker?.internalError(
            'DomManager.registerById',
            `The element you try to reference doesn't exist in the DOM: ${id}`
        )
        return
    }
    this.elements.push(_tmpElement)
}
