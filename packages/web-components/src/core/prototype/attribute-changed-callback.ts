/**
 * @fileoverview Attribute changed callback prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import { ComponentLifecycleEnum } from '../enums/component-lifecycle.enum';
import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance';

/**
 * Called when observed attributes change
 */
export const attributeChangedCallback = function(this: IBaseComponentInstance, name: string, oldValue: string | null, newValue: string | null): void {
    this.managers.notificationManager.notifyLifecycle(
        this.componentId, 
        ComponentLifecycleEnum.ATTRIBUTE_CHANGED, 
        performance.now(),
        { attribute: name, oldValue, newValue }
    )
    
    // Sync to property if configured
    const properties = this.properties
    for (const [propName, propConfig] of Object.entries(properties)) {
        const attrName = typeof propConfig.attribute === 'string' 
            ? propConfig.attribute 
            : propName.toLowerCase()
        
        if (attrName === name) {
            this.setProperty(propName, newValue, propConfig)
            break
        }
    }
    
    // Call user hook
    this.onAttributeChanged(name, oldValue, newValue)
}
