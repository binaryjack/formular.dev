import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { valueIsNullOrUndefined } from '../fieldInputBase/utils'
import {
    IValidatorStrategy,
    IValidatorStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from './validator.types'

const ValidatorMaxLength = function (this: IValidatorStrategy) {
    this.validate = function (data: IValidatorStrategyData) {
        const hasValue = !valueIsNullOrUndefined(data?.value)

        if (!hasValue || !data?.validationOptions?.maxLength) {
            return newValidationResult(true, data.fieldName)
        }

        if (data.toString().length > data.validationOptions?.maxLength?.maxLength) {
            return newValidationResult(
                false,
                data.fieldName,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.maxLength,
                    data.validationOptions.maxLength.error ?? undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.maxLength,
                    data.validationOptions.maxLength?.guide ?? undefined
                ),
                data
            )
        }

        return newValidationResult(true, data.fieldName)
    }
} as any as IValidatorStrategy
const validatorMaxLength = new ValidatorMaxLength()
export default validatorMaxLength
