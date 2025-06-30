/**
 * @fileoverview Example component using prototype-based BaseComponent
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * This demonstrates how to create a custom web component using the new
 * prototype-based BaseComponent constructor.
 */

import { html, TemplateResult } from '../template'
import { BaseComponent } from './base-component-prototype'

import type { IBaseComponentInstance } from './interfaces/i-base-component-instance'
import type { IComponentConfig } from './interfaces/i-component-config'
import type { IPropertyConfig } from './interfaces/i-property-config'
/**
 * Extended interface for MyComponent
 */
interface IMyComponentInstance extends IBaseComponentInstance {
    message: string
    count: number
    increment(): void
}

/**
 * MyComponent Constructor Function
 * Following CONTRIBUTING.md: Using prototype-based approach
 */
export const MyComponent = function(this: IMyComponentInstance) {
    BaseComponent.call(this)
    return this
}

// Set up prototype inheritance
MyComponent.prototype = Object.create(BaseComponent.prototype)
MyComponent.prototype.constructor = MyComponent

/**
 * Component configuration
 */
MyComponent.config = {
    tagName: 'my-component',
    shadowMode: 'open',
    styleEncapsulation: true,
    enableReactivity: true,
    debug: false,
    styles: `
        :host {
            display: block;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        
        .message {
            font-size: 1.2rem;
            color: #333;
        }
        
        .counter {
            margin-top: 0.5rem;
        }
        
        button {
            padding: 0.5rem 1rem;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        button:hover {
            background: #0056b3;
        }
    `
} as IComponentConfig

/**
 * Reactive properties configuration
 */
MyComponent.properties = {
    message: {
        type: 'string',
        defaultValue: 'Hello World',
        attribute: 'message'
    },
    count: {
        type: 'number',
        defaultValue: 0,
        attribute: 'count'
    }
} as Record<string, IPropertyConfig>

/**
 * Override render method
 */
MyComponent.prototype.render = function(this: IMyComponentInstance): TemplateResult {
    return html`
        <div class="message">${this.message}</div>
        <div class="counter">
            <p>Count: ${this.count}</p>
            <button @click="${() => this.increment()}">Increment</button>
        </div>
    `
}

/**
 * Custom method - increment counter
 */
MyComponent.prototype.increment = function(this: IMyComponentInstance): void {
    this.count += 1
    
    // Dispatch custom event
    const event = this.createEvent('increment', { count: this.count })
    this.dispatchEvent(event)
}

/**
 * Override onConnected lifecycle hook
 */
MyComponent.prototype.onConnected = function(this: IMyComponentInstance): void {
    console.log('MyComponent connected to DOM')
}

/**
 * Override onDisconnected lifecycle hook
 */
MyComponent.prototype.onDisconnected = function(this: IMyComponentInstance): void {
    console.log('MyComponent disconnected from DOM')
}

// Define the custom element
BaseComponent.define(MyComponent, MyComponent.config, MyComponent.properties)
