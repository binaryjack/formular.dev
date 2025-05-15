import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

const ValidatorRequiredStrategy = function (this: IValidationMethodStrategy) {
    this.name = ValidatorRequiredStrategy.name
    this.validate = function (field: IExtendedInput) {
        const name = field.input.name
        const value = field.input.valueManager.getValue(field)
        if (!field?.input.validationOptions?.requiredData?.required) {
            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.required,
                field.input.validationManager.validationTriggerModeType
            )
        }
        // Remove expectedValue logic since 'expectedValue' does not exist on IRequired
        const hasValue = !valueIsNullOrUndefined(value)
        if (!hasValue) {
            return newValidationResult(
                false,
                name,
                ValidationErrorsCodes.required,
                field.input.validationManager.validationTriggerModeType,
                newFieldError(
                    name,
                    ValidationErrorsCodes.required,
                    field.input.validationOptions.requiredData?.error ?? undefined
                ),
                newFieldGuide(
                    name,
                    ValidationErrorsCodes.required,
                    field.input.validationOptions.requiredData?.guide ?? undefined
                )
            )
        }
        return newValidationResult(
            true,
            name,
            ValidationErrorsCodes.required,
            field.input.validationManager.validationTriggerModeType
        )
    }
} as any as IValidationMethodStrategy

export const validatorRequiredStrategy = new ValidatorRequiredStrategy()
