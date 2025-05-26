import { ObservableSubject } from '@core/observers/observable-subject/observable-subject'
import { INotificationManager } from './notification-manager-base.types'
import { INotification } from './notification-manager.types'
import { accept } from './prototype/accept'
import { debounceNotify } from './prototype/debounce-notify'
import { dismiss } from './prototype/dismiss'
import { dispose } from './prototype/dispose'
import { getRegisteredNotifierNames } from './prototype/get-registered-notifier-names'
import { initialize } from './prototype/initialize'
import { notify } from './prototype/notify'
import { trigger } from './prototype/trigger'

/**
 * Represents an entity that can be notified by various notifiers and can observe data mutations.
 *
 * @constructor
 * @this {INotificationManager}
 */
export const NotificationManager = function (
    this: INotificationManager,
    autoTracker?: INotificationManager
) {
    this.autoTracker = autoTracker
    this.notifiers = new Map<string, INotification>()
    this.observers = new ObservableSubject()
    this.computedSignalCallback = null
    Object.defineProperty(this, 'dependencyName', {
        value: NotificationManager.name,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
    this.isInitialized = false
} as any as INotificationManager

Object.assign(NotificationManager.prototype, {
    debounceNotify,
    getRegisteredNotifierNames,
    accept,
    initialize,
    dismiss,
    notify,
    dispose,
    trigger
})
