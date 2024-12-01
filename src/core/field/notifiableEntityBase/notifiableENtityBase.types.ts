import { IDataMutationObserverSubject } from '../../dataMutationObserver/dataMutationObserverSubject.types'
import { INotifier, TNotifierType } from '../../notifications/notifications.types'
import { ComputedSignalCallback } from '../../signals/signal.type'

export interface INotifiableEntity {
    new (): INotifiableEntity
    notify: <T>(type: TNotifierType, data?: T) => void
    accept: (notify: INotifier) => void
    init: () => void
    dispose: () => void
    notifiers: Map<string, INotifier>
    observers: IDataMutationObserverSubject
    computedSignalCallback: ComputedSignalCallback<unknown> | null
}
