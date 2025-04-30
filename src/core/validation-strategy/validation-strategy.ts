import { addValidationStrategies } from './prototype/add-validation-strategies'

import { initializeValidationStrategy } from './prototype/initialize-validation-strategy'
import { validate } from './prototype/validate'
import { IValidationStrategy } from './validation-strategy.types'

/**
 * Validator class that implements the IValidator interface.
 *
 * @class
 * @implements {IValidator}
 *
 * @method addStrategies
 * @param {...IValidatorStrategy[]} strategies - An array of strategies to be added.
 *
 * @method validate
 * @param {IValidatorStrategyData} data - The data to be validated.
 * @returns {IValidationResult[]} An array of validation results from the applied strategies.
 */
export const ValidationStrategy = function (
    this: IValidationStrategy
) {} as any as IValidationStrategy

Object.assign(ValidationStrategy.prototype, {
    initializeValidationStrategy,
    addValidationStrategies,
    validate
})
