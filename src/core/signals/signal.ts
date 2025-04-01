import { useEffect, useRef, useState } from 'react'

import { DataMutationObserverSubject } from '../dataMutationObserver/DataMutationObserverSubject'
import { INotifier, notify, TNotifierType } from '../notifications/notifications.types'
import { ISignal, SignalType } from './signal.type'

/**
 * Signals module to manage reactive data signals
 */
export const Signals = (function () {
    const instances: Map<string, ISignal<unknown>> = new Map<string, ISignal<unknown>>()

    /**
     * Placeholder function for tracking management (currently unused)
     */
    const trackingManager = () => {}

    /**
     * Signal constructor function
     * @template SignalType
     * @param {string} id - Identifier for the signal
     * @param {SignalType | null} value - Initial value of the signal
     */
    const _Signal = function <SignalType>(
        this: ISignal<SignalType>,
        id: string,
        value: SignalType | null
    ) {
        /** accessing this variable will not trigger any listeners
         * if we need a notification we must use method .get()
         */
        this.value = value ?? null
        this.memoizedData = JSON.stringify(value)
        this.id = id
        this.parent = null
        this.notifiers = new Map<string, INotifier>()
        this.observer = new DataMutationObserverSubject()
        this.computedSignalCallback = null
    } as any as ISignal<SignalType>

    _Signal.prototype = {
        /**
         * Dispose of the signal, unsubscribing observers
         */
        dispose: function () {
            this.observer.unSubscribe(this.onChanged)
        },

        /**
         * Get the current value of the signal
         * @returns {SignalType} The current value
         */
        get: function () {
            // this.notify('get')
            return this.value
        },

        /**
         * Set a new value for the signal using a callback
         * @template SignalType
         * @param {function(ISignal<SignalType>): void} callback - Callback to set the new value
         */
        set: function <SignalType>(callback: (self: ISignal<SignalType>) => void) {
            callback(this)
        },

        /**
         * Update the signal's value using a callback
         * @param {function(ISignal<SignalType>): SignalType} callback - Callback to update the value
         */
        update: function (callback: (self: ISignal<SignalType>) => SignalType) {
            const updateValue = callback(this)
            const traceData = JSON.stringify(updateValue)
            if (this.memoizedData === traceData) {
                this.notify('changed')
                return
            }
            this.value = updateValue
            this.notify('changed')
        },

        /**
         * Define a computed signal based on a callback
         * @template SignalType
         * @param {function(): ISignal<SignalType>} callback - Callback to compute the signal value
         * @returns {ISignal<SignalType>} The computed signal
         */
        computed: function <SignalType>(callback: () => ISignal<SignalType>) {
            let value
            if (callback) {
                this.computedSignalCallback = callback
                value = callback()
                this.observer.subscribe(this.computed.bind(this))
            } else if (this.computedSignalCallback) {
                value = this.computedSignalCallback()
            } else {
                console.warn('computed callback not defined!')
            }
            // console.log('Computed triggered!', this.id)

            const signalName = `${this.id}-C`

            const computedSignal = Signal(signalName, value)

            const parentName = signalName.replace(/(-C)*/gm, '')
            if (this.id !== parentName && !computedSignal.parent) {
                const parentSignal = instances.get(parentName)
                computedSignal.parent = parentSignal
                parentSignal?.observer.subscribe(this.computed.bind(this))
            }

            const traceData = JSON.stringify(value)
            if (this.memoizedData === traceData) return Signal(signalName, this.value)

            return computedSignal
        },

        /**
         * Accept a notifier to observe the signal
         * @param {INotifier} notify - Notifier to accept
         */
        accept: function (notify: INotifier) {
            if (this.notifiers.has(notify.id)) return
            this.notifiers.set(notify.id, notify)
        },

        /**
         * Notify observers of a change in the signal
         * @param {TNotifierType} type - Type of notification
         */
        notify: function (type: TNotifierType) {
            this.notifiers.forEach((value: INotifier) => {
                if (value.type === type) {
                    console.log(`trigger - [${value.id}] on [${value.type}]`)
                    value.method(this)
                }
            })
            this.observer?.trigger()
        },
        /**
         * Subscribe a callback to be called when the signal changes
         * @param {function(): void} callback - Callback to call on change
         */
        onChanged: function (callback: () => void) {
            this.observer.subscribe(callback)
        }
    }

    /**
     * Create or retrieve a signal instance
     * @template SignalType
     * @param {string} id - Identifier for the signal
     * @param {SignalType | null} value - Initial value of the signal
     * @returns {ISignal<SignalType>} The signal instance
     */
    const Signal = <SignalType>(id: string, value: SignalType | null) => {
        if (instances.has(id)) {
            const output = instances.get(id)
            if (output) output.value = value
            return output as ISignal<SignalType>
        }
        const instance = new _Signal<SignalType>(id, value) as any
        instances.set(id, instance)
        return instance
    }

    /**
     * React hook to use signals in functional components
     * @template SignalType
     * @param {string} id - Identifier for the hook
     * @param {...ISignal<SignalType>} signals - Signals to use in the hook
     */
    const useSignal = <SignalType>(id: string, ...signals: ISignal<SignalType>[]) => {
        const [, setForceUpdate] = useState<number>(0)
        const signalRef = useRef<ISignal<SignalType>[]>([])

        const handleRefresh = () => {
            setForceUpdate((state) => state + 1)
        }

        useEffect(() => {
            signalRef.current = [...signals]
            ;(signalRef.current as ISignal<SignalType>[]).forEach((s) => {
                s.accept(
                    notify(
                        `${id}_${s.id}_hook_${handleRefresh.name}`,
                        handleRefresh.bind(useSignal),
                        'changed'
                    )
                )
            })
        }, [id, ...signals])
    }

    return {
        Signal,
        instances,
        useSignal
    }
})()
