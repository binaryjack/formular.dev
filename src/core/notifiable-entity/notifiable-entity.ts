import { DataMutationObserverSubject } from '../data-mutation-observer/data-mutation-observer-subject'
import { INotifier, TNotifierEventsType } from '../notifications/notifications.types'
import { INotifiableEntity } from './notifiable-entity-base.types'

/**
 * Represents an entity that can be notified by various notifiers and can observe data mutations.
 *
 * @constructor
 * @this {INotifiableEntity}
 */
export const NotifiableEntity = function (this: INotifiableEntity) {
    this.notifiers = new Map<string, INotifier>()
    this.observers = new DataMutationObserverSubject()
    this.computedSignalCallback = null
}

NotifiableEntity.prototype = {
    /**
     * Accepts a notifier and adds it to the notifiers map if it doesn't already exist.
     *
     * @param {INotifier} notify - The notifier to be added.
     */
    accept: function (notify: INotifier) {
        if (this.notifiers.has(notify.id)) return
        this.notifiers.set(notify.id, notify)
    },

    /**
     * Notifies all notifiers of a specific type with optional data.
     *
     * @template T
     * @param {TNotifierEventsType} type - The type of notification.
     * @param {T} [data] - Optional data to be passed to the notifier's method.
     */
    notify: function <T>(type: TNotifierEventsType, data?: T) {
        this.notifiers.forEach((value: INotifier) => {
            if (value.type === type) {
                // console.log(`trigger - [${value.id}] on [${value.type}]`)
                value.method(data)
            }
        })
        this.observers?.trigger()
    },

    /**
     * Disposes of the entity by unsubscribing all observers.
     */
    dispose: function () {
        this.observers.unSubscribeAll()
    }
}
