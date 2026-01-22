import { EventsType } from '@core/framework/events/events.types'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IValidationManager,
    SValidationManager
} from '@core/managers/validation-manager/validation-manager.types'
import {
    IValidationTriggerService,
    ValidationTriggerService
} from '@setup/services/validation-trigger-service'

describe('ValidationTriggerService', () => {
    let mockServiceManager: jest.Mocked<IServiceManager>
    let mockValidationManager: jest.Mocked<IValidationManager>
    let service: IValidationTriggerService

    beforeEach(() => {
        mockValidationManager = {
            setTriggerKeyWord: jest.fn()
        } as any

        const mockLazyResolver = jest.fn().mockReturnValue(mockValidationManager)

        mockServiceManager = {
            lazy: jest.fn().mockReturnValue(mockLazyResolver)
        } as any

        service = new (ValidationTriggerService as any)(mockServiceManager)
    })

    describe('constructor', () => {
        it('should create service instance with empty triggers array', () => {
            expect(service.triggers).toEqual([])
            expect(service.sm).toBe(mockServiceManager)
        })

        it('should throw error when ServiceManager is not provided', () => {
            expect(() => {
                new (ValidationTriggerService as any)(null)
            }).toThrow(
                'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
            )

            expect(() => {
                new (ValidationTriggerService as any)(undefined)
            }).toThrow(
                'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
            )
        })
    })

    describe('add method', () => {
        it('should add single trigger', () => {
            service.add('onChange')

            expect(service.triggers).toEqual(['onChange'])
            expect(mockServiceManager.lazy).toHaveBeenCalledWith(SValidationManager)
            expect(mockValidationManager.setTriggerKeyWord).toHaveBeenCalledWith(['onChange'])
        })

        it('should add multiple triggers', () => {
            service.add('onChange', 'onBlur', 'onFocus')

            expect(service.triggers).toEqual(['onChange', 'onBlur', 'onFocus'])
            expect(mockValidationManager.setTriggerKeyWord).toHaveBeenCalledWith([
                'onChange',
                'onBlur',
                'onFocus'
            ])
        })

        it('should not add duplicate triggers', () => {
            service.add('onChange', 'onBlur')
            service.add('onChange', 'onKeyUp')

            expect(service.triggers).toEqual(['onChange', 'onBlur', 'onKeyUp'])
            expect(mockValidationManager.setTriggerKeyWord).toHaveBeenCalledTimes(2)
        })

        it('should handle adding to existing triggers', () => {
            service.add('onChange')
            service.add('onBlur', 'onFocus')

            expect(service.triggers).toEqual(['onChange', 'onBlur', 'onFocus'])
        })
    })

    describe('remove method', () => {
        beforeEach(() => {
            service.add('onChange', 'onBlur', 'onFocus', 'onKeyUp')
        })

        it('should remove single trigger', () => {
            service.remove('onBlur')

            expect(service.triggers).toEqual(['onChange', 'onFocus', 'onKeyUp'])
            expect(mockValidationManager.setTriggerKeyWord).toHaveBeenLastCalledWith([
                'onChange',
                'onFocus',
                'onKeyUp'
            ])
        })

        it('should remove multiple triggers', () => {
            service.remove('onChange', 'onFocus')

            expect(service.triggers).toEqual(['onBlur', 'onKeyUp'])
            expect(mockValidationManager.setTriggerKeyWord).toHaveBeenLastCalledWith([
                'onBlur',
                'onKeyUp'
            ])
        })

        it('should handle removing non-existent triggers', () => {
            const originalTriggers = [...service.triggers]
            service.remove('onSubmit' as EventsType)

            expect(service.triggers).toEqual(originalTriggers)
        })

        it('should remove all occurrences of a trigger', () => {
            // Manually add duplicate (though add method prevents this)
            service.triggers.push('onChange')
            service.remove('onChange')

            expect(service.triggers).not.toContain('onChange')
        })
    })

    describe('canTrigger method', () => {
        beforeEach(() => {
            service.add('onChange', 'onBlur', 'onFocus')
        })

        it('should return true when trigger exists', () => {
            expect(service.canTrigger('onChange')).toBe(true)
            expect(service.canTrigger('onBlur')).toBe(true)
            expect(service.canTrigger('onFocus')).toBe(true)
        })

        it('should return false when trigger does not exist', () => {
            expect(service.canTrigger('onSubmit' as EventsType)).toBe(false)
            expect(service.canTrigger('onKeyUp')).toBe(false)
        })

        it('should return true when at least one trigger exists', () => {
            expect(service.canTrigger('onChange', 'onSubmit' as EventsType)).toBe(true)
            expect(service.canTrigger('onSubmit' as EventsType, 'onBlur')).toBe(true)
        })

        it('should return false when no triggers exist', () => {
            expect(service.canTrigger('onSubmit' as EventsType, 'onKeyUp')).toBe(false)
        })

        it('should handle empty triggers array', () => {
            service.reset()
            expect(service.canTrigger('onChange')).toBe(false)
        })
    })

    describe('reset method', () => {
        it('should clear all triggers', () => {
            service.add('onChange', 'onBlur', 'onFocus')

            expect(service.triggers).toHaveLength(3)

            service.reset()

            expect(service.triggers).toEqual([])
            expect(mockValidationManager.setTriggerKeyWord).toHaveBeenLastCalledWith([])
        })

        it('should sync after reset', () => {
            service.add('onChange')
            jest.clearAllMocks()

            service.reset()

            expect(mockServiceManager.lazy).toHaveBeenCalledWith(SValidationManager)
            expect(mockValidationManager.setTriggerKeyWord).toHaveBeenCalledWith([])
        })
    })

    describe('sync method', () => {
        it('should call validation manager setTriggerKeyWord', () => {
            service.add('onChange', 'onBlur')

            expect(mockServiceManager.lazy).toHaveBeenCalledWith(SValidationManager)
            expect(mockValidationManager.setTriggerKeyWord).toHaveBeenCalledWith([
                'onChange',
                'onBlur'
            ])
        })

        it('should handle when validation manager is not available', () => {
            const mockLazyResolver = jest.fn().mockReturnValue(undefined)
            mockServiceManager.lazy.mockReturnValue(mockLazyResolver)

            expect(() => {
                service.sync()
            }).not.toThrow()
        })

        it('should be called after add, remove, and reset operations', () => {
            jest.clearAllMocks()

            service.add('onChange')
            expect(mockValidationManager.setTriggerKeyWord).toHaveBeenCalledTimes(1)

            service.remove('onChange')
            expect(mockValidationManager.setTriggerKeyWord).toHaveBeenCalledTimes(2)

            service.reset()
            expect(mockValidationManager.setTriggerKeyWord).toHaveBeenCalledTimes(3)
        })
    })

    describe('triggers property', () => {
        it('should be readable', () => {
            service.add('onChange', 'onBlur')

            expect(service.triggers).toEqual(['onChange', 'onBlur'])
        })

        it('should be enumerable', () => {
            service.add('onChange')

            const descriptor = Object.getOwnPropertyDescriptor(service, 'triggers')
            expect(descriptor?.enumerable).toBe(true)
        })

        it('should not be configurable', () => {
            const descriptor = Object.getOwnPropertyDescriptor(service, 'triggers')
            expect(descriptor?.configurable).toBe(false)
        })
    })

    describe('integration scenarios', () => {
        it('should handle complete workflow', () => {
            // Start with empty triggers
            expect(service.triggers).toEqual([])

            // Add initial triggers
            service.add('onChange', 'onBlur')
            expect(service.canTrigger('onChange')).toBe(true)
            expect(service.canTrigger('onFocus')).toBe(false)

            // Add more triggers
            service.add('onFocus', 'onKeyUp')
            expect(service.triggers).toEqual(['onChange', 'onBlur', 'onFocus', 'onKeyUp'])

            // Remove some triggers
            service.remove('onBlur', 'onKeyUp')
            expect(service.triggers).toEqual(['onChange', 'onFocus'])

            // Check trigger capability
            expect(service.canTrigger('onChange', 'onSubmit' as EventsType)).toBe(true)
            expect(service.canTrigger('onSubmit' as EventsType, 'onKeyDown')).toBe(false) // Reset all
            service.reset()
            expect(service.triggers).toEqual([])
            expect(service.canTrigger('onChange')).toBe(false)
        })

        it('should maintain sync with validation manager throughout workflow', () => {
            const syncCalls: string[][] = []

            mockValidationManager.setTriggerKeyWord.mockImplementation((triggers) => {
                syncCalls.push([...triggers])
            })

            service.add('onChange')
            service.add('onBlur')
            service.remove('onChange')
            service.reset()

            expect(syncCalls).toEqual([['onChange'], ['onChange', 'onBlur'], ['onBlur'], []])
        })
    })

    describe('event types handling', () => {
        const eventTypes: EventsType[] = ['onChange', 'onBlur', 'onFocus', 'onKeyUp', 'onKeyDown']

        eventTypes.forEach((eventType) => {
            it(`should handle ${eventType} event type`, () => {
                service.add(eventType)

                expect(service.triggers).toContain(eventType)
                expect(service.canTrigger(eventType)).toBe(true)

                service.remove(eventType)

                expect(service.triggers).not.toContain(eventType)
                expect(service.canTrigger(eventType)).toBe(false)
            })
        })
    })
})
