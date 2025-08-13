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

// Export responsive layout system
export * from './responsive-layout'

// Export test mocks for consumer testing (see CONTRIBUTING.md exception)
export * from './__tests__/mocks'
