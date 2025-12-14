/**
 * @fileoverview Disconnected callback prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import { ComponentLifecycleEnum } from '../enums/component-lifecycle.enum';
import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance';

/**
 * Called when component is disconnected from DOM
 */
export const disconnectedCallback = function(this: IBaseComponentInstance): void {
    this.lifecycleState = ComponentLifecycleEnum.DISCONNECTED
    this.managers.notificationManager.notifyLifecycle(this.componentId, ComponentLifecycleEnum.DISCONNECTED, performance.now())
    
    // Cleanup
    this.managers.reactiveManager.cleanupComponent?.(this.componentId)
    
    // Call user hook
    this.onDisconnected()
}
