import { WebComponentDOMExtensions } from '../../extensions/dom-extensions'
import { WebComponentNotificationExtensions } from '../../extensions/notification-extensions'
import { WebComponentStyleExtensions } from '../../extensions/style-extensions'
import { IManagerFactoryConfig } from '../../interfaces/i-manager-factory-config'
import { IWebComponentManagers } from '../../interfaces/i-web-component-managers'
import { ReactiveManager } from '../../reactive-manager/reactive-manager'

/**
 * Creates fallback manager instances for testing or when core lib is unavailable
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const createFallbackManagers = function(this: any, config: IManagerFactoryConfig = {}): IWebComponentManagers {
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
