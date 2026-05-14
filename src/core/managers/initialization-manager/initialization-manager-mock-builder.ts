import type { IInputConfiguration } from '@setup/providers/interfaces/i-input-configuration'
import type { IInitializationManager } from './initialization-manager.types'

/**
 * Mock builder for InitializationManager for testing purposes.
 */
export function createInitializationManagerMock(
    overrides: Partial<IInitializationManager> = {}
): Partial<IInitializationManager> {
    const defaultConfig: IInputConfiguration = {
        validationStrategies: [],
        trackingStrategies: [],
        valueStrategies: [],
        triggerKeyWordType: []
    }
    const mock: Partial<IInitializationManager> = {
        params: defaultConfig,
        initializer: undefined,
        addInitializer: jest.fn(),
        executeSequences: jest.fn(),
        ...overrides
    }
    return mock
}
