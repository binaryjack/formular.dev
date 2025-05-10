import { newFieldError, newFieldGuide } from '@core/framework/errors'
import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import {
    IValidationMethodStrategy,
    IValidationStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

export const ValidatorMinLengthStrategy = function (this: IValidationMethodStrategy) {
    this.validate = function (data: IValidationStrategyData) {
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
} as any as IValidationMethodStrategy
