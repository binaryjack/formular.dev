/**
 * @fileoverview On disconnected hook prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'

/**
 * Called when component is disconnected from DOM
 */
export const onDisconnected = function(this: IBaseComponentInstance): void {
    // To be overridden by subclasses
}
