/**
 * @fileoverview Sync attribute to property prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'
import type { IPropertyConfig } from '../interfaces/i-property-config'

/**
 * Syncs attribute changes to properties
 */
export const syncAttributeToProperty = function(this: IBaseComponentInstance, attrName: string, propName: string, config: IPropertyConfig): void {
    const value = this.getAttribute(attrName)
    if (value !== null) {
        this.setProperty(propName, value, config)
    }
}
