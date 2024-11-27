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

const Validator = function (this: IValidator) {
    this.addStrategies = function (...strategies: IValidatorStrategy[]) {
        this.strategies = strategies
    }
    this.validate = function (data: IValidatorStrategyData) {
        const output: IValidationResult[] = []
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
