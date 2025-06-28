/**
 * @fileoverview Custom template engine for web components
 * 
 * Provides an alternative to Lit's html`` template literals for component rendering.
 * Supports template interpolation, event binding, and conditional rendering.
 * 
 * @version 1.0.0
 * @namespace TemplateEngine
 */

/**
 * Template result interface for parsed templates
 */
export interface TemplateResult {
    /** The HTML string with placeholders */
    html: string
    /** Values to interpolate into the template */
    values: any[]
    /** Event listeners to bind */
    eventListeners: Map<string, EventListener>
    /** Template metadata */
    metadata: {
        hasConditionals: boolean
        hasLoops: boolean
        hasEvents: boolean
        componentId?: string
    }
}

/**
 * Template literal tag function for creating HTML templates
 * 
 * Usage:
 * ```typescript
 * const template = html`
 *   <div class="component">
 *     <h1>${title}</h1>
 *     <button @click=${handleClick}>Click me</button>
 *   </div>
 * `
 * ```
 * 
 * @param strings - Template string parts
 * @param values - Interpolated values
 * @returns Parsed template result
 */
export const html = function(strings: TemplateStringsArray, ...values: any[]): TemplateResult {
    let htmlString = ''
    const eventListeners = new Map<string, EventListener>()
    let hasConditionals = false
    let hasLoops = false
    let hasEvents = false

    // Process template strings and values
    for (let i = 0; i < strings.length; i++) {
        htmlString += strings[i]
        
        if (i < values.length) {
            const value = values[i]
            
            // Check for event listeners (functions with @ prefixed attributes)
            if (typeof value === 'function') {
                const regex = /@(\w+)=["']?$/
                const eventMatch = regex.exec(strings[i])
                if (eventMatch) {
                    const eventType = eventMatch[1]
                    const listenerId = `__event_${eventType}_${i}`
                    eventListeners.set(listenerId, value)
                    htmlString += `" data-event-id="${listenerId}"`
                    hasEvents = true
                } else {
                    htmlString += String(value)
                }
            }
            // Check for conditional expressions
            else if (value && typeof value === 'object' && value.__conditional) {
                htmlString += value.render()
                hasConditionals = true
            }
            // Check for loop expressions
            else if (Array.isArray(value) && (value as any).__isTemplate) {
                htmlString += value.join('')
                hasLoops = true
            }
            // Regular interpolation
            else {
                htmlString += value !== null && value !== undefined ? String(value) : ''
            }
        }
    }

    return {
        html: htmlString,
        values,
        eventListeners,
        metadata: {
            hasConditionals,
            hasLoops,
            hasEvents
        }
    }
}

/**
 * Conditional rendering helper
 * 
 * @param condition - Boolean condition
 * @param template - Template to render if true
 * @param elseTemplate - Optional template to render if false
 * @returns Conditional template object
 */
export const when = function(condition: boolean, template: any, elseTemplate?: any) {
    return {
        __conditional: true,
        render() {
            return condition ? template : (elseTemplate ?? '')
        }
    }
}

/**
 * Loop rendering helper
 * 
 * @param items - Array of items to iterate
 * @param template - Template function for each item
 * @returns Array of rendered templates
 */
export const repeat = function<T>(items: T[], template: (item: T, index: number) => TemplateResult | string) {
    const results = items.map(template)
    // Mark as template array for detection
    ;(results as any).__isTemplate = true
    return results
}

/**
 * Template cache for performance optimization
 */
const templateCache = new Map<string, HTMLTemplateElement>()

/**
 * Creates an HTML template element from a template result
 * 
 * @param templateResult - Parsed template result
 * @param cacheKey - Optional cache key for performance
 * @returns HTML template element
 */
export const createTemplate = function(templateResult: TemplateResult, cacheKey?: string): HTMLTemplateElement {
    // Check cache first
    if (cacheKey && templateCache.has(cacheKey)) {
        return templateCache.get(cacheKey)!.cloneNode(true) as HTMLTemplateElement
    }

    const template = document.createElement('template')
    template.innerHTML = templateResult.html
    
    // Cache if key provided
    if (cacheKey) {
        templateCache.set(cacheKey, template.cloneNode(true) as HTMLTemplateElement)
    }

    return template
}

/**
 * Clones a template and processes interpolations and event bindings
 * 
 * @param template - HTML template element
 * @param templateResult - Original template result with values and events
 * @param componentId - Optional component ID for scoped event handling
 * @returns Cloned and processed document fragment
 */
export const processTemplate = function(
    template: HTMLTemplateElement, 
    templateResult: TemplateResult,
    componentId?: string
): DocumentFragment {
    const fragment = template.content.cloneNode(true) as DocumentFragment
    
    // Process event listeners
    if (templateResult.metadata.hasEvents) {
        processEventListeners(fragment, templateResult.eventListeners, componentId)
    }
    
    return fragment
}

/**
 * Processes event listeners in a template fragment
 * 
 * @param fragment - Document fragment to process
 * @param eventListeners - Map of event listeners
 * @param componentId - Optional component ID for debugging
 */
const processEventListeners = function(
    fragment: DocumentFragment, 
    eventListeners: Map<string, EventListener>,
    componentId?: string
): void {
    eventListeners.forEach((listener, listenerId) => {
        // Find elements with this listener ID
        const elements = fragment.querySelectorAll(`[data-event-id="${listenerId}"]`)
        
        elements.forEach(element => {
            // Extract event type from listener ID
            const eventTypeMatch = /__event_(\w+)_/.exec(listenerId)
            if (eventTypeMatch) {
                const eventType = eventTypeMatch[1]
                
                // Add event listener
                element.addEventListener(eventType, listener)
                
                // Remove the temporary attribute
                element.removeAttribute('data-event-id')
                
                // Add debug info if component ID provided
                if (componentId) {
                    element.setAttribute('data-component', componentId)
                    element.setAttribute('data-event', eventType)
                }
            }
        })
    })
}

/**
 * CSS template literal tag function
 * 
 * @param strings - Template string parts
 * @param values - Interpolated values
 * @returns CSS string
 */
export const css = function(strings: TemplateStringsArray, ...values: any[]): string {
    let result = ''
    
    for (let i = 0; i < strings.length; i++) {
        result += strings[i]
        if (i < values.length) {
            result += String(values[i])
        }
    }
    
    return result
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 * 
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHTML = function(html: string): string {
    const div = document.createElement('div')
    div.textContent = html
    return div.innerHTML
}

/**
 * Template engine configuration
 */
export interface TemplateEngineConfig {
    /** Enable template caching */
    enableCaching: boolean
    /** Enable XSS protection */
    enableSanitization: boolean
    /** Debug mode for development */
    debugMode: boolean
    /** Maximum cache size */
    maxCacheSize: number
}

/**
 * Default template engine configuration
 */
export const defaultConfig: TemplateEngineConfig = {
    enableCaching: true,
    enableSanitization: true,
    debugMode: false,
    maxCacheSize: 100
}

/**
 * Current template engine configuration
 */
let currentConfig = { ...defaultConfig }

/**
 * Configures the template engine
 * 
 * @param config - Partial configuration to apply
 */
export const configureTemplateEngine = function(config: Partial<TemplateEngineConfig>): void {
    currentConfig = { ...currentConfig, ...config }
    
    // Clear cache if caching disabled
    if (!currentConfig.enableCaching) {
        templateCache.clear()
    }
    
    // Limit cache size
    if (templateCache.size > currentConfig.maxCacheSize) {
        const entries = Array.from(templateCache.entries())
        const toRemove = entries.slice(0, entries.length - currentConfig.maxCacheSize)
        toRemove.forEach(([key]) => templateCache.delete(key))
    }
}

/**
 * Gets current template engine configuration
 * 
 * @returns Current configuration
 */
export const getTemplateEngineConfig = function(): TemplateEngineConfig {
    return { ...currentConfig }
}

/**
 * Clears the template cache
 */
export const clearTemplateCache = function(): void {
    templateCache.clear()
}

/**
 * Gets template cache statistics
 * 
 * @returns Cache statistics
 */
export const getTemplateCacheStats = function() {
    return {
        size: templateCache.size,
        maxSize: currentConfig.maxCacheSize,
        keys: Array.from(templateCache.keys())
    }
}
