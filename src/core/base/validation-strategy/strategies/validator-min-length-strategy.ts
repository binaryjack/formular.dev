import { newFieldError, newFieldGuide } from '../../../../dependency/errors'
import { valueIsNullOrUndefined } from '../../field-input-base/utils/value-is-null-or-undefined'

import {
    IValidatorStrategy,
    IValidatorStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from '../validator.types'

export const ValidatorMinLengthStrategy = function (this: IValidatorStrategy) {
    this.validate = function (data: IValidatorStrategyData) {
        if (!data?.validationOptions?.minLength) {
            return newValidationResult(true, data.fieldName, ValidationErrorsCodes.minLength)
        }
        const hasValue = !valueIsNullOrUndefined(data?.value)

        if (hasValue && data.toString().length < data.validationOptions?.minLength.minLength) {
            return newValidationResult(
                false,
                data.fieldName,
                ValidationErrorsCodes.minLength,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.minLength,
                    data.validationOptions.minLength.error ?? undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.minLength,
                    data.validationOptions.minLength?.guide ?? undefined
                ),
                data
            )
        }

        return newValidationResult(true, data.fieldName, ValidationErrorsCodes.minLength)
    }
} as any as IValidatorStrategy
