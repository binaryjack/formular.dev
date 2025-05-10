export type TObservableFunction = () => void

export interface IObservableSubject {
    new (...fns: TObservableFunction[]): IObservableSubject
    observers: TObservableFunction[]
    subscribe: (...fns: TObservableFunction[]) => void
    unSubscribe: (...fns: TObservableFunction[]) => void
    unSubscribeAll: () => void
    trigger: () => void
}
