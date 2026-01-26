import { IFormular } from '../formular-base.types'

/**
 * Subscribe to form or field-level notifications with optional debouncing.
 * This is an introspection helper and is gated by enableIntrospection config.
 * Zero cost if introspection is disabled.
 *
 * @param channel - Undefined for form-wide, or a field ID for field-specific updates
 * @param callback - Function to call when the channel fires
 * @param options - Optional debounce delay override
 * @returns Unsubscribe function
 */
export const observe = function <T extends object>(
    this: IFormular<T>,
    channel: string | undefined,
    callback: () => void,
    options?: { debounceDelay?: number }
) {
    const introspectionEnabled = (this as any)._introspectionEnabled
    const notificationManager = this.manager?.notificationManager

    if (!introspectionEnabled || !notificationManager) {
        // Return a no-op unsubscriber if introspection is disabled
        return () => {}
    }

    const debugStreamMaxSize = (this as any)._debugStreamMaxSize || 100
    const delay =
        options?.debounceDelay ?? (this as any).observablesDelay ?? (this as any).inputDelay ?? 100

    // Create wrapper callback that logs to debugStream
    const wrappedCallback = () => {
        // Log to debug stream (ring buffer)
        const debugStream = (this as any).debugStream || []
        debugStream.push({
            type: 'observer_fired',
            channel: channel || 'form-wide',
            timestamp: Date.now()
        })
        if (debugStream.length > debugStreamMaxSize) {
            debugStream.shift()
        }

        // Call the actual callback
        callback()
    }

    // Subscribe to the channel using notificationManager's observers
    if (channel) {
        notificationManager.observers.subscribe(channel, wrappedCallback, false)
    } else {
        // Form-wide subscription (no debounce needed for introspection)
        notificationManager.observers.subscribe(wrappedCallback, false)
    }

    // Track this subscription for cleanup
    const subscriptions = (this as any)._observerSubscriptions
    if (!subscriptions.has(channel)) {
        subscriptions.set(channel, [])
    }
    subscriptions.get(channel).push(wrappedCallback)

    // Return unsubscriber
    return () => {
        if (channel) {
            notificationManager.observers.unSubscribe(channel, wrappedCallback, false)
        } else {
            notificationManager.observers.unSubscribe(wrappedCallback, false)
        }

        // Clean up tracking
        const callbacks = subscriptions.get(channel)
        if (callbacks) {
            const idx = callbacks.indexOf(wrappedCallback)
            if (idx > -1) {
                callbacks.splice(idx, 1)
            }
        }
    }
}
