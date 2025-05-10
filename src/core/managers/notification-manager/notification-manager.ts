import { ObservableSubject } from '@core/observers/observable-subject/observable-subject'
import { INotificationManager } from './notification-manager-base.types'
import { INotifier } from './notification-manager.types'
import { accept } from './prototype/accept'
import { debounceNotify } from './prototype/debounce-notify'
import { dispose } from './prototype/dispose'
import { getRegisteredNotifierNames } from './prototype/get-registered-notifier-names'
import { initialize } from './prototype/initialize'
import { notify } from './prototype/notify'

/**
 * Represents an entity that can be notified by various notifiers and can observe data mutations.
 *
 * @constructor
 * @this {INotificationManager}
 */
export const NotifiableEntity = function (
    this: INotificationManager,
    autoTracker?: INotificationManager
) {
    this.autoTracker = autoTracker
    this.notifiers = new Map<string, INotifier>()
    this.observers = new ObservableSubject()
    this.computedSignalCallback = null
    this.dependencyName = NotifiableEntity.name
    this.isInitialized = false
} as any as INotificationManager

Object.assign(NotifiableEntity.prototype, {
    debounceNotify,
    getRegisteredNotifierNames,
    accept,
    initialize,
    notify,
    dispose
})
/** To be used as instance for AUTO TRACKER */
export const _intNotificationTracker = new NotifiableEntity()
