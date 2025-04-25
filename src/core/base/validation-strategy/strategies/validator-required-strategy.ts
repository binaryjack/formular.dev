import { newFieldError, newFieldGuide } from '../../../../dependency/errors'
import { isNullEmptyOrUndefined } from '../../field-input-base/utils/is-null-empty-or-undefined'

import {
    IValidatorStrategy,
    IValidatorStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from '../validator.types'

export const ValidatorRequiredStrategy = function (this: IValidatorStrategy) {
    this.validate = function (data: IValidatorStrategyData) {
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
} as any as IValidatorStrategy
