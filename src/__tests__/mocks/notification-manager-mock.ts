import { ObservableSubject } from '@core/observers/observable-subject/observable-subject'
import { NotificationManager } from '../../core/managers/notification-manager/notification-manager'

export function createNotificationManagerMock(overrides: Partial<any> = {}) {
    // Create a new instance
    // @ts-ignore
    const manager = new (NotificationManager as any)()

    // Mock methods commonly used in tests
    manager.notify = jest.fn()
    manager.accept = jest.fn()
    manager.dismiss = jest.fn()
    manager.dispose = jest.fn()
    manager.trigger = jest.fn()
    manager.batchNotify = jest.fn()
    manager.flushPendingNotifications = jest.fn()
    manager.setBatchConfig = jest.fn()
    manager.scheduleBatch = jest.fn()
    manager.processBatch = jest.fn()
    manager.processPriorityBatches = jest.fn()
    manager.processSimpleBatch = jest.fn()
    manager.processNotificationBatch = jest.fn()
    manager.groupEventsByType = jest.fn()
    manager.processEventGroup = jest.fn()
    manager.getRegisteredNotifierNames = jest.fn(() => [])

    // Mock observers if needed
    manager.observers = new ObservableSubject()

    // Optionally override any properties or methods (after mocks)
    Object.assign(manager, overrides)

    return manager
}
