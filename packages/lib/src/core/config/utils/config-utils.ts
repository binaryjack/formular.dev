/**
 * FORMULAR - Configuration Utilities
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Utility functions for configuration management
 */

import { PartialLibraryConfig } from '../types/library-config.types'

/**
 * Deep merge utility for configuration objects
 * Recursively merges source into target, creating a new object
 */
export const mergeDeep = function (target: any, source: any): any {
    if (!source || typeof source !== 'object') {
        return target
    }

    const result = { ...target }

    Object.keys(source).forEach((key) => {
        const sourceValue = source[key]
        const targetValue = result[key]

        // Handle special object types that shouldn't be merged recursively
        if (
            sourceValue instanceof RegExp ||
            sourceValue instanceof Date ||
            Array.isArray(sourceValue)
        ) {
            result[key] = sourceValue
        } else if (sourceValue && typeof sourceValue === 'object') {
            // Recursively merge objects
            result[key] = mergeDeep(targetValue ?? {}, sourceValue)
        } else {
            // Direct assignment for primitives or null values
            result[key] = sourceValue
        }
    })

    return result
}

/**
 * Validates that a partial configuration has valid structure
 * Returns true if valid, throws error if invalid
 */
export const validateConfigStructure = function (config: PartialLibraryConfig): boolean {
    if (!config || typeof config !== 'object') {
        throw new Error('Configuration must be an object')
    }

    const validSections = ['validation', 'inputs', 'services', 'notifications']

    Object.keys(config).forEach((key) => {
        if (!validSections.includes(key)) {
            throw new Error(`Unknown configuration section: ${key}`)
        }
    })

    return true
}

/**
 * Creates a safe copy of configuration to prevent mutations
 * Properly handles RegExp objects and other special types
 */
export const cloneConfig = function <T>(config: T): T {
    if (config === null || config === undefined) {
        return config
    }

    if (typeof config !== 'object') {
        return config
    }

    if (config instanceof RegExp) {
        return new RegExp(config.source, config.flags) as any
    }

    if (config instanceof Date) {
        return new Date(config.getTime()) as any
    }

    if (Array.isArray(config)) {
        return config.map((item) => cloneConfig(item)) as any
    }

    const cloned = {} as any
    for (const key in config) {
        if (config.hasOwnProperty(key)) {
            cloned[key] = cloneConfig(config[key])
        }
    }

    return cloned
}
