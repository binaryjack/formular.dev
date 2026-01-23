/**
 * FORMULAR - Advanced Form Management Library
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Main library entry point exposing all public APIs
 */

export * from './core'
export * from './interfaces'
export * from './symbols'

// Export setup utilities (new factory system)
export * from './setup/core/setup-helpers'

// Note: Test mocks removed from main export to avoid build errors
// Import directly from './__tests__/mocks' if needed for development
