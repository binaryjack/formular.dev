/**
 * FORMULAR - Library Configuration Types
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Central configuration types for the FORMULAR library
 */

export type ValidationPatternMap = Record<string, RegExp>
export type ValidationPatterns = Record<string, ValidationPatternMap>
export type FallbackBehavior = 'strict' | 'lenient' | 'silent'
export type ValidationTrigger = 'onBlur' | 'onChange' | 'onSubmit'
export type ErrorDisplayMode = 'inline' | 'tooltip' | 'summary'
export type LogLevel = 'error' | 'warn' | 'info' | 'debug'
export type NotificationPosition = 'top' | 'bottom' | 'center'

/**
 * Configuration for validation patterns and behavior
 */
export interface ValidationConfig {
    patterns: Record<string, ValidationPatternMap> & {
        phone: ValidationPatternMap
        postal: ValidationPatternMap
        ssn: ValidationPatternMap
        email?: ValidationPatternMap
        custom?: Record<string, ValidationPatternMap>
    }
    fallbackBehavior: FallbackBehavior
    enableStrictMode: boolean
}

/**
 * Configuration for input field defaults
 */
export interface InputConfig {
    defaultValidationTrigger: ValidationTrigger
    defaultErrorDisplay: ErrorDisplayMode
    debounceMs: number
    autoFocus: boolean
    enableAccessibility: boolean
}

/**
 * Configuration for service management
 */
export interface ServiceConfig {
    enableDevelopmentValidation: boolean
    enableCircularDependencyDetection: boolean
    logLevel: LogLevel
    enablePerformanceMetrics: boolean
}

/**
 * Configuration for notification system
 */
export interface NotificationConfig {
    defaultDuration: number
    maxConcurrent: number
    position: NotificationPosition
    enableSound: boolean
    enableAnimation: boolean
}

/**
 * Partial validation configuration for consumer overrides
 */
export interface PartialValidationConfig {
    patterns?: {
        phone?: ValidationPatternMap
        postal?: ValidationPatternMap
        ssn?: ValidationPatternMap
        email?: ValidationPatternMap
        [key: string]: ValidationPatternMap | Record<string, ValidationPatternMap> | undefined
    }
    fallbackBehavior?: FallbackBehavior
    enableStrictMode?: boolean
}

/**
 * Main library configuration interface
 * Consumers can override defaults by providing partial configuration
 */
export interface LibraryConfig {
    validation: ValidationConfig
    inputs: InputConfig
    services: ServiceConfig
    notifications: NotificationConfig
}

/**
 * Partial library configuration for consumer overrides
 */
export type PartialLibraryConfig = {
    validation?: PartialValidationConfig
    inputs?: Partial<InputConfig>
    services?: Partial<ServiceConfig>
    notifications?: Partial<NotificationConfig>
}
