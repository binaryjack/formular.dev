import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

const ValidatorMaxLengthStrategy = function (this: IValidationMethodStrategy) {
    this.name = ValidatorMaxLengthStrategy.name
    this.validateAsync = async function (field: IExtendedInput) {
        return Promise.resolve(this.validate(field))
    }
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
            String(value).length > field?.input.validationOptions?.maxLength?.maxLength
        ) {
            return newValidationResult(
                false,
                name,
                ValidationErrorsCodes.maxLength,
                field.input.validationManager.validationTriggerModeType,
                field?.input.validationOptions.maxLength.error?.message ?? undefined,
                field?.input.validationOptions.maxLength?.guide?.message ?? undefined
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
