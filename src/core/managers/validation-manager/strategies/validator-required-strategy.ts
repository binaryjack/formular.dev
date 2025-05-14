import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import { isNullEmptyOrUndefined } from '@core/framework/utility/is-null-empty-or-undefined'
import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

export const ValidatorRequiredStrategy = function (this: IValidationMethodStrategy) {
    this.validate = function (field: IInput) {
        if (!data?.validationOptions?.requiredData?.required) {
            return newValidationResult(true, data.fieldName, ValidationErrorsCodes.required)
        }

        const hasExpectedValue = !!data.expectedValue
        const hasValue = !isNullEmptyOrUndefined(data?.value as string | null | undefined)

        if (!hasValue || (hasValue && hasExpectedValue && data.expectedValue !== data?.value)) {
            return newValidationResult(
                false,
                data.fieldName,
                ValidationErrorsCodes.required,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.required,
                    data.validationOptions.requiredData?.error ?? undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.required,
                    data.validationOptions.requiredData?.guide ?? undefined
                ),
                data
            )
        }

        return newValidationResult(true, data.fieldName, ValidationErrorsCodes.required)
    }
} as any as IValidationMethodStrategy
