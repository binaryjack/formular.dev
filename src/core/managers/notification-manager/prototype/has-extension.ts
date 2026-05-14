import { INotificationManager } from '../notification-manager-base.types'

/**
 * Checks if a specific extension has been loaded into this NotificationManager instance.
 * This method provides a way to verify extension availability before attempting
 * to use extension-specific features.
 *
 * @param {string} extensionName - The name of the extension to check for
 * @returns {boolean} True if the extension exists, false otherwise
 * @this {INotificationManager}
 *
 * @example
 * ```typescript
 * if (notificationManager.hasExtension('webComponents')) {
 *   notificationManager.showComponentDebug('my-component', 'event', data);
 * }
 * ```
 */
export const hasExtension = function (this: INotificationManager, extensionName: string): boolean {
    return this.extensions?.has(extensionName) ?? false
}
