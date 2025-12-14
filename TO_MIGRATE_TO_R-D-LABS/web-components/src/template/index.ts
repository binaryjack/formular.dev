/**
 * @fileoverview Template system entry point
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Exports the complete template engine and utilities for web components.
 * This provides an alternative to Lit's template system with similar functionality.
 * 
 * @version 1.0.0
 * @module Template
 */

// Core template engine (refactored)
export {
    clearTemplateCache, configureTemplateEngine, createTemplate, css, defaultTemplateConfig, getTemplateCacheStats, getTemplateEngineConfig, html, processTemplate, repeat, sanitizeHTML, TemplateEngine, templateEngine, when
} from './template-engine'

// Export types
export type { ITemplateEngineConfig, ITemplateResult } from './interfaces'
export type { ITemplateEngine } from './template-engine/types'
// Legacy type exports for backward compatibility
export type { TemplateEngineConfig, TemplateResult } from './template-engine'

// Template utilities
export {
    a11y, animations, asyncTemplate, choose, classHelpers, composeTemplate, eventHandlers, patterns, processSlots, slot, styleHelpers, switchCase, validation
} from './template-utils'

// Export default
export { default } from './template-engine'

