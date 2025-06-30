/**
 * @fileoverview On rendered hook prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'

/**
 * Called after component is rendered
 */
export const onRendered = function(this: IBaseComponentInstance): void {
    // To be overridden by subclasses
}
