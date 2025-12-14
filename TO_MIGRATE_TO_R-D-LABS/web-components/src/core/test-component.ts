/**
 * @fileoverview Simple test component to debug the component system
 */

import { html, TemplateResult } from '../template';
import { BaseComponent } from './base-component-prototype';

import type { IBaseComponentInstance } from './interfaces/i-base-component-instance';
import type { IComponentConfig } from './interfaces/i-component-config';
import type { IPropertyConfig } from './interfaces/i-property-config';

/**
 * Simple test component interface
 */
interface ITestComponentInstance extends IBaseComponentInstance {
    message: string
}

/**
 * TestComponent Constructor Function
 */
export const TestComponent = function(this: ITestComponentInstance) {
    BaseComponent.call(this)
    return this
}

// Set up prototype inheritance
TestComponent.prototype = Object.create(BaseComponent.prototype)
TestComponent.prototype.constructor = TestComponent

/**
 * Component configuration
 */
TestComponent.config = {
    tagName: 'test-component',
    shadowMode: 'open',
    styleEncapsulation: true,
    enableReactivity: true,
    debug: true,
    styles: `
        :host {
            display: block;
            padding: 1rem;
            background: red;
            color: white;
            border: 2px solid blue;
            margin: 10px;
        }
        
        .content {
            font-size: 18px;
            font-weight: bold;
        }
    `
} as IComponentConfig

/**
 * Reactive properties configuration
 */
TestComponent.properties = {
    message: {
        type: 'string' as const,
        defaultValue: 'Test Component Works!',
        attribute: 'message'
    }
} as Record<string, IPropertyConfig>

/**
 * Override render method
 */
TestComponent.prototype.render = function(this: ITestComponentInstance): TemplateResult {
    return html`
        <div class="content">
            ${this.message}
        </div>
    `
}

/**
 * Override onConnected lifecycle hook
 */
TestComponent.prototype.onConnected = function(this: ITestComponentInstance): void {
    console.log('TestComponent connected to DOM')
}

// Define the custom element
BaseComponent.define(TestComponent, TestComponent.config, TestComponent.properties)
