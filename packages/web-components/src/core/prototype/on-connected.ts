/**
 * @fileoverview On connected hook prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'

/**
 * Called when component is connected to DOM
 */
export const onConnected = function(this: IBaseComponentInstance): void {
    // To be overridden by subclasses
}
