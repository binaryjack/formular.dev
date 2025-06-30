/**
 * @fileoverview Create event prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'

/**
 * Creates a custom event
 */
export const createEvent = function(this: IBaseComponentInstance, type: string, detail?: any, options?: EventInit): CustomEvent {
    return new CustomEvent(type, {
        detail,
        bubbles: true,
        composed: true,
        ...options
    })
}
