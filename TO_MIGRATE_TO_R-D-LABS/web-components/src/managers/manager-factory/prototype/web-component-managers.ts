import {
    DomManager as LibDomManager, NotificationManager as LibNotificationManager,
    StyleManager as LibStyleManager
} from 'formular.dev.lib'

import { WebComponentDOMExtensions } from '../../extensions/dom-extensions'
import { WebComponentNotificationExtensions } from '../../extensions/notification-extensions'
import { WebComponentStyleExtensions } from '../../extensions/style-extensions'

/**
 * Web Component DomManager Constructor
 * Following CONTRIBUTING.md: Prototype-based approach
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
 * Web Component StyleManager Constructor
 * Following CONTRIBUTING.md: Prototype-based approach
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
 * Web Component NotificationManager Constructor
 * Following CONTRIBUTING.md: Prototype-based approach
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
