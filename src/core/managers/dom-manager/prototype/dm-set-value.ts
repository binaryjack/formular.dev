import { IDomManager } from '../dom-manager.types'

/**
 * Sets the value of an element by its ID.
 * @param id - The ID of the element to set the value for.
 * @param value - The value to set.
 */
export function dmSetValue<T extends HTMLElement>(this: IDomManager<T>, id: string, value: string) {
    const element = this.dmGet(id)
    if (!element) {
        this.tracker?.internalError(
            'DomManager.dmSetValue',
            `The element does not exist in references: ${id}`
        )
        return
    }
    ;(element as unknown as HTMLInputElement).value = value
}
