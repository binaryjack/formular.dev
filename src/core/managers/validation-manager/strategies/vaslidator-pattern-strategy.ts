import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

const ValidatorPatternStrategy = function (this: IValidationMethodStrategy) {
    this.name = ValidatorPatternStrategy.name
    this.validateAsync = async function (field: IExtendedInput) {
        return Promise.resolve(this.validate(field))
    }
    this.validate = function (field: IExtendedInput) {
        const name = field.input.name
        const value = field.input.valueManager.getValue(field)
        if (!field?.input.validationOptions?.pattern?.pattern) {
            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.custom,
                field.input.validationManager.validationTriggerModeType
            )
        }
        const hasValue = !valueIsNullOrUndefined(value)
        const regexp = new RegExp(field.input.validationOptions.pattern.pattern)
        const valueToBeTested = String(value)
        if (hasValue && !regexp.test(valueToBeTested)) {
            return newValidationResult(
                false,
                name,
                ValidationErrorsCodes.custom,
                field.input.validationManager.validationTriggerModeType,
                field.input.validationOptions.pattern.error?.message ?? undefined,
                field.input.validationOptions.pattern?.guide?.message ?? undefined
            )
        }
        return newValidationResult(
            true,
            name,
            ValidationErrorsCodes.custom,
            field.input.validationManager.validationTriggerModeType
        )
    }
} as any as IValidationMethodStrategy

export const validatorPatternStrategy = new ValidatorPatternStrategy()
