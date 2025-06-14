import { IValidationManager, IValidationMethodStrategy } from '../validation-manager.types'

/**
 * Adds one or more validation strategies to the Validator instance.
 * @param {...IValidationManager[]} strategies - An array of strategies to be added.
 */
export function addValidationStrategies(
    this: IValidationManager,
    ...strategies: IValidationMethodStrategy[]
) {
    this.validationStrategies = strategies
}
