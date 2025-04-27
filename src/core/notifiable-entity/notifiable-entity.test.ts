import { INotifier } from '../notifications/notifications.types'
import { NotifiableEntity } from './notifiable-entity'

// filepath: src/core/notifiable-entity/notifiable-entity.test.ts

describe('NotifiableEntity', () => {
    let entity: any
    let mockNotifier: INotifier

    beforeEach(() => {
        entity = new (NotifiableEntity as any)()
        mockNotifier = {
            id: 'test-notifier',
            type: 'test-event',
            method: jest.fn()
        }
    })

    it('should accept a notifier and add it to the notifiers map', () => {
        entity.accept(mockNotifier)
        expect(entity.notifiers.has(mockNotifier.id)).toBe(true)
    })

    it('should not add the same notifier twice', () => {
        entity.accept(mockNotifier)
        entity.accept(mockNotifier)
        expect(entity.notifiers.size).toBe(1)
    })

    it('should notify all notifiers of a specific type', () => {
        entity.accept(mockNotifier)
        entity.notify('test-event', { key: 'value' })
        expect(mockNotifier.method).toHaveBeenCalledWith({ key: 'value' })
    })

    it('should not notify notifiers of a different type', () => {
        entity.accept(mockNotifier)
        entity.notify('different-event', { key: 'value' })
        expect(mockNotifier.method).not.toHaveBeenCalled()
    })

    it('should dispose of all observers', () => {
        const unsubscribeSpy = jest.spyOn(entity.observers, 'unSubscribeAll')
        entity.dispose()
        expect(unsubscribeSpy).toHaveBeenCalled()
    })
})
