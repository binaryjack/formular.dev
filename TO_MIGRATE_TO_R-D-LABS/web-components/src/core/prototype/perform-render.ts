/**
 * @fileoverview Perform render prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import { ComponentLifecycleEnum } from '../enums/component-lifecycle.enum';
import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance';

/**
 * Performs the actual render
 */
export const performRender = function(this: IBaseComponentInstance): void {
    this.renderScheduled = false
    
    try {
        const template = this.render()
        if (template) {
            this.updateDOM(template)
        }
        
        // Notify render complete
        this.managers.notificationManager.notifyLifecycle(
            this.componentId, 
            ComponentLifecycleEnum.RENDERED, 
            performance.now()
        )
    } catch (error) {
        console.error(`Render error in ${this.componentId}:`, error)
        this.managers.notificationManager.showComponentDebug(
            this.componentId,
            'Render error',
            { error },
            'error'
        )
    }
}
