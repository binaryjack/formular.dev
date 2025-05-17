export type TObservableFunction<T = any> = (event?: T) => void

export interface IObservableSubject<T = any> {
    new (...fns: TObservableFunction[]): IObservableSubject
    observers: Array<WeakRef<TObservableFunction<T>>>
    cleanupRegistry: FinalizationRegistry<WeakRef<TObservableFunction<T>>>
    subscribe: <T = any>(...fns: TObservableFunction<T>[]) => void
    unSubscribe: <T = any>(...fns: TObservableFunction<T>[]) => void
    unSubscribeAll: () => void
    trigger: () => void
}
