import { ObservableSubject } from './observable-subject'
import { TObservableFunction } from './observable-subject.types'

/**
 * Helper to build a mock ObservableSubject for testing.
 * Allows easy setup of observers and spying on trigger calls.
 */
export function createObservableSubjectMock({
    strongObservers = [],
    weakObservers = []
}: {
    strongObservers?: TObservableFunction[]
    weakObservers?: TObservableFunction[]
} = {}) {
    // @ts-ignore
    const subject = new ObservableSubject()
    strongObservers.forEach((fn) => subject.subscribe(fn, false))
    weakObservers.forEach((fn) => subject.subscribe(fn, true))
    return subject
}
