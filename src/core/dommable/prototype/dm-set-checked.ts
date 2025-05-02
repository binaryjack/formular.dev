import { IDommable } from '@core/dommable/dommable.types'

/**
 * Sets the checked state of an element by its ID.
 * @param id - The ID of the element to set the checked state for.
 * @param value - The checked state to set (true or false).
 */
export function dmSetChecked<T extends HTMLElement>(
    this: IDommable<T>,
    id: string,
    value: boolean
) {
    const element = this.dmGet(id)
    if (!element) {
        this._tracker?.internalError(
            'Dommable.dmSetChecked',
            `The element does not exist in references: ${id}`
        )
        return
    }
    ;(element as unknown as HTMLInputElement).checked = value
}
