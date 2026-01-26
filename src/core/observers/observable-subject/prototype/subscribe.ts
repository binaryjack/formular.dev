import { IObservableSubject, TObservableFunction } from '../observable-subject.types'

/**
 * Adds one or more observer functions to the list of observers.
 * Supports both legacy (global) and channel-based subscriptions.
 *
 * @param channelOrFn - Channel name (string) or observer function (legacy)
 * @param fnOrUseWeak - Observer function if channel provided, or useWeak boolean (legacy)
 * @param useWeak - Whether to use weak reference (only when channel provided)
 */
export function subscribe<T = any>(
    this: IObservableSubject<T>,
    channelOrFn: string | TObservableFunction<T>,
    fnOrUseWeak?: TObservableFunction<T> | boolean,
    useWeak: boolean = false
) {
    // Determine if this is a channel-based or legacy call
    const isChannelBased = typeof channelOrFn === 'string'
    const channel = isChannelBased ? channelOrFn : undefined
    const obs = isChannelBased
        ? (fnOrUseWeak as TObservableFunction<T>)
        : (channelOrFn as TObservableFunction<T>)
    const useWeakRef = isChannelBased ? useWeak : (fnOrUseWeak as boolean) || false

    if (isChannelBased && channel) {
        // Channel-based subscription
        // console.log('-----ObservableSubject.subscribe to channel:', channel, 'callback:', obs.name)
        if (!this.channels.has(channel)) {
            this.channels.set(channel, { weak: [], strong: [] })
        }
        const channelObservers = this.channels.get(channel)!

        if (useWeakRef) {
            if (channelObservers.weak.find((o) => o.deref() === obs)) return
            const ref = new WeakRef(obs)
            channelObservers.weak.push(ref)
            this.cleanupRegistry.register(obs, ref)
        } else {
            if (channelObservers.strong.find((o) => o === obs)) return
            channelObservers.strong.push(obs)
        }
    } else {
        // Legacy global subscription
        if (useWeakRef) {
            if (
                this.observersWeak.find(
                    (o: WeakRef<TObservableFunction>) => obs.name.toString() === obs.name
                )
            )
                return

            const ref = new WeakRef(obs)
            this.observersWeak.push(ref)
            this.cleanupRegistry.register(obs, ref)
        } else {
            if (
                this.observersStrong.find(
                    (o: TObservableFunction<T>) => obs.name.toString() === obs.name
                )
            )
                return

            this.observersStrong.push(obs)
        }
    }
}
