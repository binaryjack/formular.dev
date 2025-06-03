import { IObservableSubject, TObservableFunction } from '../observable-subject.types'

/**
 * Adds one or more observer functions to the list of observers.
 *
 * @param fns - The observer functions to add.
 */
export function subscribe<T = any>(
    this: IObservableSubject<T>,
    obs: TObservableFunction<T>,
    useWeak: boolean = false
) {
    if (useWeak) {
        if (
            this.observersWeak.find(
                (o: WeakRef<observableFunction>) => obs.name.toString() === obs.name
            )
        )
            return

        const ref = new WeakRef(obs)
        this.observersWeak.push(ref)
        this.cleanupRegistry.register(obs, ref)
    } else {
        if (
            this.observersStrong.find(
                (o: TObservableFunction<T>) => obs.name.toString() === obs.name
            )
        )
            return

        this.observersStrong.push(obs)
    }
}
