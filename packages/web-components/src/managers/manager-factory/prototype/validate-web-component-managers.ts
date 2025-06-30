import { IWebComponentManagers } from '../../interfaces/i-web-component-managers'

/**
 * Validates that all managers have required web component extensions
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const validateWebComponentManagers = function(this: any, managers: IWebComponentManagers): {
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
