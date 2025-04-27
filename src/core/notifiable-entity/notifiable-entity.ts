import { DataMutationObserverSubject } from '../data-mutation-observer/data-mutation-observer-subject'
import { INotifiableEntity } from './notifiable-entity-base.types'
import { INotifier } from './notifications.types'
import { accept } from './prototype/accept'
import { dispose } from './prototype/dispose'
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
    accept,
    notify,
    dispose
})

export const _intNotificationTracker = new NotifiableEntity()
