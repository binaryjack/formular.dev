import { DataMutationObserverSubject } from '../../dataMutationObserver/DataMutationObserverSubject'
import { INotifier, TNotifierType } from '../../notifications/notifications.types'
import { INotifiableEntity } from './notifiableEntityBase.types'

export const NotifiableEntity = function (this: INotifiableEntity) {
    this.notifiers = new Map<string, INotifier>()
    this.observers = new DataMutationObserverSubject()
    this.computedSignalCallback = null
}

NotifiableEntity.prototype = {
    accept: function (notify: INotifier) {
        if (this.notifiers.has(notify.id)) return
        this.notifiers.set(notify.id, notify)
    },
    notify: function <T>(type: TNotifierType, data?: T) {
        this.notifiers.forEach((value: INotifier) => {
            if (value.type === type) {
                console.log(`trigger - [${value.id}] on [${value.type}]`)
                value.method(data)
            }
        })
        this.observers?.trigger()
    },
    dispose: function () {
        this.observers.unSubscribeAll()
    }
}
