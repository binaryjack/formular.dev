import { IDataMutationObserverSubject } from '../data-mutation-observer-subject.types'

/**
 * Removes one or more observer functions from the list of observers.
 *
 * @param fns - The observer functions to remove.
 */
export function unSubscribe(this: IDataMutationObserverSubject, ...fns: observableFunction[]) {
    for (const fn of fns) {
        this.observers = [...this.observers.filter((o: observableFunction) => o !== fn)]
    }
}
