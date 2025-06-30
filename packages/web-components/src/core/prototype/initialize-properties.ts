/**
 * @fileoverview Initialize properties prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'
import type { IPropertyConfig } from '../interfaces/i-property-config'

/**
 * Initializes reactive properties
 */
export const initializeProperties = function(this: IBaseComponentInstance, properties: Record<string, IPropertyConfig>): void {
    for (const [propName, propConfig] of Object.entries(properties)) {
        // Set default value
        this.propertyValues.set(propName, propConfig.defaultValue)

        // Create reactive property
        this.managers.reactiveManager.createReactiveProperty(
            this,
            propName,
            propConfig.defaultValue,
            this.componentId
        )

        // Create property getter/setter
        Object.defineProperty(this, propName, {
            get: () => this.propertyValues.get(propName),
            set: (value: any) => this.setProperty(propName, value, propConfig),
            enumerable: true,
            configurable: true
        })

        // Sync with attribute if configured
        if (propConfig.attribute) {
            const attrName = typeof propConfig.attribute === 'string' 
                ? propConfig.attribute 
                : propName.toLowerCase()
            
            this.syncAttributeToProperty(attrName, propName, propConfig)
        }
    }
}
