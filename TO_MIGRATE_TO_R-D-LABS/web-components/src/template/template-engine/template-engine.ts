/**
 * Template Engine for Web Components
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Provides an alternative to Lit's html`` template literals for component rendering.
 * Supports template interpolation, event binding, and conditional rendering.
 */

import { ITemplateEngineConfig } from '../interfaces/i-template-engine-config'
import { ITemplateEngine } from './interfaces/i-template-engine'
// Import all prototype methods with aliases to avoid conflicts
import {
    clearTemplateCache as clearTemplateCacheMethod,
    configureTemplateEngine as configureTemplateEngineMethod,
    createTemplate as createTemplateMethod, css as cssMethod,
    getTemplateCacheStats as getTemplateCacheStatsMethod,
    getTemplateEngineConfig as getTemplateEngineConfigMethod, html as htmlMethod,
    processEventListeners, processTemplate as processTemplateMethod, repeat as repeatMethod,
    sanitizeHTML as sanitizeHTMLMethod, when as whenMethod
} from './prototype'

/**
 * TemplateEngine Constructor Function
 * Following CONTRIBUTING.md: Using prototype-based approach instead of class syntax
 */
export const TemplateEngine = function(this: ITemplateEngine, config?: Partial<ITemplateEngineConfig>) {
    // Initialize template cache
    this.templateCache = new Map<string, HTMLTemplateElement>()
    
    // Default configuration
    this.defaultConfig = {
        enableCaching: true,
        enableSanitization: true,
        debugMode: false,
        maxCacheSize: 100
    }
    
    // Current configuration
    this.currentConfig = { ...this.defaultConfig, ...config }
    
    return this
} as any

// Assign all prototype methods
Object.assign(TemplateEngine.prototype, {
    html: htmlMethod,
    css: cssMethod,
    when: whenMethod,
    repeat: repeatMethod,
    createTemplate: createTemplateMethod,
    processTemplate: processTemplateMethod,
    processEventListeners,
    sanitizeHTML: sanitizeHTMLMethod,
    configureTemplateEngine: configureTemplateEngineMethod,
    getTemplateEngineConfig: getTemplateEngineConfigMethod,
    clearTemplateCache: clearTemplateCacheMethod,
    getTemplateCacheStats: getTemplateCacheStatsMethod
})

/**
 * Default template engine configuration
 */
export const defaultTemplateConfig: ITemplateEngineConfig = {
    enableCaching: true,
    enableSanitization: true,
    debugMode: false,
    maxCacheSize: 100
}

/**
 * Singleton instance of the template engine
 */
export const templateEngine = new (TemplateEngine)(defaultTemplateConfig)

// Export individual helper functions that work independently
/**
 * Standalone template literal tag function for creating HTML templates
 * 
 * @param strings - Template string parts
 * @param values - Interpolated values
 * @returns Parsed template result
 */
export const html = templateEngine.html.bind(templateEngine)

/**
 * Standalone CSS template literal tag function
 * 
 * @param strings - Template string parts
 * @param values - Interpolated values
 * @returns CSS string
 */
export const css = templateEngine.css.bind(templateEngine)

/**
 * Standalone conditional rendering helper
 * 
 * @param condition - Boolean condition
 * @param template - Template to render if true
 * @param elseTemplate - Optional template to render if false
 * @returns Conditional template object
 */
export const when = templateEngine.when.bind(templateEngine)

/**
 * Standalone loop rendering helper
 * 
 * @param items - Array of items to iterate
 * @param template - Template function for each item
 * @returns Array of rendered templates
 */
export const repeat = templateEngine.repeat.bind(templateEngine)

/**
 * Standalone template creation function
 * 
 * @param templateResult - Parsed template result
 * @param cacheKey - Optional cache key for performance
 * @returns HTML template element
 */
export const createTemplate = templateEngine.createTemplate.bind(templateEngine)

/**
 * Standalone template processing function
 * 
 * @param template - HTML template element
 * @param templateResult - Original template result with values and events
 * @param componentId - Optional component ID for scoped event handling
 * @returns Cloned and processed document fragment
 */
export const processTemplate = templateEngine.processTemplate.bind(templateEngine)

/**
 * Standalone HTML sanitization function
 * 
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHTML = templateEngine.sanitizeHTML.bind(templateEngine)

/**
 * Configure the global template engine
 * 
 * @param config - Partial configuration to apply
 */
export const configureTemplateEngine = templateEngine.configureTemplateEngine.bind(templateEngine)

/**
 * Get current template engine configuration
 * 
 * @returns Current configuration
 */
export const getTemplateEngineConfig = templateEngine.getTemplateEngineConfig.bind(templateEngine)

/**
 * Clear the global template cache
 */
export const clearTemplateCache = templateEngine.clearTemplateCache.bind(templateEngine)

/**
 * Get template cache statistics
 * 
 * @returns Cache statistics
 */
export const getTemplateCacheStats = templateEngine.getTemplateCacheStats.bind(templateEngine)
