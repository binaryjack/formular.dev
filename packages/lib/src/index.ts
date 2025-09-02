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

// Export test mocks for development and demo purposes
export * from './__tests__/mocks'

// Note: Test mocks are included for development/demo purposes
// but should be imported from separate paths in production for tree-shaking
