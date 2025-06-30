/**
 * @fileoverview Set property prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import { ComponentLifecycleEnum } from '../enums/component-lifecycle.enum';
import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance';
import type { IPropertyConfig } from '../interfaces/i-property-config';

/**
 * Sets a property value with validation and notification
 */
export const setProperty = function(this: IBaseComponentInstance, propName: string, value: any, config: IPropertyConfig): void {
    // Transform value if transformer provided
    if (config.transform) {
        value = config.transform(value)
    }

    // Validate value
    if (config.validator && !config.validator(value)) {
        console.warn(`Invalid value for property ${propName}:`, value)
        return
    }

    // Type conversion
    value = this.convertType(value, config.type)

    const oldValue = this.propertyValues.get(propName)
    
    if (oldValue !== value) {
        this.propertyValues.set(propName, value)
        
        // Notify property change
        this.managers.notificationManager.notifyLifecycle(
            this.componentId, 
            ComponentLifecycleEnum.PROPERTY_CHANGED, 
            performance.now(),
            { property: propName, oldValue, newValue: value }
        )

        // Schedule re-render
        this.scheduleRender()
    }
}
