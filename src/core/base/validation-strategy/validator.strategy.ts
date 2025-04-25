import { ValidatorMaxLengthStrategy } from './strategies/validator-max-length-strategy'
import { ValidatorMaxStrategy } from './strategies/validator-max-strategy'
import { ValidatorMinLengthStrategy } from './strategies/validator-min-length-strategy'
import { ValidatorMinStrategy } from './strategies/validator-min-strategy'
import { ValidatorRequiredStrategy } from './strategies/validator-required-strategy'
import { ValidatorPatternStrategy } from './strategies/vaslidator-pattern-strategy'
import {
    IValidationResult,
    IValidator,
    IValidatorStrategy,
    IValidatorStrategyData
} from './validator.types'

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
    new ValidatorMaxLengthStrategy(),
    new ValidatorMinLengthStrategy(),
    new ValidatorMaxStrategy(),
    new ValidatorMinStrategy(),
    new ValidatorRequiredStrategy(),
    new ValidatorPatternStrategy()
)

export default validator
