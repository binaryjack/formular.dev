import { IObservableSubject } from './observable-subject.types'
import { subscribe } from './prototype/subscribe'
import { trigger } from './prototype/trigger'
import { unSubscribe } from './prototype/unsubscribe'
import { unSubscribeAll } from './prototype/unsubscribe-all'

/**
 * Creates a new DataMutationObserverSubject instance.
 *
 * @param this - The context object which will hold the observers.
 * @param fns - A list of observable functions to be added as observers.
 *
 * @remarks
 * This function initializes the `observers` property with the provided functions.
 *
 * @example
 * ```typescript
 * const observer1 = () => { console.log('Observer 1'); };
 * const observer2 = () => { console.log('Observer 2'); };
 * const subject = new DataMutationObserverSubject(observer1, observer2);
 * ```
 */
export const ObservableSubject = function (this: IObservableSubject) {
    this.observers = []

    this.cleanupRegistry = new FinalizationRegistry((ref) => {
        // Remove the observer ref from the list when GC'd
        this.observers = this.observers.filter((item) => item !== ref)
    })
} as any as IObservableSubject

Object.assign(ObservableSubject.prototype, {
    subscribe,
    unSubscribe,
    unSubscribeAll,
    trigger
})
