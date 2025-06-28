/**
 * Manager Factory for Web Components
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Creates enhanced manager instances with web component extensions
 * This is the central point for setting up all managers with their extensions
 */

import { WebComponentDOMExtensions } from './extensions/dom-extensions'
import { WebComponentNotificationExtensions } from './extensions/notification-extensions'
import { WebComponentStyleExtensions } from './extensions/style-extensions'
import { ReactiveManager } from './reactive-manager'

// Try to import core managers with fallback
let DomManager: any, StyleManager: any, NotificationManager: any

try {
    // Try to import from formular.dev.lib
    const coreLib = require('formular.dev.lib')
    DomManager = coreLib.DomManager
    StyleManager = coreLib.StyleManager 
    NotificationManager = coreLib.NotificationManager
} catch (error) {
    console.warn('formular.dev.lib not available, using fallback managers')
    // These will be set to fallback implementations below
}

/**
 * Enhanced manager collection interface
 */
export interface WebComponentManagers {
    domManager: any
    styleManager: any
    notificationManager: any
    reactiveManager: any
}

/**
 * Manager factory configuration
 */
export interface ManagerFactoryConfig {
    enableDebugMode?: boolean
    batchUpdateDelay?: number
    templateCacheSize?: number
    notificationHistorySize?: number
}

/**
 * Creates enhanced manager instances for web components
 * 
 * This factory method creates manager instances from the core lib and extends them
 * with web component specific functionality through the extension pattern.
 * 
 * @param config - Optional configuration for manager behavior
 * @returns Object containing all enhanced managers
 */
export const createWebComponentManagers = function(config: ManagerFactoryConfig = {}): WebComponentManagers {
    try {
        // Check if core managers are available
        if (!DomManager || !StyleManager || !NotificationManager) {
            console.warn('Core managers not available, using fallback managers')
            throw new Error('Core managers not available')
        }

        // Create core manager instances
        const domManager = new DomManager()
        const styleManager = new StyleManager()
        const notificationManager = new NotificationManager()
        const reactiveManager = new (ReactiveManager as any)()

        // Extend DomManager with web component capabilities
        domManager.extend('webComponents', WebComponentDOMExtensions)

        // Extend StyleManager with web component capabilities  
        styleManager.extend('webComponents', WebComponentStyleExtensions)

        // Extend NotificationManager with web component capabilities
        notificationManager.extend('webComponents', WebComponentNotificationExtensions)

        // Initialize all managers
        domManager.initialize()
        styleManager.initialize()
        notificationManager.initialize()
        reactiveManager.initialize()

        // Configure managers based on config
        if (config.enableDebugMode) {
            notificationManager.setGlobalDebugMode(true)
        }

        if (config.batchUpdateDelay && reactiveManager.batchConfig) {
            reactiveManager.batchConfig.debounceTime = config.batchUpdateDelay
        }

        // Log successful initialization in debug mode
        if (config.enableDebugMode) {
            console.log('🚀 Web Component Managers initialized:', {
                domManager: domManager.hasExtension('webComponents'),
                styleManager: styleManager.hasExtension('webComponents'),
                notificationManager: notificationManager.hasExtension('webComponents'),
                reactiveManager: reactiveManager.isInitialized
            })
        }

        return {
            domManager,
            styleManager,
            notificationManager,
            reactiveManager
        }

    } catch (error) {
        console.error('Failed to create web component managers:', error)
        
        // Return fallback managers for development/testing
        return createFallbackManagers(config)
    }
}

/**
 * Creates fallback manager instances for testing or when core lib is unavailable
 * 
 * @param config - Manager configuration
 * @returns Fallback manager instances
 */
