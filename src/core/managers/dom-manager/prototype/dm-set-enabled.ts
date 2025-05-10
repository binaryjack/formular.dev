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
