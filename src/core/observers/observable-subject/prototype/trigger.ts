import { IObservableSubject } from '../observable-subject.types'

/**
 * Executes all observer functions in the list of observers.
 */
export function trigger(this: IObservableSubject) {
    this.observers.forEach((o: observableFunction) => o.call(this))
}
