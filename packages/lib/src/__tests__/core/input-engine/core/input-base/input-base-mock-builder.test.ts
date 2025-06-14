import { buildInputBaseMock } from './input-base-mock-builder'

describe('buildInputBaseMock', () => {
    it('should create an InputBase instance with default mocks', () => {
        const input = buildInputBaseMock()
        expect(input).toBeDefined()
        expect(input.dependencyName).toBe('InputBase')
        expect(input.isInitialized).toBe(false)
        expect(input.validationResults).toEqual([])
        expect(input.value).toBe(null)
        expect(input.isFocus).toBe(false)
    })

    it('should allow overriding descriptor and managers', () => {
        const customDescriptor = { name: 'customField' }
        const customNotificationManager = { debounceNotify: jest.fn() }
        const input = buildInputBaseMock({
            descriptor: customDescriptor,
            notificationManager: customNotificationManager
        })
        expect(input.name).toBe('customField')
        input.value = 'abc'
        expect(customNotificationManager.debounceNotify).toHaveBeenCalled()
    })
})
