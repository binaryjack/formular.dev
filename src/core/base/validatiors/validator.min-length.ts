import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { valueIsNullOrUndefined } from '../fieldInputBase/utils'
import {
    IValidatorStrategy,
    IValidatorStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from './validator.types'

const ValidatorMinLength = function (this: IValidatorStrategy) {
    this.validate = function (data: IValidatorStrategyData) {
        const hasValue = !valueIsNullOrUndefined(data?.value)

        if (!hasValue || !data?.validationOptions?.minLength) {
            return newValidationResult(true, data.fieldName)
        }

        if (data.toString().length < data.validationOptions?.minLength.minLength) {
            return newValidationResult(
                false,
                data.fieldName,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.minLength,
                    data.validationOptions.minLength.error
                        ? data.validationOptions.minLength.error
                        : undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.minLength,
                    data.validationOptions.minLength?.guide
                        ? data.validationOptions.minLength?.guide
                        : undefined
                ),
                data
            )
        }

        return newValidationResult(true, data.fieldName)
    }
} as any as IValidatorStrategy

const validatorMinLength = new ValidatorMinLength()

export default validatorMinLength
