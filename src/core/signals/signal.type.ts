import { IDataMutationObserverSubject } from '../dataMutationObserver/dataMutationObserverSubject.types'
import { INotifier, TNotifierType } from '../notifications/notifications.types'

export type SignalType = number | string | boolean | HTMLElement

export type ComputedSignalCallback<SignalType> = (self: ISignal<SignalType>) => ISignal<SignalType>

export interface ISignalDependency {
    origin: ISignal<SignalType>
    derived: ISignal<SignalType>
}

export interface ISignal<SignalType> {
    /* */
    new <SignalType>(id: string, value: SignalType | null): ISignal<SignalType>
    value: SignalType | null
    memoizedData: string
    id: string
    notifiers: Map<string, INotifier>
    parent: ISignal<SignalType> | null
    observer: IDataMutationObserverSubject
    // keep computed callback in memory in order to replay it when data changes
    computedSignalCallback: ComputedSignalCallback<SignalType> | null
    get: () => SignalType
    set: <SignalType>(callback: (self: ISignal<SignalType>) => void) => void
    update: (callback: (self: ISignal<SignalType>) => SignalType) => void
    computed: <SignalType>(callback: ComputedSignalCallback<SignalType>) => void
    accept: (notify: INotifier) => void
    notify: (type: TNotifierType) => void
    onChanged: (callback: () => void) => void
    init: () => void
    dispose: () => void
}

export interface ISignalArray<SignalType> {
    new <SignalType>(id: string, values?: SignalType[] | null[]): ISignalArray<SignalType[]>
    values: SignalType[] | null[]
    id: string
    notifiers: Map<string, INotifier>
    get: () => SignalType[]
    set: <SignalType>(callback: (self: ISignalArray<SignalType[]>) => void) => void
    accept: (notify: INotifier) => void
    notify: (type: TNotifierType) => void
}
