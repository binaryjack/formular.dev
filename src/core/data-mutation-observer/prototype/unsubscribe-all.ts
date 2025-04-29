import { IDataMutationObserverSubject } from '../data-mutation-observer-subject.types'

/**
 * Removes all observer functions from the list of observers.
 */
export function unSubscribeAll(this: IDataMutationObserverSubject) {
    this.observers = []
}
