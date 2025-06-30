/**
 * @fileoverview Schedule render prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'

/**
 * Schedules a render update
 */
export const scheduleRender = function(this: IBaseComponentInstance): void {
    if (!this.renderScheduled) {
        this.renderScheduled = true
        // Use manager's batch update if available
        if (this.managers.reactiveManager.batchUpdate) {
            this.managers.reactiveManager.batchUpdate(() => this.performRender())
        } else {
            requestAnimationFrame(() => this.performRender())
        }
    }
}
