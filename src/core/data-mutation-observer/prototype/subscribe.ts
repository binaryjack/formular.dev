import { IDataMutationObserverSubject } from '../data-mutation-observer-subject.types'

/**
 * Adds one or more observer functions to the list of observers.
 *
 * @param fns - The observer functions to add.
 */
export function subscribe(this: IDataMutationObserverSubject, ...fns: observableFunction[]) {
    for (const fn of fns) {
        if (this.observers.find((o: observableFunction) => o === fn)) continue
        this.observers.push(fn)
    }
}
