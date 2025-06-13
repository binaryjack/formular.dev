import { ObservableSubject } from '@core/observers/observable-subject/observable-subject'
import { NotificationManager } from './notification-manager'

describe('NotificationManager', () => {
    it('should initialize with default properties', () => {
        // @ts-ignore
        const manager = new (NotificationManager as any)()
        expect(manager.autoTracker).toBeUndefined()
        expect(manager.notifiers).toBeInstanceOf(Map)
        expect(manager.observers).toBeInstanceOf(ObservableSubject)
        expect(manager.batchQueue).toEqual([])
        expect(manager.priorityQueues).toBeInstanceOf(Map)
        expect(manager.isBatchScheduled).toBe(false)
        expect(manager.batchTimeout).toBeNull()
        expect(manager.batchConfig).toEqual({
            maxBatchSize: 50,
            batchDelay: 16,
            enablePriority: true,
            strategy: 'microtask'
        })
        expect(manager.dependencyName).toBe('')
        expect(manager.isInitialized).toBe(false)
    })

    it('should allow setting autoTracker', () => {
        // @ts-ignore
        const auto = {} as any
        // @ts-ignore
        const manager = new (NotificationManager as any)(auto)
        expect(manager.autoTracker).toBe(auto)
    })
})
