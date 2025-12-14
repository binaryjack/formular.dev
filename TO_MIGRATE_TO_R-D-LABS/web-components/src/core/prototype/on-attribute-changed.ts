/**
 * @fileoverview On attribute changed hook prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'

/**
 * Called when an attribute changes
 */
export const onAttributeChanged = function(this: IBaseComponentInstance, name: string, oldValue: string | null, newValue: string | null): void {
    // To be overridden by subclasses
}
