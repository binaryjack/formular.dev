/**
 * Clears all registered elements by resetting their values and states.
 *
 * Iterates over all managed elements and resets their ARIA checked state, value, and checked property.
 *
 * @template T - The type of HTMLElement managed.
 */
import { IDomManager } from '../dom-manager.types'

/**
 * Clears all registered elements by resetting their values and states.
 */
export function dmClear<T extends HTMLElement>(this: IDomManager<T>) {
    for (const e of this.elements) {
        e.ariaChecked = 'false'
        ;(e as unknown as HTMLInputElement).value = ''
        ;(e as unknown as HTMLInputElement).checked = false
    }
}
