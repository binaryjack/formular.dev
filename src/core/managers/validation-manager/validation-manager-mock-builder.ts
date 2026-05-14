import { ValidationManager } from './validation-manager'
import { IValidationManager } from './validation-manager.types'

/**
 * Creates a mock ValidationManager with optional overrides for testing.
 * @param overrides Partial properties or methods to override the default ValidationManager.
 */
export function createValidationManagerMock(
    overrides: Partial<IValidationManager> = {}
): IValidationManager {
    const instance = new (ValidationManager as any)() as IValidationManager
    return Object.assign(instance, overrides)
}
