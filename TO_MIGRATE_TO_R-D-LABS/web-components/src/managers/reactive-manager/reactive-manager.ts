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

import { IComponentReactiveState } from '../interfaces/i-component-reactive-state'
import { IReactiveManager } from '../interfaces/i-reactive-manager'
// Import all prototype methods
import {
    batchUpdate, cleanupComponent, createComputed, createReactiveProperty, flushBatchUpdates,
    getComponentState, initialize, syncAttributeToProperty, syncPropertyToAttribute
} from './prototype'

/**
 * ReactiveManager Constructor Function
 * Following CONTRIBUTING.md: Using prototype-based approach instead of class syntax
 */
export const ReactiveManager = function(this: IReactiveManager) {
    this.isInitialized = false
    this.components = new Map<string, IComponentReactiveState>()
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

// Export singleton instance for use across components
export const reactiveManager = new (ReactiveManager)()
