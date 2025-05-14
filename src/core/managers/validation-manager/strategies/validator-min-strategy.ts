import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import { data } from 'cypress/types/jquery'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

export const ValidatorMinStrategy = function (this: IValidationMethodStrategy) {
    this.validate = function (field: IInput) {
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
