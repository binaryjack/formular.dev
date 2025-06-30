import {
    DomManager as LibDomManager, NotificationManager as LibNotificationManager,
    StyleManager as LibStyleManager
} from 'formular.dev.lib'

import { IManagerFactoryConfig } from '../../interfaces/i-manager-factory-config'
import { IWebComponentManagers } from '../../interfaces/i-web-component-managers'
import { ReactiveManager } from '../../reactive-manager/reactive-manager'

/**
 * Creates manager instances with proper inheritance and extensions
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const createManagerInstances = function(this: any, config: IManagerFactoryConfig): IWebComponentManagers {
    // Check if core managers are available
    if (!LibDomManager || !LibStyleManager || !LibNotificationManager) {
        console.warn('Core managers not available, using fallback managers')
        throw new Error('Core managers not available')
    }

    // Create mock dependencies for testing/standalone use
    const mockServiceManager = {
        lazy: () => () => ({
            getConfigByName: () => ''
        })
    }

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
    const domManager = new this.WebComponentDomManager(mockServiceManager)
    const styleManager = new this.WebComponentStyleManager()
    const notificationManager = new this.WebComponentNotificationManager(mockAutoTracker)
    const reactiveManager = new ReactiveManager()

    return {
        domManager,
        styleManager,
        notificationManager,
        reactiveManager
    }
}
