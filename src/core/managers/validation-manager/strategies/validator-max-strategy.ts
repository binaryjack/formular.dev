import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import {
    IValidationMethodStrategy,
    IValidationStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

export const ValidatorMaxStrategy = function (this: IValidationMethodStrategy) {
    this.validate = function (field: IInput) {
        if (!data?.validationOptions?.max) {
            return newValidationResult(true, data.fieldName, ValidationErrorsCodes.max)
        }
        const hasValue = !valueIsNullOrUndefined(data?.value)
        if (
            hasValue &&
            (isNaN(Number(data?.value)) || Number(data?.value) > data.validationOptions.max.max)
        ) {
            return newValidationResult(
                false,
                data.fieldName,
                ValidationErrorsCodes.max,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.max,
                    data.validationOptions.max.error ?? undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.max,
                    data.validationOptions.max?.guide ?? undefined
                ),
                data
            )
        }

        return newValidationResult(true, data.fieldName, ValidationErrorsCodes.max)
    }
} as any as IValidationMethodStrategy
