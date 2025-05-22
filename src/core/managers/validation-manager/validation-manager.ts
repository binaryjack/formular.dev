import { addValidationStrategies } from './prototype/add-validation-strategies'
import { setValidationTriggerMode } from './prototype/set-validation-trigger-mode'

import { addValidationStrategy } from './prototype/add-validation-strategy'
import { initialize } from './prototype/initialize'
import { validate } from './prototype/validate'
import { validateAsync } from './prototype/validateAsync'
import { validateMany } from './prototype/validateMany'
import { validateManyAsync } from './prototype/validateManyAsync'
import { IValidationManager } from './validation-manager.types'

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
export const ValidationManager = function (this: IValidationManager) {
    this.isInitialized = false
    this.isValidating = false
    this.validationStrategies = []
    this.validationTriggerModeType = []
    Object.defineProperty(this, 'dependencyName', {
        value: ValidationManager.name,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
} as any as IValidationManager

Object.assign(ValidationManager.prototype, {
    initialize,
    addValidationStrategies,
    addValidationStrategy,
    setValidationTriggerMode,
    validate,
    validateAsync,
    validateMany,
    validateManyAsync
})
