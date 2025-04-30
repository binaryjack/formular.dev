import { IFieldInput } from '../fields/field-base-input/field-input-base-types'
import { addStrategies } from './prototype/add-strategies'
import { initializeValidation } from './prototype/initialize-validations'
import { validate } from './prototype/validate'
import { IValidator } from './validation-strategy.types'

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
export const Validator = function (this: IValidator, field: IFieldInput) {
    this.field = field
    this.isValidating = false
    this.validationTriggerModeType = []
    this.validationResults = []
} as any as IValidator

Object.assign(Validator.prototype, {
    initializeValidation,
    addStrategies,
    validate
})
