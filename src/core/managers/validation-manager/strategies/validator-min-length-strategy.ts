import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import {
    IValidationMethodStrategy,
    IValidationStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

export const ValidatorMinLengthStrategy = function (this: IValidationMethodStrategy) {
    this.validate = function (field: IInput) {
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
