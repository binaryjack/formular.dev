import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

export const ValidatorMinLengthStrategy = function (this: IValidationMethodStrategy) {
    this.validate = function (field: IExtendedInput) {
        const name = field.name
        const value = field.input.valueManager.getValue(field)
        if (!field?.input.validationOptions?.minLength) {
            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.minLength,
                field.input.validationManager.validationTriggerModeType
            )
        }
        const hasValue = !valueIsNullOrUndefined(value)
        if (
            hasValue &&
            field.toString().length < field.input.validationOptions.minLength.minLength
        ) {
            return newValidationResult(
                false,
                name,
                ValidationErrorsCodes.minLength,
                field.input.validationManager.validationTriggerModeType,
                newFieldError(
                    name,
                    ValidationErrorsCodes.minLength,
                    field.input.validationOptions.minLength.error ?? undefined
                ),
                newFieldGuide(
                    name,
                    ValidationErrorsCodes.minLength,
                    field.input.validationOptions.minLength?.guide ?? undefined
                )
            )
        }
        return newValidationResult(
            true,
            name,
            ValidationErrorsCodes.minLength,
            field.input.validationManager.validationTriggerModeType
        )
    }
} as any as IValidationMethodStrategy
