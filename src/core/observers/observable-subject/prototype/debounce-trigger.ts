import { EventsType } from '@core/framework/events/events.types'
import { clearCurrentCall } from '@core/framework/optimization/latest-calls/clear-current-call'
import { removeCallByType } from '@core/framework/optimization/latest-calls/remove-call-by-type'
import { takeLatest } from '@core/framework/optimization/latest-calls/take-latest'
import { IObservableSubject } from '../observable-subject.types'

/**
 * Executes observer functions for a specific channel or all observers with debouncing.
 *
 * @param channelOrDelay - Channel name (string) or delay (number, legacy)
 * @param delay - Delay in milliseconds (only when channel provided)
 */
const triggenrName: EventsType = 'onObserve'

export function debounceTrigger<T = any>(
    this: IObservableSubject,
    channelOrDelay?: string | number,
    delay: number = 0
) {
    // Determine if this is a channel-based or legacy call
    const isChannelBased = typeof channelOrDelay === 'string'
    const channel = isChannelBased ? channelOrDelay : undefined
    const actualDelay = isChannelBased ? delay : (channelOrDelay as number) || 0

    // console.log('-----debounceTrigger called:', { isChannelBased, channel, actualDelay })

    // Use channel-specific key for debouncing to prevent cross-channel cancellation
    const debounceKey = isChannelBased && channel ? `${triggenrName}:${channel}` : triggenrName

    clearCurrentCall(debounceKey as EventsType)

    const timeoutId: number | NodeJS.Timeout = setTimeout(() => {
        // console.log('-----debounceTrigger timeout executing for channel:', channel)
        if (isChannelBased && channel) {
            // Channel-based debounced trigger
            const channelObservers = this.channels.get(channel)
            // console.log(
            //     '-----debounceTrigger channel observers:',
            //     channelObservers ? 'found' : 'NOT FOUND',
            //     channelObservers?.strong.length,
            //     channelObservers?.weak.length
            // )
            if (channelObservers) {
                channelObservers.strong.forEach((obs) => {
                    if (obs) {
                        // console.log('-----debounceTrigger calling strong observer:', obs.name)
                        obs?.call(this)
                    }
                })

                channelObservers.weak.forEach((ref) => {
                    const obs = ref.deref()
                    if (obs) {
                        obs?.call(this)
                    }
                })
            }
        } else {
            // Legacy global debounced trigger
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

        removeCallByType(debounceKey as EventsType)
    }, actualDelay)

    takeLatest(debounceKey as EventsType, timeoutId)
}
