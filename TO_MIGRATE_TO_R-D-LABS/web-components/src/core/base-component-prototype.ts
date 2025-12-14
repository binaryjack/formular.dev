/**
 * @fileoverview Base component prototype-based constructor
 * Following CONTRIBUTING.md: Using prototype-based approach instead of class syntax
 * 
 * Provides the foundation for all web components using our custom framework.
 * Integrates with the manager system and template engine for a complete
 * component development experience.
 * 
 * @version 1.0.0
 */

import { createWebComponentManagers } from '../managers'
import { ComponentLifecycleEnum } from './enums/component-lifecycle.enum'
// Import all prototype methods
import {
    attributeChangedCallback, connectedCallback, convertType, createEvent, disconnectedCallback,
    dispatchEvent, getComponentState, initializeComponent, initializeProperties, onAttributeChanged,
    onConnected, onDisconnected, onRendered, performRender, render, scheduleRender, setProperty,
    syncAttributeToProperty, updateDOM
} from './prototype'

import type { IBaseComponentInstance } from './interfaces/i-base-component-instance'
import type { IComponentConfig } from './interfaces/i-component-config'
import type { IPropertyConfig } from './interfaces/i-property-config'
/**
 * BaseComponent Constructor Function
 * Following CONTRIBUTING.md: Using prototype-based approach instead of class syntax
 * 
 * This provides the foundation for creating custom web components with:
 * - Reactive properties
 * - Template rendering
 * - Lifecycle management
 * - Manager integration
 * - Shadow DOM support
 * 
 * Usage:
 * ```typescript
 * export const MyComponent = function(this: IMyComponentInstance) {
 *   BaseComponent.call(this)
 * }
 * 
 * // Set up prototype inheritance
 * MyComponent.prototype = Object.create(BaseComponent.prototype)
 * MyComponent.prototype.constructor = MyComponent
 * 
 * // Define static configuration
 * MyComponent.config = {
 *   tagName: 'my-component',
 *   shadowMode: 'open'
 * }
 * 
 * MyComponent.properties = {
 *   message: { type: 'string', defaultValue: 'Hello' }
 * }
 * 
 * // Override render method
 * MyComponent.prototype.render = function() {
 *   return html`<div>${this.message}</div>`
 * }
 * 
 * // Define custom element
 * BaseComponent.define(MyComponent, MyComponent.config)
 * ```
 */
export const BaseComponent = function(this: IBaseComponentInstance) {
    // Initialize default config and properties
    const constructor = this.constructor as any
    const config = constructor.config ?? {
        tagName: '',
        shadowMode: 'open',
        styleEncapsulation: true,
        enableReactivity: true,
        debug: false
    }
    const properties = constructor.properties ?? {}
    
    // Set readonly properties
    Object.defineProperty(this, 'config', {
        value: config,
        writable: false,
        enumerable: true,
        configurable: false
    })
    
    Object.defineProperty(this, 'properties', {
        value: properties,
        writable: false,
        enumerable: true,
        configurable: false
    })
    
    // Generate unique component ID
    this.componentId = `${config.tagName}-${Math.random().toString(36).substring(2, 11)}`
    
    // Initialize managers
    this.managers = createWebComponentManagers({
        enableDebugMode: config.debug ?? false
    })

    // Initialize state
    this.templateCache = null
    this.propertyValues = new Map()
    this.lifecycleState = ComponentLifecycleEnum.CREATED
    this.renderScheduled = false

    // Initialize component
    this.initializeComponent()
    
    return this
}

// Set up prototype inheritance from HTMLElement
BaseComponent.prototype = Object.create(HTMLElement.prototype)
BaseComponent.prototype.constructor = BaseComponent

/**
 * Static method to get observed attributes from property configuration
 */
BaseComponent.getObservedAttributes = function(config: IComponentConfig, properties: Record<string, IPropertyConfig>): string[] {
    const attributes: string[] = []

    // Add configured observed attributes
    if (config.observedAttributes) {
        attributes.push(...config.observedAttributes)
    }

    // Add property-synced attributes
    for (const [propName, propConfig] of Object.entries(properties)) {
        if (propConfig.attribute) {
            const attrName = typeof propConfig.attribute === 'string' 
                ? propConfig.attribute 
                : propName.toLowerCase()
            attributes.push(attrName)
        }
    }

    return attributes
}

/**
 * Static method to define the custom element
 */
BaseComponent.define = function(
    componentConstructor: any, 
    config: IComponentConfig, 
    properties?: Record<string, IPropertyConfig>
): void {
    if (!config.tagName) {
        throw new Error('Component must have a tagName in config')
    }
    
    // Set observed attributes
    componentConstructor.observedAttributes = BaseComponent.getObservedAttributes(
        config, 
        properties || {}
    )
    
    if (!customElements.get(config.tagName)) {
        customElements.define(config.tagName, componentConstructor)
    }
}

/**
 * Assign all prototype methods following CONTRIBUTING.md style
 * Methods are imported from individual files in the prototype folder
 */
Object.assign(BaseComponent.prototype, {
    initializeComponent,
    initializeProperties,
    setProperty,
    convertType,
    syncAttributeToProperty,
    scheduleRender,
    performRender,
    updateDOM,
    render,
    connectedCallback,
    disconnectedCallback,
    attributeChangedCallback,
    onConnected,
    onDisconnected,
    onAttributeChanged,
    onRendered,
    getComponentState,
    createEvent,
    dispatchEvent
})
