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

// Note: Test mocks are intentionally excluded from production builds
// They are available via separate import paths for testing purposes
