import { IObservableSubject, TObservableFunction } from '../observable-subject.types'

/**
 * Removes one or more observer functions from the list of observers.
 *
 * @param fns - The observer functions to remove.
 */
export function unSubscribe<T = any>(this: IObservableSubject, fn: TObservableFunction<T>) {
    this.observers = [
        ...this.observers.filter((o: WeakRef<observableFunction>) => o.deref() !== fn)
    ]
    this.cleanupRegistry.unregister(fn)
}
