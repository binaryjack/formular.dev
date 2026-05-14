import { EventsEnum } from '@core/framework/events/events.types'
import { INotification } from '@core/managers/notification-manager/interfaces/i-notification'
import { NotificationManager } from '@core/managers/notification-manager/notification-manager'

describe('NotificationManager.debounceNotify behavior', () => {
    beforeEach(() => {
        jest.useFakeTimers()
        jest.spyOn(global, 'setTimeout')
        jest.spyOn(global, 'clearTimeout')
    })

    afterEach(() => {
        jest.useRealTimers()
        jest.restoreAllMocks()
    })

    it('coalesces multiple calls per type+channel and delivers last data', () => {
        // Arrange
        const manager = new (NotificationManager as any)()
        manager.initialize('test')
        const method = jest.fn()
        const notifier: INotification = {
            event: {
                fieldName: 'field',
                emitterName: 'emitter',
                types: [EventsEnum.onChange],
                action: 'mock',
                toFlags: () => ''
            },
            method
        }
        manager.notifiers.set('mock', notifier as any)

        const data1 = {
            fieldName: 'field',
            emitterName: 'A',
            types: [EventsEnum.onChange],
            action: 'mock',
            toFlags: () => ''
        }
        const data2 = {
            fieldName: 'field',
            emitterName: 'B',
            types: [EventsEnum.onChange],
            action: 'mock',
            toFlags: () => ''
        }
        const data3 = {
            fieldName: 'field',
            emitterName: 'C',
            types: [EventsEnum.onChange],
            action: 'mock',
            toFlags: () => ''
        }

        // Act: multiple rapid calls on same channel
        manager.debounceNotify(EventsEnum.onChange, 100, data1 as any, 'ch1')
        manager.debounceNotify(EventsEnum.onChange, 100, data2 as any, 'ch1')
        manager.debounceNotify(EventsEnum.onChange, 100, data3 as any, 'ch1')

        // Only one timeout should execute; it should deliver the last payload
        jest.advanceTimersByTime(100)

        // Assert
        expect(method).toHaveBeenCalledTimes(1)
        expect(method.mock.calls[0][0]).toMatchObject({ emitterName: 'C' })
    })

    it('debounces independently per channel', () => {
        // Arrange
        const manager = new (NotificationManager as any)()
        manager.initialize('test')
        const method = jest.fn()
        const notifier: INotification = {
            event: {
                fieldName: 'field',
                emitterName: 'emitter',
                types: [EventsEnum.onChange],
                action: 'mock',
                toFlags: () => ''
            },
            method
        }
        manager.notifiers.set('mock', notifier as any)

        // Act: same type, different channels
        manager.debounceNotify(
            EventsEnum.onChange,
            50,
            {
                fieldName: 'field1',
                emitterName: 'X',
                types: [EventsEnum.onChange],
                action: 'mock',
                toFlags: () => ''
            } as any,
            'ch1'
        )

        manager.debounceNotify(
            EventsEnum.onChange,
            50,
            {
                fieldName: 'field2',
                emitterName: 'Y',
                types: [EventsEnum.onChange],
                action: 'mock',
                toFlags: () => ''
            } as any,
            'ch2'
        )

        jest.advanceTimersByTime(50)

        // Assert: two independent notifications fired
        expect(method).toHaveBeenCalledTimes(2)
        const payloads = method.mock.calls.map((c) => c[0])
        expect(payloads.some((p: any) => p.emitterName === 'X')).toBe(true)
        expect(payloads.some((p: any) => p.emitterName === 'Y')).toBe(true)
    })
})
