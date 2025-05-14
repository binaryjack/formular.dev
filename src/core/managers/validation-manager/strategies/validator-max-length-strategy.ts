import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

export const ValidatorMaxLengthStrategy = function (this: IValidationMethodStrategy) {
    this.validate = function (field: IInput) {
        const name = field.name
        const value = field.valueManager.getValue()

        if (!field?.validationOptions?.maxLength) {
            return newValidationResult(true, field.name, ValidationErrorsCodes.maxLength)
        }

        const hasValue = !valueIsNullOrUndefined(field?.value)

        if (hasValue && field.toString().length > field.validationOptions?.maxLength?.maxLength) {
            return newValidationResult(
                false,
                field.name,
                ValidationErrorsCodes.maxLength,
                newFieldError(
                    field.name,
                    ValidationErrorsCodes.maxLength,
                    field.validationOptions.maxLength.error ?? undefined
                ),
                newFieldGuide(
                    field.name,
                    ValidationErrorsCodes.maxLength,
                    field.validationOptions.maxLength?.guide ?? undefined
                ),
                field
            )
        }

        return newValidationResult(true, field.name, ValidationErrorsCodes.maxLength)
    }
} as any as IValidationMethodStrategy
