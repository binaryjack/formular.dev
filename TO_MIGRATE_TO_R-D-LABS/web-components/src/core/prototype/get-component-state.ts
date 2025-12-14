/**
 * @fileoverview Get component state prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'

/**
 * Gets current component state for debugging
 */
export const getComponentState = function(this: IBaseComponentInstance): any {
    return {
        componentId: this.componentId,
        lifecycle: this.lifecycleState,
        properties: Object.fromEntries(this.propertyValues),
        shadowRoot: !!(this as any).shadowRoot,
        managers: {
            domManager: !!this.managers.domManager,
            styleManager: !!this.managers.styleManager,
            notificationManager: !!this.managers.notificationManager,
            reactiveManager: !!this.managers.reactiveManager
        }
    }
}
