/**
 * FORMULAR - Default Library Configuration
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Default configuration values for the FORMULAR library
 */

import { LibraryConfig } from '../types/library-config.types'

/**
 * Default configuration that works out of the box
 * Provides sensible defaults for all configuration options
 */
export const defaultLibraryConfig: LibraryConfig = {
    validation: {
        patterns: {
            phone: {
                US: /^\+?1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
                UK: /^(\+44|0)[1-9]\d{8,9}$/,
                FR: /^(?:\+33|0)[1-9](?:\d{8})$/,
                DE: /^(\+49|0)[1-9]\d{10,11}$/,
                IT: /^(\+39|0)[1-9]\d{8,9}$/,
                ES: /^(\+34|0)[6-9]\d{8}$/,
                fallback: /^[\d\s\-+()]{7,15}$/
            },
            postal: {
                US: /^\d{5}(-\d{4})?$/,
                UK: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
                FR: /^\d{5}$/,
                DE: /^\d{5}$/,
                IT: /^\d{5}$/,
                ES: /^\d{5}$/,
                CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
                fallback: /^[\w\s-]{3,10}$/
            },
            ssn: {
                US: /^\d{3}-?\d{2}-?\d{4}$/,
                fallback: /^[\d-]{9,11}$/
            },
            email: {
                fallback: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            }
        },
        fallbackBehavior: 'lenient',
        enableStrictMode: false
    },
    inputs: {
        defaultValidationTrigger: 'onBlur',
        defaultErrorDisplay: 'inline',
        debounceMs: 300,
        autoFocus: false,
        enableAccessibility: true
    },
    services: {
        enableDevelopmentValidation: process.env.NODE_ENV === 'development',
        enableCircularDependencyDetection: process.env.NODE_ENV === 'development',
        logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
        enablePerformanceMetrics: process.env.NODE_ENV === 'development'
    },
    notifications: {
        defaultDuration: 5000,
        maxConcurrent: 3,
        position: 'top',
        enableSound: false,
        enableAnimation: true
    }
}
