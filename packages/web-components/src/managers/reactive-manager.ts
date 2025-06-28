/**
 * ReactiveManager for Web Components
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Handles reactive state for web components:
 * - Reactive property creation with getters/setters
 * - Computed properties with dependency tracking
 * - Batched updates for performance optimization
 * - Component state synchronization
 * - Property-to-attribute sync (web component standard)
 */

/**
 * Reactive property configuration
 */
interface ReactivePropertyConfig {
    initialValue: any
    attribute?: string | boolean // Maps to attribute name, or true for auto-mapping
    type?: 'string' | 'number' | 'boolean' | 'object'
    validator?: (value: any) => boolean
    onChange?: (value: any, oldValue: any) => void
    sync?: boolean // Whether to sync with attributes
}

/**
 * Computed property definition
 */
interface ComputedProperty {
    dependencies: string[]
    computeFn: (...args: any[]) => any
    lastValue: any
    isDirty: boolean
}

/**
 * Component reactive state
 */
interface ComponentReactiveState {
    componentId: string
    element: HTMLElement
    properties: Map<string, ReactivePropertyConfig>
    computed: Map<string, ComputedProperty>
    batchedUpdates: Set<string>
    isUpdating: boolean
    updateQueue: Promise<void> | null
}

/**
 * Batch update configuration
 */
interface BatchUpdateConfig {
    debounceTime: number
    maxBatchSize: number
    enableLogging: boolean
}

/**
 * ReactiveManager Type Interface
 */
interface IReactiveManager {
    isInitialized: boolean
    dependencyName: string
    components: Map<string, ComponentReactiveState>
    batchConfig: BatchUpdateConfig
    initialize(): void
    createReactiveProperty(target: HTMLElement, property: string, config: ReactivePropertyConfig, componentId: string): void
    createComputed(componentId: string, property: string, dependencies: string[], computeFn: (...args: any[]) => any): void
    batchUpdate(componentId: string, updates: () => void): Promise<void>
    flushBatchUpdates(componentId: string): Promise<void>
    cleanupComponent(componentId: string): void
    getComponentState(componentId: string): ComponentReactiveState | undefined
    syncAttributeToProperty(componentId: string, attributeName: string, value: string | null): void
    syncPropertyToAttribute(componentId: string, propertyName: string, value: any): void
}

/**
 * ReactiveManager Constructor Function
 * Following CONTRIBUTING.md: Using prototype-based approach instead of class syntax
 */
export const ReactiveManager = function(this: IReactiveManager) {
    this.isInitialized = false
    this.components = new Map<string, ComponentReactiveState>()
    this.batchConfig = {
        debounceTime: 16, // ~60fps
        maxBatchSize: 50,
        enableLogging: false
    }

    Object.defineProperty(this, 'dependencyName', {
        value: 'ReactiveManager',
        writable: false,
        configurable: false
    })
} as any

/**
 * Initialize the ReactiveManager
 */
const initialize = function(this: IReactiveManager): void {
    this.isInitialized = true
    console.log('🔄 ReactiveManager initialized')
}

/**
 * Creates a reactive property on a target element
 */
