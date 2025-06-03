import { EventsType } from '@core/framework/events/events.types'
import { clearCurrentCall } from '@core/framework/optimization/latest-calls/clear-current-call'
import { removeCallByType } from '@core/framework/optimization/latest-calls/remove-call-by-type'
import { takeLatest } from '@core/framework/optimization/latest-calls/take-latest'
import { IObservableSubject } from '../observable-subject.types'

/**
 * Executes all observer functions in the list of observers.
 */
const triggenrName: EventsType = 'onObserve'

export function debounceTrigger<T = any>(this: IObservableSubject, delay: number = 0) {
    clearCurrentCall(triggenrName)

    const timeoutId: number | NodeJS.Timeout = setTimeout(() => {
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

        removeCallByType(triggenrName)
    }, delay)

    takeLatest(triggenrName, timeoutId)
}
