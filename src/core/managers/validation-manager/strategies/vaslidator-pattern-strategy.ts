import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

const ValidatorPatternStrategy = function (this: IValidationMethodStrategy) {
    this.name = ValidatorPatternStrategy.name
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
        const valueToBeTested = field.toString()
        if (hasValue && !regexp.test(valueToBeTested)) {
            return newValidationResult(
                false,
                name,
                ValidationErrorsCodes.custom,
                field.input.validationManager.validationTriggerModeType,
                newFieldError(
                    name,
                    ValidationErrorsCodes.custom,
                    field.input.validationOptions.pattern.error ?? undefined
                ),
                newFieldGuide(
                    name,
                    ValidationErrorsCodes.custom,
                    field.input.validationOptions.pattern?.guide ?? undefined
                )
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
