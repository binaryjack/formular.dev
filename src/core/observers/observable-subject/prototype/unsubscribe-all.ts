import { IObservableSubject } from '../observable-subject.types'

/**
 * Removes all observer functions from the list of observers.
 */
export function unSubscribeAll(this: IObservableSubject) {
    for (const fn of this.observersStrong) {
        // console.log('Unsubscribing strong observer:', fn.name)
    }

    for (const fn of this.observersWeak) {
        // console.log('Unsubscribing weak observer:', fn.deref()?.name)
        this.cleanupRegistry.unregister(fn)
    }
    this.observersWeak = []
    this.observersStrong = []
}
