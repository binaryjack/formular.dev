/**
 * Manager Factory for Web Components
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Creates enhanced manager instances with web component extensions
 * This is the central point for setting up all managers with their extensions
 */

// Import core managers from formular.dev.lib
import {
    DomManager as LibDomManager, NotificationManager as LibNotificationManager,
    StyleManager as LibStyleManager
} from 'formular.dev.lib'

import { WebComponentDOMExtensions } from '../extensions/dom-extensions'
import { WebComponentNotificationExtensions } from '../extensions/notification-extensions'
import { WebComponentStyleExtensions } from '../extensions/style-extensions'
import { IManagerFactoryConfig } from '../interfaces/i-manager-factory-config'
// Import interfaces
import { IWebComponentManagers } from '../interfaces/i-web-component-managers'
import { ReactiveManager } from '../reactive-manager/reactive-manager'

/**
 * Web Component DomManager - extends the lib DomManager
 */
export const WebComponentDomManager = function(this: any, serviceManager?: any) {
    // Ensure serviceManager is available - create mock if needed for testing
    const mockServiceManager = serviceManager ?? {
        lazy: () => () => ({
            getConfigByName: () => ''
        })
    }
    
    // Call the parent constructor with proper serviceManager
    LibDomManager.call(this, mockServiceManager)
    
    // Add web component specific properties
    this._webComponentExtensions = new Map()
    
    return this
} as any

// Set up prototype inheritance
WebComponentDomManager.prototype = Object.create(LibDomManager.prototype)
WebComponentDomManager.prototype.constructor = WebComponentDomManager

// Extend with web component functionality
Object.assign(WebComponentDomManager.prototype, WebComponentDOMExtensions)

/**
 * Web Component StyleManager - extends the lib StyleManager
 */
export const WebComponentStyleManager = function(this: any) {
    // Call the parent constructor
    LibStyleManager.call(this)
    
    // Add web component specific properties
    this._webComponentExtensions = new Map()
    
    return this
} as any

// Set up prototype inheritance
WebComponentStyleManager.prototype = Object.create(LibStyleManager.prototype)
WebComponentStyleManager.prototype.constructor = WebComponentStyleManager

// Extend with web component functionality
Object.assign(WebComponentStyleManager.prototype, WebComponentStyleExtensions)

/**
 * Web Component NotificationManager - extends the lib NotificationManager
 */
export const WebComponentNotificationManager = function(this: any, autoTracker?: any) {
    // Create mock autoTracker if needed for testing/standalone use
    const mockAutoTracker = autoTracker ?? {
        trackingManager: {
            track: () => {},
            critical: () => {}
        },
        input: {
            trackingManager: {
                track: () => {},
                critical: () => {}
            }
        }
    }
    
    try {
        // Call the parent constructor with proper autoTracker
        LibNotificationManager.call(this, mockAutoTracker)
    } catch (error) {
        console.warn('LibNotificationManager initialization failed, creating basic implementation:', error)
        // Basic fallback properties if lib initialization fails
        this.isInitialized = false
        this.autoTracker = mockAutoTracker
        this.notifiers = new Map()
        this.observers = { subscribe: () => {}, unsubscribe: () => {} }
        this.batchQueue = []
        this.priorityQueues = new Map()
        this.isBatchScheduled = false
        this.batchTimeout = null
        this.batchConfig = {
            maxBatchSize: 50,
            batchDelay: 16,
            enablePriority: true,
            strategy: 'microtask'
        }
        Object.defineProperty(this, 'dependencyName', {
            value: 'WebComponentNotificationManager',
            writable: false,
            configurable: false
        })
    }
    
    // Add web component specific properties
    this._webComponentExtensions = new Map()
    
    return this
} as any

// Set up prototype inheritance
WebComponentNotificationManager.prototype = Object.create(LibNotificationManager.prototype)
WebComponentNotificationManager.prototype.constructor = WebComponentNotificationManager

// Extend with web component functionality
Object.assign(WebComponentNotificationManager.prototype, WebComponentNotificationExtensions)

/**
 * Creates enhanced manager instances for web components
 * 
 * This factory method creates manager instances from the core lib and extends them
 * with web component specific functionality through the extension pattern.
 * 
 * @param config - Optional configuration for manager behavior
 * @returns Object containing all enhanced managers
 */
