import { IDommable } from '../dommable.types'

/**
 * Sets the class name of an element by its ID.
 * @param id - The ID of the element to set the class name for.
 * @param rules - The class name(s) to set.
 */
export function dmSetClass<T extends HTMLElement>(this: IDommable<T>, id: string, rules: string) {
    const element = this.dmGet(id)
    if (!element) {
        this.tracker?.internalError(
            'Dommable.dmSetClass',
            `The element does not exist in references: ${id}`
        )
        return
    }
    ;(element as unknown as HTMLInputElement).className = rules
}
