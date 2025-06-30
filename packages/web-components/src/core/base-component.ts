/**
 * @fileoverview Base component class for custom web components
 * 
 * Provides the foundation for all web components using our custom framework.
 * Integrates with the manager system and template engine for a complete
 * component development experience.
 * 
 * @version 1.0.0
 */

import { createWebComponentManagers, IWebComponentManagers } from '../managers'
import { createTemplate, processTemplate, TemplateResult } from '../template'

/**
 * Component lifecycle phases
 */
export enum ComponentLifecycle {
    CREATED = 'created',
    CONNECTED = 'connected',
    ATTRIBUTE_CHANGED = 'attributeChanged',
    DISCONNECTED = 'disconnected',
    PROPERTY_CHANGED = 'propertyChanged',
    RENDERED = 'rendered'
}

/**
 * Component configuration options
 */
export interface ComponentConfig {
    /** Component tag name */
    tagName: string
    /** Shadow DOM configuration */
    shadowMode?: 'open' | 'closed' | null
    /** Enable style encapsulation */
    styleEncapsulation?: boolean
    /** Enable reactive properties */
    enableReactivity?: boolean
    /** Enable debug mode */
    debug?: boolean
    /** Custom CSS styles */
    styles?: string
    /** Observed attributes */
    observedAttributes?: string[]
}

/**
 * Property configuration for reactive properties
 */
export interface PropertyConfig {
    /** Property type */
    type: 'string' | 'number' | 'boolean' | 'object' | 'array'
    /** Default value */
    defaultValue?: any
    /** Attribute name to sync with */
    attribute?: string | boolean
    /** Property is required */
    required?: boolean
    /** Custom validator function */
    validator?: (value: any) => boolean
    /** Transform function for incoming values */
    transform?: (value: any) => any
}

/**
 * Base component class for web components
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
 * class MyComponent extends BaseComponent {
 *   static config: ComponentConfig = {
 *     tagName: 'my-component',
 *     shadowMode: 'open'
 *   }
 * 
 *   static properties = {
 *     message: { type: 'string', defaultValue: 'Hello' }
 *   }
 * 
 *   render() {
 *     return html`<div>${this.message}</div>`
 *   }
 * }
 * 
 * MyComponent.define()
 * ```
 */
export class BaseComponent extends HTMLElement {
    /** Component configuration */
    static readonly config: ComponentConfig = {
        tagName: '',
        shadowMode: 'open',
        styleEncapsulation: true,
        enableReactivity: true,
        debug: false
    }

    /** Reactive property definitions */
    static readonly properties: Record<string, PropertyConfig> = {}

    /** Manager instances for this component */
    protected managers: IWebComponentManagers

    /** Component's unique identifier */
    protected componentId: string

    /** Shadow root reference */
    public shadowRoot: ShadowRoot | null = null

    /** Current template cache */
    private templateCache: HTMLTemplateElement | null = null

    /** Property values storage */
    private readonly propertyValues: Map<string, any> = new Map()

    /** Component lifecycle state */
    private lifecycleState: ComponentLifecycle = ComponentLifecycle.CREATED

    /** Render scheduled flag */
    private renderScheduled = false

    constructor() {
        super()
        
        // Generate unique component ID
        this.componentId = `${(this.constructor as any).config.tagName}-${Math.random().toString(36).substr(2, 9)}`
        
        // Initialize managers
        this.managers = createWebComponentManagers({
            enableDebugMode: (this.constructor as any).config.debug ?? false
        })

        // Initialize component
        this.initializeComponent()
    }

    /**
     * Initializes the component
     */
    private initializeComponent(): void {
        const config = (this.constructor as any).config as ComponentConfig
        const properties = (this.constructor as any).properties as Record<string, PropertyConfig>

        // Create shadow DOM if configured
        if (config.shadowMode) {
            this.shadowRoot = this.attachShadow({ mode: config.shadowMode })
        }

        // Register component with DOM manager
        this.managers.domManager.registerComponent(this.componentId, this)

        // Initialize reactive properties
        if (config.enableReactivity) {
            this.initializeProperties(properties)
        }

        // Notify lifecycle
        this.managers.notificationManager.notifyLifecycle(this.componentId, ComponentLifecycle.CREATED, performance.now())
        
        if (config.debug) {
            this.managers.notificationManager.showComponentDebug(
                this.componentId, 
                'Component initialized', 
                { config, properties }, 
                'info'
            )
        }
    }

