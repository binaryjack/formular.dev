import { useEffect, useRef, useState } from 'react'

import { DataMutationObserverSubject } from '../dataMutationObserver/DataMutationObserverSubject'
import { INotifier, notify, TNotifierType } from '../notifications/notifications.types'
import { ISignal, SignalType } from './signal.type'

export const Signals = (function () {
    const instances: Map<string, ISignal<unknown>> = new Map<string, ISignal<unknown>>()

    const trackingManager = () => {}

    const _Signal = function <SignalType>(
        this: ISignal<SignalType>,
        id: string,
        value: SignalType | null
    ) {
        /** accessing this variable will not triggers any listeners
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
        dispose: function () {
            this.observer.unSubscribe(this.onChanged)
        },

        get: function () {
            // this.notify('get')
            return this.value
        },

        set: function <SignalType>(callback: (self: ISignal<SignalType>) => void) {
            callback(this)
        },

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
            console.log('Computed triggered!', this.id)

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

        accept: function (notify: INotifier) {
            if (this.notifiers.has(notify.id)) return
            this.notifiers.set(notify.id, notify)
        },

        notify: function (type: TNotifierType) {
            this.notifiers.forEach((value: INotifier) => {
                if (value.type === type) {
                    console.log(`trigger - [${value.id}] on [${value.type}]`)
                    value.method(this)
                }
            })
            this.observer?.trigger()
        },
        onChanged: function (callback: () => void) {
            this.observer.subscribe(callback)
        }
    }

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
