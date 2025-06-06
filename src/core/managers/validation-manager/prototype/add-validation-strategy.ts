import { IValidationManager, IValidationMethodStrategy } from '../validation-manager.types'

/**
 * Adds one or more validation strategies to the Validator instance.
 * @param {...IValidationManager[]} strategies - An array of strategies to be added.
 */
export function addValidationStrategy(
    this: IValidationManager,
    strategy: IValidationMethodStrategy
) {
    this.validationStrategies = [...this.validationStrategies, strategy]
}
