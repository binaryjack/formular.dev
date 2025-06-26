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
export * from './setup/migration'

// Export deprecated items (to be removed in future version)
export { applifeCylceInstance } from './setup/deprecated/app-lifecycle-instances'

export * from './__tests__'
// Exporting explicit types for better IDE support
