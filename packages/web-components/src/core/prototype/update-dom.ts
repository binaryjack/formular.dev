/**
 * @fileoverview Update DOM prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { TemplateResult } from '../../template'
import { createTemplate, processTemplate } from '../../template'
import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'

/**
 * Updates the DOM with the new template
 */
export const updateDOM = function(this: IBaseComponentInstance, templateResult: TemplateResult): void {
    const config = this.config
    const root = config.shadowMode ? (this as any).shadowRoot! : this
    
    // Create or reuse template
    const cacheKey = `${this.componentId}-template`
    const template = this.templateCache ?? createTemplate(templateResult, cacheKey)
    
    this.templateCache ??= template

    // Process template with event binding
    const fragment = processTemplate(template, templateResult, this.componentId)
    
    // Add component styles if configured
    if (config.styleEncapsulation && config.styles) {
        this.managers.styleManager.addComponentStyles(this.componentId, config.styles, (this as any).shadowRoot)
    }

    // Update DOM
    root.innerHTML = ''
    root.appendChild(fragment)
}
