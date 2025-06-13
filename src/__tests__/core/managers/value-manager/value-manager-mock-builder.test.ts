import { mockConfiguration } from '@core/managers/value-manager/__mocks__/mock-configuration'
import { createValueManagerMock } from '@core/managers/value-manager/value-manager-mock-builder'
import { IValueManager } from '@core/managers/value-manager/value-manager.types'

describe('createValueManagerMock', () => {
    it('should create a ValueManager mock with default behavior', () => {
        const mock = createValueManagerMock()
        expect(mock).toBeDefined()
        expect(mock.isInitialized).toBe(false)
        expect(typeof mock.initialize).toBe('function')
    })

    it('should allow overriding methods', () => {
        const initialize = jest.fn()
        const mock = createValueManagerMock({ initialize } as Partial<IValueManager>)
        mock.initialize(mockConfiguration)
        expect(initialize).toHaveBeenCalledWith(mockConfiguration)
    })

    it('should allow overriding properties', () => {
        const mock = createValueManagerMock({ isInitialized: true })
        expect(mock.isInitialized).toBe(true)
    })
})
