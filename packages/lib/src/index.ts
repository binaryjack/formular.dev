/**
 * FORMULAR - Advanced Form Management Library
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Main library entry point exposing all public APIs
 */

// Unified Configuration System (New - Recommended)
export { FormularConfig } from './core/unified-config'
export type {
    ConfigLoadResult,
    ConfigSource,
    FormularConfig as FormularConfigType,
    PartialFormularConfig
} from './core/unified-config'

export * from './conventions'
export * from './core'
export * from './project'

export * from './__tests__'
// Exporting explicit types for better IDE support
