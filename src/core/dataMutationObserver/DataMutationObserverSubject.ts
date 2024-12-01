import {
    IDataMutationObserverSubject,
    TObservableFunction
} from './dataMutationObserverSubject.types'

/**
 * Creates a new DataMutationObserverSubject instance.
 *
 * @param this - The context object which will hold the observers.
 * @param fns - A list of observable functions to be added as observers.
 *
 * @remarks
 * This function initializes the `observers` property with the provided functions.
 *
 * @example
 * ```typescript
 * const observer1 = () => { console.log('Observer 1'); };
 * const observer2 = () => { console.log('Observer 2'); };
 * const subject = new DataMutationObserverSubject(observer1, observer2);
 * ```
 */
export const DataMutationObserverSubject = function (
    this: IDataMutationObserverSubject,
    ...fns: TObservableFunction[]
) {
    this.observers = [...fns]
} as any as IDataMutationObserverSubject

DataMutationObserverSubject.prototype = {
    subscribe: function (...fns: observableFunction[]) {
        for (const fn of fns) {
            if (this.observers.find((o: observableFunction) => o === fn)) continue
            this.observers.push(fn)
        }
    },
    unSubscribe: function (...fns: observableFunction[]) {
        for (const fn of fns) {
            this.observers = [...this.observers.filter((o: observableFunction) => o !== fn)]
        }
    },
    unSubscribeAll: function () {
        this.observers = []
    },
    trigger: function () {
        this.observers.forEach((o: observableFunction) => o.call(this))
    }
}
