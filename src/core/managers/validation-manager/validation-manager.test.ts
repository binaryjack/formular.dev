import { ValidationManager } from './validation-manager'

describe('ValidationManager', () => {
    let manager: any

    beforeEach(() => {
        manager = new (ValidationManager as any)()
    })

    it('should initialize with default properties', () => {
        expect(manager.isInitialized).toBe(false)
        expect(manager.isValidating).toBe(false)
        expect(manager.validationStrategies).toEqual([])
        expect(manager.triggerKeyWordType).toEqual([])
        expect(manager.dependencyName).toBe('ValidationManager')
    })

    it('should not allow dependencyName to be changed', () => {
        expect(() => {
            manager.dependencyName = 'OtherName'
        }).toThrow()
        expect(manager.dependencyName).toBe('ValidationManager')
    })

    it('should have required prototype methods', () => {
        expect(typeof manager.initialize).toBe('function')
        expect(typeof manager.addValidationStrategies).toBe('function')
        expect(typeof manager.addValidationStrategy).toBe('function')
        expect(typeof manager.setTriggerKeyWord).toBe('function')
        expect(typeof manager.validate).toBe('function')
        expect(typeof manager.validateAsync).toBe('function')
        expect(typeof manager.validateMany).toBe('function')
        expect(typeof manager.validateManyAsync).toBe('function')
    })
})
