import { IValidationMethodStrategy, IValidationStrategy } from '../validation-strategy.types'

/**
 * Adds one or more validation strategies to the Validator instance.
 * @param {...IValidationStrategy[]} strategies - An array of strategies to be added.
 */
export function addValidationStrategies(
    this: IValidationStrategy,
    ...strategies: IValidationMethodStrategy[]
) {
    this.validationStrategies = strategies
}
