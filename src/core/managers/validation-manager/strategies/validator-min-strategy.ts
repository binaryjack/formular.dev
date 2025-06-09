import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

const ValidatorMinStrategy = function (this: IValidationMethodStrategy) {
    this.name = ValidatorMinStrategy.name
    this.validateAsync = async function (field: IExtendedInput) {
        return Promise.resolve(this.validate(field))
    }
    this.validate = function (field: IExtendedInput) {
        const name = field.input.name
        const value = field.input.valueManager.getValue(field, 'validation')
        if (!field?.input.validationOptions?.min) {
            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.min,
                field.input.validationManager.triggerKeyWordType
            )
        }
        const hasValue = !valueIsNullOrUndefined(value)
        if (
            hasValue &&
            (isNaN(Number(value)) || Number(value) < field.input.validationOptions.min.value)
        ) {
            return newValidationResult(
                false,
                name,
                ValidationErrorsCodes.min,
                field.input.validationManager.triggerKeyWordType,
                field.input.validationOptions.min.error?.message ?? undefined,
                field.input.validationOptions.min?.guide?.message ?? undefined
            )
        }
        return newValidationResult(
            true,
            name,
            ValidationErrorsCodes.min,
            field.input.validationManager.triggerKeyWordType
        )
    }
} as any as IValidationMethodStrategy

export const validatorMinStrategy = new ValidatorMinStrategy()
