/**
 * @fileoverview Custom template engine for web components
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Provides an alternative to Lit's html`` template literals for component rendering.
 * Supports template interpolation, event binding, and conditional rendering.
 * 
 * @version 1.0.0
 * @namespace TemplateEngine
 */

// Re-export everything from the new template engine structure
export {
    clearTemplateCache, configureTemplateEngine, createTemplate, css, defaultTemplateConfig, getTemplateCacheStats, getTemplateEngineConfig, html, processTemplate, repeat, sanitizeHTML, TemplateEngine, templateEngine, when
} from './template-engine/template-engine'

// Re-export types and interfaces
export type { ITemplateEngineConfig, ITemplateResult } from './interfaces'
export type { ITemplateEngine } from './template-engine/types'

import { ITemplateEngineConfig } from './interfaces/i-template-engine-config'
// Legacy exports for backward compatibility
import { ITemplateResult } from './interfaces/i-template-result'
import { templateEngine as engine } from './template-engine/template-engine'

export interface TemplateResult extends ITemplateResult {}
export interface TemplateEngineConfig extends ITemplateEngineConfig {}

// Export the singleton instance as default for convenience
export default engine