export const createWebComponentManagers = function(config: IManagerFactoryConfig = {}): IWebComponentManagers {
    try {
        // Check if core managers are available
        if (!LibDomManager || !LibStyleManager || !LibNotificationManager) {
            console.warn('Core managers not available, using fallback managers')
            throw new Error('Core managers not available')
        }

        // Create mock service manager for testing/standalone use
        const mockServiceManager = {
            lazy: () => () => ({
                getConfigByName: () => ''
            })
        }

        // Create mock autoTracker with trackingManager for NotificationManager
        const mockAutoTracker = {
            trackingManager: {
                track: () => {},
                critical: () => {}
            },
            input: {
                trackingManager: {
                    track: () => {},
                    critical: () => {}
                }
            }
        }

        // Create enhanced manager instances that extend lib managers with proper dependencies
        const domManager = new WebComponentDomManager(mockServiceManager)
        const styleManager = new WebComponentStyleManager()
        const notificationManager = new WebComponentNotificationManager(mockAutoTracker)
        const reactiveManager = new ReactiveManager()

        // Initialize all managers in the correct order with error handling
        try {
            domManager.initialize()
        } catch (error) {
            console.warn('DomManager initialization failed:', error)
            domManager.isInitialized = true // Force initialization flag
        }

        try {
            styleManager.initialize()
        } catch (error) {
            console.warn('StyleManager initialization failed:', error)
            styleManager.isInitialized = true // Force initialization flag
        }

        try {
            notificationManager.initialize()
        } catch (error) {
            console.warn('NotificationManager initialization failed:', error)
            notificationManager.isInitialized = true // Force initialization flag
        }

        try {
            reactiveManager.initialize()
        } catch (error) {
            console.warn('ReactiveManager initialization failed:', error)
        }

        // Initialize web component extensions after managers are ready
        if (domManager.initializeWebComponentExtensions) {
            domManager.initializeWebComponentExtensions()
        }
        if (styleManager.initializeWebComponentExtensions) {
            styleManager.initializeWebComponentExtensions()
        }
        if (notificationManager.initializeWebComponentExtensions) {
            notificationManager.initializeWebComponentExtensions()
        }

        // Configure managers based on config
        if (config.enableDebugMode) {
            if (notificationManager.setGlobalDebugMode) {
                notificationManager.setGlobalDebugMode(true)
            }
        }

        if (config.batchUpdateDelay && reactiveManager.batchConfig) {
            reactiveManager.batchConfig.debounceTime = config.batchUpdateDelay
        }

        // Log successful initialization in debug mode
        if (config.enableDebugMode) {
            console.log('🚀 Web Component Managers initialized:', {
                domManager: domManager.hasExtension ? domManager.hasExtension('webComponents') : 'Extension method available',
                styleManager: styleManager.hasExtension ? styleManager.hasExtension('webComponents') : 'Extension method available', 
                notificationManager: notificationManager.hasExtension ? notificationManager.hasExtension('webComponents') : 'Extension method available',
                reactiveManager: reactiveManager.isInitialized,
                // Check if extension methods are available
                domManagerMethods: {
                    createShadowRoot: typeof domManager.createShadowRoot === 'function',
                    createTemplate: typeof domManager.createTemplate === 'function',
                    registerComponent: typeof domManager.registerComponent === 'function'
                },
                styleManagerMethods: {
                    addComponentStyles: typeof styleManager.addComponentStyles === 'function',
                    setCSSVariable: typeof styleManager.setCSSVariable === 'function',
                    applyTheme: typeof styleManager.applyTheme === 'function'
                },
                notificationManagerMethods: {
                    showComponentDebug: typeof notificationManager.showComponentDebug === 'function',
                    notifyLifecycle: typeof notificationManager.notifyLifecycle === 'function',
                    setGlobalDebugMode: typeof notificationManager.setGlobalDebugMode === 'function'
                }
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
function createFallbackManagers(config: IManagerFactoryConfig = {}): IWebComponentManagers {
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

    const fallbackReactiveManager = new ReactiveManager()

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
export function validateWebComponentManagers(managers: IWebComponentManagers): {
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
export const defaultManagerConfig: IManagerFactoryConfig = {
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
