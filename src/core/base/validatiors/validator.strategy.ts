import validatorMax from './validator.max'
import validatorMaxLength from './validator.max-length'
import validatorMin from './validator.min'
import validatorMinLength from './validator.min-length'
import validatorRequired from './validator.required'
import {
    IValidationResult,
    IValidator,
    IValidatorStrategy,
    IValidatorStrategyData
} from './validator.types'
import validatorPattern from './vaslidator.pattern'

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
const Validator = function (this: IValidator) {
    this.addStrategies = function (...strategies: IValidatorStrategy[]) {
        this.strategies = strategies
    }
    this.validate = function (data: IValidatorStrategyData) {
        const output: IValidationResult[] = []

        if (data.origin?.fieldState === 'reset') {
            return output
        }

        for (const strategy of this.strategies) {
            output.push(strategy.validate(data))
        }

        return output
    }
} as any as IValidator

const validator = new Validator()

validator.addStrategies(
    validatorMaxLength,
    validatorMinLength,
    validatorMax,
    validatorMin,
    validatorRequired,
    validatorPattern
)

export default validator
