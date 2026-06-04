import { IFormular } from '../formular-base.types'

/**
 * Unsubscribe all observers attached via observe().
 * Clears all introspection subscriptions.
 */
export const unobserveAll = function <T extends object>(this: IFormular<T>) {
    const subscriptions = this._observerSubscriptions
    const notificationManager = this.manager?.notificationManager

    if (!notificationManager || !subscriptions) {
        return
    }

    // Unsubscribe all tracked callbacks
    subscriptions.forEach((callbacks, channel) => {
        callbacks.forEach((callback) => {
            if (channel) {
                notificationManager.observers.unSubscribe(channel, callback, false)
            } else {
                notificationManager.observers.unSubscribe(callback, false)
            }
        })
    })

    // Clear the subscriptions map
    subscriptions.clear()

    // Clear the debug stream
    this.debugStream = []
}
