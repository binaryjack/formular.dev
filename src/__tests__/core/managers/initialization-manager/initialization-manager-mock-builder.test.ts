import { createInitializationManagerMock } from '@core/managers/initialization-manager/initialization-manager-mock-builder'

describe('createInitializationManagerMock', () => {
    it('should create a mock InitializationManager with default values', () => {
        const mock = createInitializationManagerMock()
        expect(mock).toHaveProperty('params')
        expect(mock).toHaveProperty('initializer', undefined)
        expect(typeof mock.addInitializer).toBe('function')
        expect(typeof mock.executeSequences).toBe('function')
    })

    it('should allow overriding properties', () => {
        const customInitializer = jest.fn()
        const mock = createInitializationManagerMock({ initializer: customInitializer as any })
        expect(mock.initializer).toBe(customInitializer)
    })

    it('should call overridden addInitializer and executeSequences', () => {
        const addInitializer = jest.fn()
        const executeSequences = jest.fn()
        const mock = createInitializationManagerMock({ addInitializer, executeSequences })
        mock.addInitializer!('test', () => {})
        mock.executeSequences!()
        expect(addInitializer).toHaveBeenCalledWith('test', expect.any(Function))
        expect(executeSequences).toHaveBeenCalled()
    })
})
