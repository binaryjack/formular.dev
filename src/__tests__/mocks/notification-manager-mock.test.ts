import { ObservableSubject } from '@core/observers/observable-subject/observable-subject'
import { createNotificationManagerMock } from './notification-manager-mock'

describe('createNotificationManagerMock', () => {
    it('should create a mock NotificationManager with default mocks', () => {
        const mock = createNotificationManagerMock()
        expect(mock).toBeDefined()
        expect(typeof mock.notify).toBe('function')
        expect(typeof mock.accept).toBe('function')
        expect(typeof mock.dismiss).toBe('function')
        expect(typeof mock.dispose).toBe('function')
        expect(typeof mock.trigger).toBe('function')
        expect(typeof mock.batchNotify).toBe('function')
        expect(typeof mock.flushPendingNotifications).toBe('function')
        expect(typeof mock.setBatchConfig).toBe('function')
        expect(typeof mock.scheduleBatch).toBe('function')
        expect(typeof mock.processBatch).toBe('function')
        expect(typeof mock.processPriorityBatches).toBe('function')
        expect(typeof mock.processSimpleBatch).toBe('function')
        expect(typeof mock.processNotificationBatch).toBe('function')
        expect(typeof mock.groupEventsByType).toBe('function')
        expect(typeof mock.processEventGroup).toBe('function')
        expect(typeof mock.getRegisteredNotifierNames).toBe('function')
        expect(mock.getRegisteredNotifierNames()).toEqual([])
        expect(mock.observers).toBeInstanceOf(ObservableSubject)
    })

    it('should allow property/method overrides', () => {
        const customNotify = jest.fn()
        const mock = createNotificationManagerMock({ notify: customNotify, customProp: 123 })
        expect(mock.notify).toBe(customNotify)
        expect(mock.customProp).toBe(123)
    })
})
