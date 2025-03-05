import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { valueIsNullOrUndefined } from '../fieldInputBase/utils'
import {
    IValidatorStrategy,
    IValidatorStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from './validator.types'

const ValidatorMin = function (this: IValidatorStrategy) {
    this.validate = function (data: IValidatorStrategyData) {
        const hasValue = !valueIsNullOrUndefined(data?.value)

        if (!hasValue || !data?.validationOptions?.min) {
            return newValidationResult(true, data.fieldName)
        }

        if (isNaN(Number(data?.value)) || Number(data?.value) < data.validationOptions.min.min) {
            return newValidationResult(
                false,
                data.fieldName,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.min,
                    data.validationOptions.min.error ? data.validationOptions.min.error : undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.min,
                    data.validationOptions.min?.guide
                        ? data.validationOptions.min?.guide
                        : undefined
                ),
                data
            )
        }

        return newValidationResult(true, data.fieldName)
    }
} as any as IValidatorStrategy
const validatorMin = new ValidatorMin()
export default validatorMin
