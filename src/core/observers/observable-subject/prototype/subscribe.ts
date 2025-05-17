import { IObservableSubject, TObservableFunction } from '../observable-subject.types'

/**
 * Adds one or more observer functions to the list of observers.
 *
 * @param fns - The observer functions to add.
 */
export function subscribe<T = any>(this: IObservableSubject<T>, obs: TObservableFunction<T>) {
    if (this.observers.find((o: WeakRef<observableFunction>) => obs.name.toString() === obs.name))
        return

    const ref = new WeakRef(obs)
    this.observers.push(ref)
    this.cleanupRegistry.register(obs, ref)
}
