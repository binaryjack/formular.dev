import { INotificationManager } from '../notification-manager-base.types'

/**
 * Extends the NotificationManager with additional functionality from an extension object.
 * This method allows adding new methods and properties to a NotificationManager instance
 * without modifying the core implementation, following the Open/Closed Principle.
 *
 * @param {string} extensionName - The name of the extension for tracking purposes
 * @param {Record<string, any>} extension - An object containing methods and properties to add to this manager instance
 * @this {INotificationManager}
 *
 * @example
 * ```typescript
 * const webComponentExtension = {
 *   showComponentDebug: function(componentId, event, data, level) {
 *     // Implementation for component debugging
 *   }
 * };
 *
 * notificationManager.extend('webComponents', webComponentExtension);
 * notificationManager.showComponentDebug('my-component', 'property-changed', data, 'debug');
 * ```
 */
export const extend = function (
    this: INotificationManager,
    extensionName: string,
    extension: Record<string, any>
): void {
    // Initialize extensions map if it doesn't exist
    this.extensions = this.extensions ?? new Map<string, Record<string, any>>()

    // Track the extension by name
    this.extensions.set(extensionName, extension)

    // Merge extension methods into this instance
    Object.assign(this, extension)
}
