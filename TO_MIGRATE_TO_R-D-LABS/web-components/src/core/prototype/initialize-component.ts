/**
 * @fileoverview Initialize component prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import { ComponentLifecycleEnum } from '../enums/component-lifecycle.enum'
import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'

/**
 * Initializes the component
 */
export const initializeComponent = function(this: IBaseComponentInstance): void {
    const config = this.config
    const properties = this.properties

    // Create shadow DOM if configured
    if (config.shadowMode) {
        (this as any).shadowRoot = this.attachShadow({ mode: config.shadowMode })
    }

    // Register component with DOM manager
    this.managers.domManager.registerComponent(this.componentId, this)

    // Initialize reactive properties
    if (config.enableReactivity) {
        this.initializeProperties(properties)
    }

    // Notify lifecycle
    this.managers.notificationManager.notifyLifecycle(this.componentId, ComponentLifecycleEnum.CREATED, performance.now())
    
    if (config.debug) {
        this.managers.notificationManager.showComponentDebug(
            this.componentId, 
            'Component initialized', 
            { config, properties }, 
            'info'
        )
    }
}
