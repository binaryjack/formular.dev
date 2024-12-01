import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import {
    IValidatorStrategy,
    IValidatorStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from './validator.types'

const ValidatorRequired = function (this: IValidatorStrategy) {
    this.validate = function (data: IValidatorStrategyData) {
        const hasExpectedValue = !!data.expectedValue
        const hasValue = !!data?.value

        if (!data?.validationOptions?.required) {
            return newValidationResult(true, data.fieldName)
        }

        if (!hasValue || (hasValue && hasExpectedValue && data.expectedValue !== data?.value)) {
            return newValidationResult(
                false,
                data.fieldName,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.required,
                    data.validationOptions.required?.error
                        ? data.validationOptions.required?.error
                        : undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.required,
                    data.validationOptions.required?.guide
                        ? data.validationOptions.required?.guide
                        : undefined
                )
            )
        }

        return newValidationResult(true, data.fieldName)
    }
} as any as IValidatorStrategy
const validatorRequired = new ValidatorRequired()
export default validatorRequired
