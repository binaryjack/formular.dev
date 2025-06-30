/**
 * Core Web Components Framework
 * 
 * Exports the main building blocks for creating custom web components
 * using a prototype-based architecture with modern patterns.
 */

// Base component system
export * from './base/fwc-element'

// Base component prototype-based constructor
export { BaseComponent } from './base-component-prototype'

// Test component for debugging and development
export { TestComponent } from './test-component'

// Interfaces and types
export * from './enums'
export type * from './interfaces'

// Legacy base component (class-based) - deprecated
export { BaseComponent as BaseComponentClass } from './base-component'

