import { IDataMutationObserverSubject } from '../data-mutation-observer-subject.types'

/**
 * Executes all observer functions in the list of observers.
 */
export function trigger(this: IDataMutationObserverSubject) {
    this.observers.forEach((o: observableFunction) => o.call(this))
}
