import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

const ValidatorMaxLengthStrategy = function (this: IValidationMethodStrategy) {
    this.name = ValidatorMaxLengthStrategy.name
    this.validate = function (field: IExtendedInput) {
        const name = field.input.name
        const value = field.input.valueManager.getValue(field)

        if (!field?.input.validationOptions?.maxLength) {
            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.maxLength,
                field.input.validationManager.validationTriggerModeType
            )
        }

        const hasValue = !valueIsNullOrUndefined(value)

        if (
            hasValue &&
            field.toString().length > field?.input.validationOptions?.maxLength?.maxLength
        ) {
            return newValidationResult(
                false,
                name,
                ValidationErrorsCodes.maxLength,
                field.input.validationManager.validationTriggerModeType,
                newFieldError(
                    name,
                    ValidationErrorsCodes.maxLength,
                    field?.input.validationOptions.maxLength.error ?? undefined
                ),
                newFieldGuide(
                    name,
                    ValidationErrorsCodes.maxLength,
                    field?.input.validationOptions.maxLength?.guide ?? undefined
                )
            )
        }

        return newValidationResult(
            true,
            name,
            ValidationErrorsCodes.maxLength,
            field.input.validationManager.validationTriggerModeType
        )
    }
} as any as IValidationMethodStrategy

export const validatorMaxLengthStrategy = new ValidatorMaxLengthStrategy()
