import { IReactiveManager } from '../../interfaces/i-reactive-manager'
import { IReactivePropertyConfig } from '../../interfaces/i-reactive-property-config'
import {
    convertValueToType, markComputedPropertiesDirty, queueBatchUpdate
} from '../utils/reactive-utils'

/**
 * Creates a reactive property on a target element
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const createReactiveProperty = function(
    this: IReactiveManager,
    target: HTMLElement,
    property: string,
    config: IReactivePropertyConfig,
    componentId: string
): void {
    // Get or create component state
    let componentState = this.components.get(componentId)
    if (!componentState) {
        componentState = {
            componentId,
            element: target,
            properties: new Map(),
            computed: new Map(),
            batchedUpdates: new Set(),
            isUpdating: false,
            updateQueue: null
        }
        this.components.set(componentId, componentState)
    }

    // Store property configuration
    componentState.properties.set(property, config)

    // Create internal property storage
    const internalKey = `_${property}`
    ;(target as any)[internalKey] = config.initialValue

    // Store reference to this manager for setter access
    const reactiveManager = this

    // Define reactive property with getter/setter
    Object.defineProperty(target, property, {
        get: function() {
            return (this )[internalKey]
        },
        set: function(newValue: any) {
            const oldValue = (this )[internalKey]
            
            // Validate value if validator provided
            if (config.validator && !config.validator(newValue)) {
                console.warn(`Invalid value for property ${property}:`, newValue)
                return
            }

            // Type conversion
            const convertedValue = convertValueToType(newValue, config.type)
            
            // Only update if value actually changed
            if (convertedValue !== oldValue) {
                ;(this )[internalKey] = convertedValue

                // Sync to attribute if configured
                if (config.sync && config.attribute) {
                    reactiveManager.syncPropertyToAttribute(componentId, property, convertedValue)
                }

                // Call onChange if provided
                if (config.onChange) {
                    config.onChange(convertedValue, oldValue)
                }

                // Mark computed properties as dirty
                markComputedPropertiesDirty.call(reactiveManager, componentId, property)

                // Batch update if not already updating
                const currentComponentState = reactiveManager.components.get(componentId)
                if (currentComponentState && !currentComponentState.isUpdating) {
                    queueBatchUpdate.call(reactiveManager, componentId)
                }
            }
        },
        enumerable: true,
        configurable: true
    })

    // Set initial value to trigger attribute sync
    if (config.sync && config.attribute) {
        this.syncPropertyToAttribute(componentId, property, config.initialValue)
    }
}
