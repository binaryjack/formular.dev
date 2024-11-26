import { expect, test } from '@playwright/test'

import { Signals } from '../src/core/signals/signal'

test.describe('Signals Module', () => {
    test('should create a new signal', async () => {
        const signal = Signals.Signal<string>('testSignal', 'initialValue')
        expect(signal.get()).toBe('initialValue')
    })

    test('should update signal value', async () => {
        const signal = Signals.Signal<number>('testSignal', 1)
        signal.update((self) => {
            return 2
        })
        expect(signal.get()).toBe(2)
    })

    test('should notify observers on value change', async () => {
        const signal = Signals.Signal<boolean>('testSignal', true)
        let notified = false

        signal.onChanged(() => {
            notified = true
        })

        signal.update((self) => {
            return false
        })

        expect(notified).toBe(true)
    })

    test('should dispose of signal', async () => {
        const signal = Signals.Signal<any>('testSignal', { key: 'value' })
        signal.dispose()
        // Assuming dispose sets some internal state or unsubscribes observers.
        // Here you can add assertions to verify the dispose behavior.
        expect(signal.observer).toBeUndefined()
    })

    test('should compute signal value', async () => {
        const signal1 = Signals.Signal<number>('signal1', 1)
        const signal2 = Signals.Signal<number>('signal2', 2)

        const computedSignal = signal1.computed(() => {
            return Signals.Signal('computedSignal', signal1.get() + signal2.get())
        })

        expect(computedSignal.get()).toBe(3)

        signal1.update((self) => {
            return 2
        })

        expect(computedSignal.get()).toBe(4)
    })
})