function createFallbackManagers(config: ManagerFactoryConfig = {}): WebComponentManagers {
    console.warn('Using fallback managers - some functionality may be limited')

    const fallbackDomManager = {
        isInitialized: false,
        extensions: new Map(),
        initialize: () => { 
            fallbackDomManager.isInitialized = true
            console.log('📦 Fallback DomManager initialized')
        },
        extend: (name: string, extension: any) => {
            fallbackDomManager.extensions.set(name, extension)
            Object.assign(fallbackDomManager, extension)
        },
        hasExtension: (name: string) => fallbackDomManager.extensions.has(name),
    }

    const fallbackStyleManager = {
        isInitialized: false,
        extensions: new Map(),
        initialize: () => { 
            fallbackStyleManager.isInitialized = true
            console.log('📦 Fallback StyleManager initialized')
        },
        extend: (name: string, extension: any) => {
            fallbackStyleManager.extensions.set(name, extension)
            Object.assign(fallbackStyleManager, extension)
        },
        hasExtension: (name: string) => fallbackStyleManager.extensions.has(name),
    }

    const fallbackNotificationManager = {
        isInitialized: false,
        extensions: new Map(),
        initialize: () => { 
            fallbackNotificationManager.isInitialized = true
            console.log('📦 Fallback NotificationManager initialized')
        },
        extend: (name: string, extension: any) => {
            fallbackNotificationManager.extensions.set(name, extension)
            Object.assign(fallbackNotificationManager, extension)
        },
        hasExtension: (name: string) => fallbackNotificationManager.extensions.has(name),
    }

    const fallbackReactiveManager = new (ReactiveManager as any)()

    // Initialize fallback managers
    fallbackDomManager.initialize()
    fallbackStyleManager.initialize()
    fallbackNotificationManager.initialize()
    fallbackReactiveManager.initialize()

    // Apply web component extensions to fallback managers
    fallbackDomManager.extend('webComponents', WebComponentDOMExtensions)
    fallbackStyleManager.extend('webComponents', WebComponentStyleExtensions)
    fallbackNotificationManager.extend('webComponents', WebComponentNotificationExtensions)

    // Apply configuration
    if (config.enableDebugMode && (fallbackNotificationManager as any).setGlobalDebugMode) {
        (fallbackNotificationManager as any).setGlobalDebugMode(true)
    }

    return {
        domManager: fallbackDomManager,
        styleManager: fallbackStyleManager,
        notificationManager: fallbackNotificationManager,
        reactiveManager: fallbackReactiveManager
    }
}

/**
 * Validates that all managers have required web component extensions
 * 
 * @param managers - The manager collection to validate
 * @returns Validation result with details
 */
export function validateWebComponentManagers(managers: WebComponentManagers): {
    isValid: boolean
    errors: string[]
    warnings: string[]
} {
    const errors: string[] = []
    const warnings: string[] = []

    // Check DOM manager extensions
    if (!managers.domManager.hasExtension?.('webComponents')) {
        errors.push('DomManager missing webComponents extension')
    }

    // Check Style manager extensions
    if (!managers.styleManager.hasExtension?.('webComponents')) {
        errors.push('StyleManager missing webComponents extension')
    }

    // Check Notification manager extensions
    if (!managers.notificationManager.hasExtension?.('webComponents')) {
        errors.push('NotificationManager missing webComponents extension')
    }

    // Check Reactive manager initialization
    if (!managers.reactiveManager?.isInitialized) {
        errors.push('ReactiveManager not initialized')
    }

    // Check for required methods on DOM manager
    const requiredDomMethods = ['createShadowRoot', 'createTemplate', 'registerComponent']
    for (const method of requiredDomMethods) {
        if (typeof managers.domManager[method] !== 'function') {
            warnings.push(`DomManager missing method: ${method}`)
        }
    }

    // Check for required methods on Style manager
    const requiredStyleMethods = ['addComponentStyles', 'setCSSVariable', 'applyTheme']
    for (const method of requiredStyleMethods) {
        if (typeof managers.styleManager[method] !== 'function') {
            warnings.push(`StyleManager missing method: ${method}`)
        }
    }

    // Check for required methods on Notification manager
    const requiredNotificationMethods = ['showComponentDebug', 'notifyLifecycle', 'setGlobalDebugMode']
    for (const method of requiredNotificationMethods) {
        if (typeof managers.notificationManager[method] !== 'function') {
            warnings.push(`NotificationManager missing method: ${method}`)
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    }
}

/**
 * Default manager factory configuration
 */
export const defaultManagerConfig: ManagerFactoryConfig = {
    enableDebugMode: process.env.NODE_ENV === 'development',
    batchUpdateDelay: 16, // ~60fps
    templateCacheSize: 50,
    notificationHistorySize: 100
}

/**
 * Singleton instance of web component managers
 * Use this for consistent manager instances across your application
 */
export const webComponentManagers = createWebComponentManagers(defaultManagerConfig)
