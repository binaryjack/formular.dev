import {
    IDataMutationObserverSubject,
    TObservableFunction
} from './dataMutationObserverSubject.types'

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
