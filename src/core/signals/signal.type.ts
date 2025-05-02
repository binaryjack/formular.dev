import { INotifier } from '@core/notifiable-entity/notifications.types'

import { EventsType } from '@core/events/events.types'
import { IDataMutationObserverSubject } from '../data-mutation-observer/data-mutation-observer-subject.types'

/**
 * Type for signal values
 */
export type SignalType = number | string | boolean | HTMLElement

/**
 * Type for computed signal callback
 * @template SignalType
 * @param {ISignal<SignalType>} self - Reference to the signal
 * @returns {ISignal<SignalType>} The computed signal
 */
export type ComputedSignalCallback<SignalType> = (self: ISignal<SignalType>) => ISignal<SignalType>

/**
 * Interface for signal dependencies
 */
export interface ISignalDependency {
    origin: ISignal<SignalType>
    derived: ISignal<SignalType>
}

/**
 * Interface for signal
 * @template SignalType
 */
export interface ISignal<SignalType> {
    /** Constructor for signal
     * @param {string} id - Identifier for the signal
     * @param {SignalType | null} value - Initial value of the signal
     */
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
    notify: (type: EventsType) => void
    onChanged: (callback: () => void) => void
    init: () => void
    dispose: () => void
}

/**
 * Interface for signal array
 * @template SignalType
 */
// export interface ISignalArray<SignalType> {
//     /** Constructor for signal array
//      * @param {string} id - Identifier for the signal array
//      * @param {SignalType[] | null[]} values - Initial values of the signal array
//      */
//     new <SignalType>(id: string, values?: SignalType[] | null[]): ISignalArray<SignalType[]>
//     values: SignalType[] | null[]
//     id: string
//     notifiers: Map<string, INotifier>
//     get: () => SignalType[]
//     set: <SignalType>(callback: (self: ISignalArray<SignalType[]>) => void) => void
//     accept: (notify: INotifier) => void
//     notify: (type: TNotifierType) => void
// }

export interface ISignalArray<SignalType> extends ISignal<SignalType[]> {
    new (id: string, values: SignalType[] | null[]): ISignalArray<SignalType>
    values: SignalType[] | null[]
    push: (item: SignalType) => void
    pop: () => SignalType | undefined
    shift: () => SignalType | undefined
    unshift: (item: SignalType) => number
    splice: (start: number, deleteCount?: number, ...items: SignalType[]) => SignalType[]
}
