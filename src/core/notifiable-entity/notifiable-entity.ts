import { DataMutationObserverSubject } from '../data-mutation-observer/data-mutation-observer-subject'
import { INotifiableEntity } from './notifiable-entity-base.types'
import { INotifier } from './notifications.types'
import { accept } from './prototype/accept'
import { debounceNotify } from './prototype/debounce-notify'
import { dispose } from './prototype/dispose'
import { getRegisteredNotifierNames } from './prototype/get-registered-notifier-names'
import { notify } from './prototype/notify'

/**
 * Represents an entity that can be notified by various notifiers and can observe data mutations.
 *
 * @constructor
 * @this {INotifiableEntity}
 */
export const NotifiableEntity = function (
    this: INotifiableEntity,
    autoTracker?: INotifiableEntity
) {
    this.autoTracker = autoTracker
    this.notifiers = new Map<string, INotifier>()
    this.observers = new DataMutationObserverSubject()
    this.computedSignalCallback = null
} as any as INotifiableEntity

Object.assign(NotifiableEntity.prototype, {
    debounceNotify,
    getRegisteredNotifierNames,
    accept,
    notify,
    dispose
})

export const _intNotificationTracker = new NotifiableEntity()
