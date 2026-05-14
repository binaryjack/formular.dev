export type TObservableFunction<T = any> = (event?: T) => void

export interface IChannelObservers<T = any> {
    weak: Array<WeakRef<TObservableFunction<T>>>
    strong: Array<TObservableFunction<T>>
}

export interface IObservableSubject<T = any> {
    new (...fns: TObservableFunction[]): IObservableSubject
    observersWeak: Array<WeakRef<TObservableFunction<T>>>
    observersStrong: Array<TObservableFunction<T>>
    channels: Map<string, IChannelObservers<T>>
    cleanupRegistry: FinalizationRegistry<WeakRef<TObservableFunction<T>>>
    subscribe: <T = any>(
        channelOrFn: string | TObservableFunction<T>,
        fnOrUseWeak?: TObservableFunction<T> | boolean,
        useWeak?: boolean
    ) => void
    unSubscribe: <T = any>(
        channelOrFn: string | TObservableFunction<T>,
        fnOrForWeak?: TObservableFunction<T> | boolean,
        forWeak?: boolean
    ) => void
    debounceTrigger: (channelOrDelay?: string | number, delay?: number) => void
    unSubscribeAll: (channelOrForWeak?: string | boolean, forWeak?: boolean) => void
    trigger: (channel?: string) => void
}
