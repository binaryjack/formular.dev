import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

const ValidatorRequiredStrategy = function (this: IValidationMethodStrategy) {
    this.name = ValidatorRequiredStrategy.name
    this.validateAsync = async function (field: IExtendedInput) {
        return Promise.resolve(this.validate(field))
    }
    this.validate = function (field: IExtendedInput) {
        const name = field.input.name
        const value = field.input.valueManager.getValue(field)
        if (!field?.input.validationOptions?.required?.value) {
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
                field.input.validationOptions.required?.error?.message ?? undefined,
                field.input.validationOptions.required?.guide?.message ?? undefined
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
