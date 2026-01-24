/**
 * FORMULAR - Advanced Form Management Library
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Main library entry point exposing all public APIs
 */

// =============================================
// SIMPLE API (Primary - Recommended)
// =============================================

// Schema system
export * from './schema'

// Simple form creation
export { createForm, createFormFromPreset } from './simple-api'
export type { IFormConfig } from './simple-api'

// Submission strategies
export {
    ContextSubmissionStrategy,
    DirectSubmissionStrategy,
    FormDismissedError,
    FormSubmissionError
} from './submission-strategy'
export type { IFormSubmissionStrategy } from './submission-strategy'

// =============================================
// ADVANCED API (For advanced use cases)
// =============================================

export * from './core'
export * from './interfaces'
export * from './symbols'

// Export setup utilities (IoC/DI system)
export * from './setup/core/setup-helpers'

// Note: Test mocks removed from main export to avoid build errors
// Import directly from './__tests__/mocks' if needed for development
