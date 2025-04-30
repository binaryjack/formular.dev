import { IDommable } from '@core/dommable/dommable.types'

/**
 * Clears all registered elements by resetting their values and states.
 */
export function dmClear<T extends HTMLElement>(this: IDommable<T>) {
    for (const e of this.elements) {
        e.ariaChecked = 'false'
        ;(e as unknown as HTMLInputElement).value = ''
        ;(e as unknown as HTMLInputElement).checked = false
    }
}
