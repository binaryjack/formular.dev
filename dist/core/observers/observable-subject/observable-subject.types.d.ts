export type TObservableFunction<T = any> = (event?: T) => void;
export interface IObservableSubject<T = any> {
    new (...fns: TObservableFunction[]): IObservableSubject;
    observersWeak: Array<WeakRef<TObservableFunction<T>>>;
    observersStrong: Array<TObservableFunction<T>>;
    cleanupRegistry: FinalizationRegistry<WeakRef<TObservableFunction<T>>>;
    subscribe: <T = any>(fns: TObservableFunction<T>, useWeak: boolean) => void;
    unSubscribe: <T = any>(fns: TObservableFunction<T>, forWeak: boolean) => void;
    debounceTrigger: (delay?: number) => void;
    unSubscribeAll: (forWeak: boolean) => void;
    trigger: () => void;
}
