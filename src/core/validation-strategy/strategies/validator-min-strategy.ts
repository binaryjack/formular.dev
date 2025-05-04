import { newFieldError, newFieldGuide } from '@dependency/errors'

import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import {
    IValidationMethodStrategy,
    IValidationStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-strategy.types'

export const ValidatorMinStrategy = function (this: IValidationMethodStrategy) {
    this.validate = function (data: IValidationStrategyData) {
        if (!data?.validationOptions?.min) {
            return newValidationResult(true, data.fieldName, ValidationErrorsCodes.min)
        }
        const hasValue = !valueIsNullOrUndefined(data?.value)

        if (
            hasValue &&
            (isNaN(Number(data?.value)) || Number(data?.value) < data.validationOptions.min.min)
        ) {
            return newValidationResult(
                false,
                data.fieldName,
                ValidationErrorsCodes.min,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.min,
                    data.validationOptions.min.error ?? undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.min,
                    data.validationOptions.min?.guide ?? undefined
                ),
                data
            )
        }

        return newValidationResult(true, data.fieldName, ValidationErrorsCodes.min)
    }
} as any as IValidationMethodStrategy
