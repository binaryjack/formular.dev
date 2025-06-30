/**
 * @fileoverview Dispatch event override prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'

/**
 * Dispatches a custom event with debugging
 */
export const dispatchEvent = function(this: IBaseComponentInstance, event: CustomEvent): boolean {
    this.managers.notificationManager.showComponentDebug(
        this.componentId,
        'Custom event dispatched',
        { eventType: event.type, detail: event.detail },
        'info'
    )
    
    return HTMLElement.prototype.dispatchEvent.call(this, event)
}
