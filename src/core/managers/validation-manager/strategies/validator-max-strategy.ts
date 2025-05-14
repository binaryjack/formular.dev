import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

export const ValidatorMaxStrategy = function (this: IValidationMethodStrategy) {
    this.validate = function (field: IExtendedInput) {
        const name = field.name
        const value = field.input.valueManager.getValue(field)
        if (!field?.input.validationOptions?.max) {
            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.max,
                field.input.validationManager.validationTriggerModeType
            )
        }
        const hasValue = !valueIsNullOrUndefined(value)
        if (
            hasValue &&
            (isNaN(Number(value)) || Number(value) > field.input.validationOptions.max.max)
        ) {
            return newValidationResult(
                false,
                name,
                ValidationErrorsCodes.max,
                field.input.validationManager.validationTriggerModeType,
                newFieldError(
                    name,
                    ValidationErrorsCodes.max,
                    field.input.validationOptions.max.error ?? undefined
                ),
                newFieldGuide(
                    name,
                    ValidationErrorsCodes.max,
                    field.input.validationOptions.max?.guide ?? undefined
                )
            )
        }
        return newValidationResult(
            true,
            name,
            ValidationErrorsCodes.max,
            field.input.validationManager.validationTriggerModeType
        )
    }
} as any as IValidationMethodStrategy
