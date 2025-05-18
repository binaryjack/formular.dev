import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

const ValidatorMinStrategy = function (this: IValidationMethodStrategy) {
    this.name = ValidatorMinStrategy.name
    this.validate = function (field: IExtendedInput) {
        const name = field.input.name
        const value = field.input.valueManager.getValue(field)
        if (!field?.input.validationOptions?.min) {
            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.min,
                field.input.validationManager.validationTriggerModeType
            )
        }
        const hasValue = !valueIsNullOrUndefined(value)
        if (
            hasValue &&
            (isNaN(Number(value)) || Number(value) < field.input.validationOptions.min.min)
        ) {
            return newValidationResult(
                false,
                name,
                ValidationErrorsCodes.min,
                field.input.validationManager.validationTriggerModeType,
                field.input.validationOptions.min.error?.message ?? undefined,
                field.input.validationOptions.min?.guide?.message ?? undefined
            )
        }
        return newValidationResult(
            true,
            name,
            ValidationErrorsCodes.min,
            field.input.validationManager.validationTriggerModeType
        )
    }
} as any as IValidationMethodStrategy

export const validatorMinStrategy = new ValidatorMinStrategy()
