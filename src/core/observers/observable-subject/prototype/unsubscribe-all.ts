import { IObservableSubject } from '../observable-subject.types'

/**
 * Removes all observer functions from the list of observers.
 */
export function unSubscribeAll(this: IObservableSubject) {
    for (const fn of this.observers) {
        this.cleanupRegistry.unregister(fn)
    }
    this.observers = []
}
