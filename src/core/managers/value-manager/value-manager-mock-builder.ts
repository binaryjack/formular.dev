import { ValueManager } from './value-manager'
import { IValueManager } from './value-manager.types'

/**
 * Creates a mock ValueManager with optional method overrides for testing.
 * @param overrides Partial implementation to override default ValueManager methods.
 */
export function createValueManagerMock(overrides: Partial<IValueManager> = {}): IValueManager {
    const mock = new (ValueManager as any)() as IValueManager
    return Object.assign(mock, overrides)
}
