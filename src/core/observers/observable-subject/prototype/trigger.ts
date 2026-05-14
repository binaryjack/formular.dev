import { IObservableSubject } from '../observable-subject.types'

/**
 * Executes observer functions for a specific channel or all observers if no channel specified.
 *
 * @param channel - Optional channel name to trigger specific subscribers
 */
export function trigger<T = any>(this: IObservableSubject, channel?: string) {
    if (channel) {
        // Channel-based trigger - only notify subscribers of this channel
        const channelObservers = this.channels.get(channel)
        if (!channelObservers) return

        channelObservers.strong.forEach((obs) => {
            if (obs) {
                obs?.call(this)
            }
        })

        channelObservers.weak.forEach((ref) => {
            const obs = ref.deref()
            if (obs) {
                obs?.call(this)
            }
        })
    } else {
        // Legacy global trigger - notify all observers
        this.observersStrong.forEach((obs) => {
            if (obs) {
                obs?.call(this)
            }
        })

        this.observersWeak.forEach((ref) => {
            const obs = ref.deref()
            if (obs) {
                obs?.call(this)
            }
        })
    }
}
