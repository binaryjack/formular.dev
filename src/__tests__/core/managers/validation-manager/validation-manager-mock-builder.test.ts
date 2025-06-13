import { createValidationManagerMock } from '@core/managers/validation-manager/validation-manager-mock-builder'

describe('createValidationManagerMock', () => {
    it('should create a ValidationManager mock with default properties', () => {
        const mock = createValidationManagerMock()
        expect(mock.isInitialized).toBe(false)
        expect(mock.isValidating).toBe(false)
        expect(mock.validationStrategies).toEqual([])
        expect(mock.triggerKeyWordType).toEqual([])
        expect(mock.dependencyName).toBe('ValidationManager')
        expect(typeof mock.initialize).toBe('function')
    })

    it('should allow overriding properties and methods', () => {
        const customInitialize = jest.fn()
        const mock = createValidationManagerMock({
            isInitialized: true,
            initialize: customInitialize as any
        })
        expect(mock.isInitialized).toBe(true)
        expect(mock.initialize).toBe(customInitialize)
    })

    it('should allow mocking validation methods', () => {
        const validateMock = jest.fn().mockReturnValue([{ valid: true }])
        const mock = createValidationManagerMock({ validate: validateMock as any })
        const result = mock.validate({} as any)
        expect(validateMock).toHaveBeenCalled()
        expect(result).toEqual([{ valid: true }])
    })
})
