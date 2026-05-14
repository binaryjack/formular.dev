import { EventsType, IEvents } from '@core/framework/events/events.types'
import { newEvent } from '@core/framework/events/new-event'
import { IFormular } from '../formular-base.types'

/**
 * Subscribe to form-level events with a fluent API.
 * Returns a subscription object with .on() method for attaching callbacks.
 *
 * @param eventType - The event type to subscribe to (e.g., 'onValidate', 'onUiUpdate')
 * @param subscriptionName - Optional name/identifier for this subscription
 * @returns Subscription object with .on(callback) method
 *
 * @example
 * form.subscribe('onValidate', 'debug').on((data) => {
 *   console.log('Validation event:', data);
 * });
 */
export const subscribe = function <T extends object>(
    this: IFormular<T>,
    eventType: EventsType,
    subscriptionName?: string
) {
    const form = this
    const notificationManager = form.manager?.notificationManager

    if (!notificationManager) {
        console.warn('[Form.subscribe] NotificationManager not available')
        return {
            on: () => {
                console.warn(
                    '[Form.subscribe] Cannot subscribe - NotificationManager not initialized'
                )
                return () => {}
            }
        }
    }

    // Return fluent API object with .on() method
    return {
        /**
         * Attach callback to the subscribed event
         * @param callback - Function to call when event fires
         * @returns Unsubscribe function
         */
        on: <E extends IEvents>(callback: (data: E) => void) => {
            const subscriptionId = subscriptionName || `subscription-${Date.now()}`

            // Create notification handler with proper IEvents structure
            const notification = {
                event: newEvent('form', subscriptionId, eventType, subscriptionId),
                method: (data: IEvents) => {
                    callback(data as E)
                }
            }

            // Register with notification manager
            notificationManager.accept(notification)

            // Return unsubscribe function
            return () => {
                notificationManager.dismiss(notification)
            }
        }
    }
}