const createReactiveProperty = function(
    this: IReactiveManager,
    target: HTMLElement,
    property: string,
    config: ReactivePropertyConfig,
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

    // Define reactive property with getter/setter
    Object.defineProperty(target, property, {
        get: function() {
            return (this as any)[internalKey]
        },
        set: function(newValue: any) {
            const oldValue = (this as any)[internalKey]
            
            // Validate value if validator provided
            if (config.validator && !config.validator(newValue)) {
                console.warn(`Invalid value for property ${property}:`, newValue)
                return
            }

            // Type conversion
            const convertedValue = convertValueToType(newValue, config.type)
            
            // Only update if value actually changed
            if (convertedValue !== oldValue) {
                ;(this as any)[internalKey] = convertedValue

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
                if (!componentState!.isUpdating) {
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

/**
 * Creates a computed property
 */
const createComputed = function(
    this: IReactiveManager,
    componentId: string,
    property: string,
    dependencies: string[],
    computeFn: (...args: any[]) => any
): void {
    const componentState = this.components.get(componentId)
    if (!componentState) {
        console.warn(`Component ${componentId} not found for computed property ${property}`)
        return
    }

    const computed: ComputedProperty = {
        dependencies,
        computeFn,
        lastValue: undefined,
        isDirty: true
    }

    componentState.computed.set(property, computed)

    // Define computed property getter
    Object.defineProperty(componentState.element, property, {
        get: function() {
            if (computed.isDirty) {
                // Gather dependency values
                const depValues = dependencies.map(dep => (this as any)[dep])
                computed.lastValue = computeFn.apply(this, depValues)
                computed.isDirty = false
            }
            return computed.lastValue
        },
        enumerable: true,
        configurable: true
    })
}

/**
 * Batches updates for performance
 */
const batchUpdate = function(
    this: IReactiveManager,
    componentId: string,
    updates: () => void
): Promise<void> {
    const componentState = this.components.get(componentId)
    if (!componentState) {
        return Promise.resolve()
    }

    return new Promise((resolve) => {
        componentState.isUpdating = true
        
        try {
            updates()
        } finally {
            componentState.isUpdating = false
            queueBatchUpdate.call(this, componentId).then(resolve)
        }
    })
}

/**
 * Flushes pending batch updates
 */
const flushBatchUpdates = function(
    this: IReactiveManager,
    componentId: string
): Promise<void> {
    const componentState = this.components.get(componentId)
    if (!componentState || componentState.batchedUpdates.size === 0) {
        return Promise.resolve()
    }

    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            if (this.batchConfig.enableLogging) {
                console.log(`🔄 Flushing ${componentState.batchedUpdates.size} updates for ${componentId}`)
            }

            // Trigger any custom update logic here
            componentState.batchedUpdates.clear()
            componentState.updateQueue = null
            resolve()
        })
    })
}

/**
 * Syncs attribute value to property
 */
const syncAttributeToProperty = function(
    this: IReactiveManager,
    componentId: string,
    attributeName: string,
    value: string | null
): void {
    const componentState = this.components.get(componentId)
    if (!componentState) return

    // Find property mapped to this attribute
    for (const [propName, config] of componentState.properties) {
        const attributeMapping = typeof config.attribute === 'string' ? config.attribute : propName
        
        if (attributeMapping === attributeName) {
            const convertedValue = convertAttributeToPropertyValue(value, config.type)
            ;(componentState.element as any)[propName] = convertedValue
            break
        }
    }
}

/**
 * Syncs property value to attribute
 */
const syncPropertyToAttribute = function(
    this: IReactiveManager,
    componentId: string,
    propertyName: string,
    value: any
): void {
    const componentState = this.components.get(componentId)
    if (!componentState) return

    const config = componentState.properties.get(propertyName)
    if (!config?.attribute) return

    const attributeName = typeof config.attribute === 'string' ? config.attribute : propertyName
    const attributeValue = convertPropertyToAttributeValue(value, config.type)

    if (attributeValue === null) {
        componentState.element.removeAttribute(attributeName)
    } else {
        componentState.element.setAttribute(attributeName, attributeValue)
    }
}

/**
 * Gets component reactive state for debugging
 */
const getComponentState = function(
    this: IReactiveManager,
    componentId: string
): ComponentReactiveState | undefined {
    return this.components.get(componentId)
}

/**
 * Cleans up component reactive state
 */
const cleanupComponent = function(
    this: IReactiveManager,
    componentId: string
): void {
    const componentState = this.components.get(componentId)
    if (componentState) {
        // Cancel any pending updates
        if (componentState.updateQueue) {
            // Note: Can't really cancel a Promise, but we can ignore the result
            componentState.updateQueue = null
        }
        
        this.components.delete(componentId)
    }
}

// Assign all prototype methods
Object.assign(ReactiveManager.prototype, {
    initialize,
    createReactiveProperty,
    createComputed,
    batchUpdate,
    flushBatchUpdates,
    syncAttributeToProperty,
    syncPropertyToAttribute,
    getComponentState,
    cleanupComponent
})

// Helper functions (private to this module)

function convertValueToType(value: any, type?: string): any {
    if (!type) return value

    switch (type) {
        case 'string':
            return String(value)
        case 'number':
            return Number(value)
        case 'boolean':
            return Boolean(value)
        case 'object':
            return typeof value === 'object' ? value : JSON.parse(value)
        default:
            return value
    }
}

function convertAttributeToPropertyValue(value: string | null, type?: string): any {
    if (value === null) return null

    switch (type) {
        case 'boolean':
            return value !== null
        case 'number':
            return Number(value)
        case 'object':
            try {
                return JSON.parse(value)
            } catch {
                return value
            }
        default:
            return value
    }
}

function convertPropertyToAttributeValue(value: any, type?: string): string | null {
    if (value == null) return null

    switch (type) {
        case 'boolean':
            return value ? '' : null
        case 'object':
            return JSON.stringify(value)
        default:
            return String(value)
    }
}

function markComputedPropertiesDirty(this: IReactiveManager, componentId: string, changedProperty: string): void {
    const componentState = this.components.get(componentId)
    if (!componentState) return

    for (const [propName, computed] of componentState.computed) {
        if (computed.dependencies.includes(changedProperty)) {
            computed.isDirty = true
        }
    }
}

function queueBatchUpdate(this: IReactiveManager, componentId: string): Promise<void> {
    const componentState = this.components.get(componentId)
    if (!componentState) {
        return Promise.resolve()
    }

    componentState.batchedUpdates.add(componentId)

    componentState.updateQueue ??= new Promise((resolve) => {
        setTimeout(() => {
            this.flushBatchUpdates(componentId).then(resolve)
        }, this.batchConfig.debounceTime)
    })

    return componentState.updateQueue
}

// Export singleton instance for use across components
export const reactiveManager = new (ReactiveManager as any)()
