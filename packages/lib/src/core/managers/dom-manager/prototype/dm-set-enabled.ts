/**
 * Enables or disables an element by its ID.
 *
 * If the element does not exist in the manager's references, the function returns silently. If disabling, the element is blurred.
 *
 * @template T - The type of HTMLElement managed.
 * @param {string} id - The ID of the element to enable or disable.
 * @param {boolean} enabled - True to enable, false to disable.
 */
import { IDomManager } from '../dom-manager.types'

/**
 * Enables or disables an element by its ID.
 * @param id - The ID of the element to enable or disable.
 * @param enabled - True to enable, false to disable.
 */
export function dmSetEnabled<T extends HTMLElement>(
    this: IDomManager<T>,
    id: string,
    enabled: boolean
) {
    const ele = this.dmGet(id)
    if (!ele) return
    if (!enabled) {
        ele?.blur?.()
    }
    ;(ele as unknown as HTMLInputElement).ariaDisabled = !enabled ? 'true' : 'false'
    ;(ele as unknown as HTMLInputElement).disabled = !enabled ? true : false
}
