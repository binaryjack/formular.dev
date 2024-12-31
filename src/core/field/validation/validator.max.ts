import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { valueIsNullOrUndefined } from '../fieldInputBase/utils'
import {
    IValidationResult,
    IValidatorStrategy,
    IValidatorStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from './validator.types'

type NewType = IValidationResult

const ValidatorMax = function (this: IValidatorStrategy) {
    this.validate = function (data: IValidatorStrategyData) {
        const hasValue = !valueIsNullOrUndefined(data?.value)

        if (!hasValue || !data?.validationOptions?.max) {
            return newValidationResult(true, data.fieldName)
        }

        if (isNaN(Number(data?.value)) || Number(data?.value) > data.validationOptions.max.max) {
            return newValidationResult(
                false,
                data.fieldName,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.max,
                    data.validationOptions.max.error ? data.validationOptions.max.error : undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.max,
                    data.validationOptions.max?.guide
                        ? data.validationOptions.max?.guide
                        : undefined
                ),
                data
            )
        }

        return newValidationResult(true, data.fieldName)
    }
} as any as IValidatorStrategy

const validatorMax = new ValidatorMax()
export default validatorMax
