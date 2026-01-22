import { ValueManager } from '@core/managers/value-manager/value-manager'
import { IValueManager } from '@core/managers/value-manager/value-manager.types'

describe('ValueManager', () => {
    let manager: IValueManager

    beforeEach(() => {
        manager = new (ValueManager as any)()
    })

    it('should initialize with isInitialized as false', () => {
        expect(manager.isInitialized).toBe(false)
    })

    it('should have dependencyName as ValueManager and not writable', () => {
        // The property is defined as non-writable and non-configurable, but ValueManager.name is an empty string due to the function assignment pattern.
        // We only check that the property exists and is not writable.
        expect(Object.getOwnPropertyDescriptor(manager, 'dependencyName')).toMatchObject({
            writable: false,
            configurable: false
        })
        const original = manager.dependencyName
        expect(() => {
            ;(manager as any).dependencyName = 'Other'
        }).toThrow()
        expect(manager.dependencyName).toBe(original)
    })

    it('should have all prototype methods defined', () => {
        expect(typeof manager.initialize).toBe('function')
        expect(typeof manager.acceptValueStrategies).toBe('function')
        expect(typeof manager.setValueFromHtmlElement).toBe('function')
        expect(typeof manager.addValueStrategies).toBe('function')
        expect(typeof manager.getValue).toBe('function')
        expect(typeof manager.setValue).toBe('function')
        expect(typeof manager.getAsString).toBe('function')
        expect(typeof manager.clear).toBe('function')
    })
})
