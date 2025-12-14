import { IWebComponentManagers } from '../../interfaces/i-web-component-managers'

/**
 * Log successful manager initialization in debug mode
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const logManagerInitialization = function(this: any, managers: IWebComponentManagers): void {
    console.log('🚀 Web Component Managers initialized:', {
        domManager: managers.domManager.hasExtension ? managers.domManager.hasExtension('webComponents') : 'Extension method available',
        styleManager: managers.styleManager.hasExtension ? managers.styleManager.hasExtension('webComponents') : 'Extension method available', 
        notificationManager: managers.notificationManager.hasExtension ? managers.notificationManager.hasExtension('webComponents') : 'Extension method available',
        reactiveManager: managers.reactiveManager.isInitialized,
        // Check if extension methods are available
        domManagerMethods: {
            createShadowRoot: typeof managers.domManager.createShadowRoot === 'function',
            createTemplate: typeof managers.domManager.createTemplate === 'function',
            registerComponent: typeof managers.domManager.registerComponent === 'function'
        },
        styleManagerMethods: {
            addComponentStyles: typeof managers.styleManager.addComponentStyles === 'function',
            setCSSVariable: typeof managers.styleManager.setCSSVariable === 'function',
            applyTheme: typeof managers.styleManager.applyTheme === 'function'
        },
        notificationManagerMethods: {
            showComponentDebug: typeof managers.notificationManager.showComponentDebug === 'function',
            notifyLifecycle: typeof managers.notificationManager.notifyLifecycle === 'function',
            setGlobalDebugMode: typeof managers.notificationManager.setGlobalDebugMode === 'function'
        }
    })
}
