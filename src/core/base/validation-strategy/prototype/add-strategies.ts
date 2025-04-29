import { IValidator, IValidatorStrategy } from '../validator.types'

/**
 * Adds one or more validation strategies to the Validator instance.
 * @param {...IValidatorStrategy[]} strategies - An array of strategies to be added.
 */
export function addStrategies(this: IValidator, ...strategies: IValidatorStrategy[]) {
    this.strategies = strategies
}
