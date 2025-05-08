import { addValidationStrategies } from './prototype/add-validation-strategies'
import { setValidationTriggerMode } from './prototype/set-validation-trigger-mode'

import { initialize } from './prototype/initialize'
import { validate } from './prototype/validate'
import { validateAll } from './prototype/validate-all'
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
export const ValidationStrategy = function (this: IValidationStrategy) {
    this.isInitialized = false
    this.isValidating = false
    this.validationStrategies = []
    this.validationTriggerModeType = []
    this.dependencyName = ValidationStrategy.name
} as any as IValidationStrategy

Object.assign(ValidationStrategy.prototype, {
    initialize,
    addValidationStrategies,
    setValidationTriggerMode,
    validate,
    validateAll
})
