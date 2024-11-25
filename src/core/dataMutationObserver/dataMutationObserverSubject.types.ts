export type TObservableFunction = () => void

export interface IDataMutationObserverSubject {
    new (...fns: TObservableFunction[]): IDataMutationObserverSubject
    observers: TObservableFunction[]
    subscribe: (...fns: TObservableFunction[]) => void
    unSubscribe: (...fns: TObservableFunction[]) => void
    unSubscribeAll: () => void
    trigger: () => void
}
