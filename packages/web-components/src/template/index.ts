/**
 * @fileoverview Template system entry point
 * 
 * Exports the complete template engine and utilities for web components.
 * This provides an alternative to Lit's template system with similar functionality.
 * 
 * @version 1.0.0
 * @module Template
 */

// Core template engine
export {
    clearTemplateCache, configureTemplateEngine, createTemplate, css, getTemplateCacheStats, getTemplateEngineConfig, html, processTemplate, repeat, sanitizeHTML, when, type TemplateEngineConfig, type TemplateResult
} from './template-engine'

// Template utilities
export {
    a11y, animations, asyncTemplate, choose, classHelpers, composeTemplate, eventHandlers, patterns, processSlots, slot, styleHelpers, switchCase, validation
} from './template-utils'