    /**
     * Initializes reactive properties
     */
    private initializeProperties(properties: Record<string, PropertyConfig>): void {
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

    /**
     * Sets a property value with validation and notification
     */
    private setProperty(propName: string, value: any, config: PropertyConfig): void {
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
                ComponentLifecycle.PROPERTY_CHANGED, 
                performance.now(),
                { property: propName, oldValue, newValue: value }
            )

            // Schedule re-render
            this.scheduleRender()
        }
    }

    /**
     * Converts a value to the specified type
     */
    private convertType(value: any, type: string): any {
        switch (type) {
            case 'string':
                return String(value)
            case 'number':
                return Number(value)
            case 'boolean':
                return value === true || value === 'true' || value === ''
            case 'object':
                return typeof value === 'string' ? JSON.parse(value) : value
            case 'array':
                return Array.isArray(value) ? value : [value]
            default:
                return value
        }
    }

    /**
     * Syncs attribute changes to properties
     */
    private syncAttributeToProperty(attrName: string, propName: string, config: PropertyConfig): void {
        const value = this.getAttribute(attrName)
        if (value !== null) {
            this.setProperty(propName, value, config)
        }
    }

    /**
     * Schedules a render update
     */
    private scheduleRender(): void {
        if (!this.renderScheduled) {
            this.renderScheduled = true
            // Use manager's batch update if available
            if (this.managers.reactiveManager.batchUpdate) {
                this.managers.reactiveManager.batchUpdate(() => this.performRender())
            } else {
                requestAnimationFrame(() => this.performRender())
            }
        }
    }

    /**
     * Performs the actual render
     */
    private performRender(): void {
        this.renderScheduled = false
        
        try {
            const template = this.render()
            if (template) {
                this.updateDOM(template)
            }
            
            // Notify render complete
            this.managers.notificationManager.notifyLifecycle(
                this.componentId, 
                ComponentLifecycle.RENDERED, 
                performance.now()
            )
        } catch (error) {
            console.error(`Render error in ${this.componentId}:`, error)
            this.managers.notificationManager.showComponentDebug(
                this.componentId,
                'Render error',
                { error },
                'error'
            )
        }
    }

    /**
     * Updates the DOM with the new template
     */
    private updateDOM(templateResult: TemplateResult): void {
        const config = (this.constructor as any).config as ComponentConfig
        const root = config.shadowMode ? this.shadowRoot! : this
        
        // Create or reuse template
        const cacheKey = `${this.componentId}-template`
        const template = this.templateCache ?? createTemplate(templateResult, cacheKey)
        
        this.templateCache ??= template

        // Process template with event binding
        const fragment = processTemplate(template, templateResult, this.componentId)
        
        // Add component styles if configured
        if (config.styleEncapsulation && config.styles) {
            this.managers.styleManager.addComponentStyles(this.componentId, config.styles, this.shadowRoot)
        }

        // Update DOM
        root.innerHTML = ''
        root.appendChild(fragment)
    }

    /**
     * Render method to be implemented by subclasses
     * 
     * @returns Template result to render
     */
    protected render(): TemplateResult | null {
        return null
    }

    /**
     * Called when component is connected to DOM
     */
    connectedCallback(): void {
        this.lifecycleState = ComponentLifecycle.CONNECTED
        this.managers.notificationManager.notifyLifecycle(this.componentId, ComponentLifecycle.CONNECTED, performance.now())
        
        // Initial render
        this.scheduleRender()
        
        // Call user hook
        this.onConnected()
    }

    /**
     * Called when component is disconnected from DOM
     */
    disconnectedCallback(): void {
        this.lifecycleState = ComponentLifecycle.DISCONNECTED
        this.managers.notificationManager.notifyLifecycle(this.componentId, ComponentLifecycle.DISCONNECTED, performance.now())
        
        // Cleanup
        this.managers.reactiveManager.cleanupComponent?.(this.componentId)
        
        // Call user hook
        this.onDisconnected()
    }

    /**
     * Called when observed attributes change
     */
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
        this.managers.notificationManager.notifyLifecycle(
            this.componentId, 
            ComponentLifecycle.ATTRIBUTE_CHANGED, 
            performance.now(),
            { attribute: name, oldValue, newValue }
        )
        
        // Sync to property if configured
        const properties = (this.constructor as any).properties as Record<string, PropertyConfig>
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

    /**
     * Gets observed attributes from property configuration
     */
    static get observedAttributes(): string[] {
        const config = this.config as ComponentConfig
        const properties = this.properties as Record<string, PropertyConfig>
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
     * Defines the custom element
     */
    static define(): void {
        const config = this.config as ComponentConfig
        if (!config.tagName) {
            throw new Error('Component must have a tagName in config')
        }
        
        if (!customElements.get(config.tagName)) {
            customElements.define(config.tagName, this)
        }
    }

    // Lifecycle hooks for subclasses to override

    /**
     * Called when component is connected to DOM
     */
    protected onConnected(): void {}

    /**
     * Called when component is disconnected from DOM
     */
    protected onDisconnected(): void {}

    /**
     * Called when an attribute changes
     */
    protected onAttributeChanged(name: string, oldValue: string | null, newValue: string | null): void {}

    /**
     * Called after component is rendered
     */
    protected onRendered(): void {}

    // Utility methods

    /**
     * Gets current component state for debugging
     */
    getComponentState(): any {
        return {
            componentId: this.componentId,
            lifecycle: this.lifecycleState,
            properties: Object.fromEntries(this.propertyValues),
            shadowRoot: !!this.shadowRoot,
            managers: {
                domManager: !!this.managers.domManager,
                styleManager: !!this.managers.styleManager,
                notificationManager: !!this.managers.notificationManager,
                reactiveManager: !!this.managers.reactiveManager
            }
        }
    }

    /**
     * Dispatches a custom event
     */
    public dispatchEvent(event: CustomEvent): boolean {
        this.managers.notificationManager.showComponentDebug(
            this.componentId,
            'Custom event dispatched',
            { eventType: event.type, detail: event.detail },
            'info'
        )
        
        return super.dispatchEvent(event)
    }

    /**
     * Creates a custom event
     */
    protected createEvent(type: string, detail?: any, options?: EventInit): CustomEvent {
        return new CustomEvent(type, {
            detail,
            bubbles: true,
            composed: true,
            ...options
        })
    }
}
