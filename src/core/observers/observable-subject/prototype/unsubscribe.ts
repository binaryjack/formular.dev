import { IObservableSubject, TObservableFunction } from '../observable-subject.types'

/**
 * Removes one or more observer functions from the list of observers.
 * Supports both legacy (global) and channel-based unsubscriptions.
 *
 * @param channelOrFn - Channel name (string) or observer function (legacy)
 * @param fnOrForWeak - Observer function if channel provided, or forWeak boolean (legacy)
 * @param forWeak - Whether to remove from weak references (only when channel provided)
 */
export function unSubscribe<T = any>(
    this: IObservableSubject,
    channelOrFn: string | TObservableFunction<T>,
    fnOrForWeak?: TObservableFunction<T> | boolean,
    forWeak?: boolean
) {
    // Determine if this is a channel-based or legacy call
    const isChannelBased = typeof channelOrFn === 'string'
    const channel = isChannelBased ? channelOrFn : undefined
    const fn = isChannelBased
        ? (fnOrForWeak as TObservableFunction<T>)
        : (channelOrFn as TObservableFunction<T>)
    const isWeak = isChannelBased ? forWeak || false : (fnOrForWeak as boolean)

    if (isChannelBased && channel) {
        // Channel-based unsubscription
        const channelObservers = this.channels.get(channel)
        if (!channelObservers) return

        if (isWeak) {
            channelObservers.weak = channelObservers.weak.filter((o) => o.deref() !== fn)
            this.cleanupRegistry.unregister(fn)
        } else {
            channelObservers.strong = channelObservers.strong.filter((o) => o !== fn)
        }

        // Clean up empty channels
        if (channelObservers.weak.length === 0 && channelObservers.strong.length === 0) {
            this.channels.delete(channel)
        }
    } else {
        // Legacy global unsubscription
        if (isWeak) {
            this.observersWeak = [
                ...this.observersWeak.filter((o: WeakRef<TObservableFunction>) => o.deref() !== fn)
            ]
            this.cleanupRegistry.unregister(fn)
        } else {
            this.observersStrong = [
                ...this.observersStrong.filter((o: TObservableFunction<T>) => o !== fn)
            ]
        }
    }
}
