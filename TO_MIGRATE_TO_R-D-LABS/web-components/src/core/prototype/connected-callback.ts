/**
 * @fileoverview Connected callback prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import { ComponentLifecycleEnum } from '../enums/component-lifecycle.enum';
import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance';

/**
 * Called when component is connected to DOM
 */
export const connectedCallback = function(this: IBaseComponentInstance): void {
    this.lifecycleState = ComponentLifecycleEnum.CONNECTED
    this.managers.notificationManager.notifyLifecycle(this.componentId, ComponentLifecycleEnum.CONNECTED, performance.now())
    
    // Initial render
    this.scheduleRender()
    
    // Call user hook
    this.onConnected()
}
