import { newFieldError, newFieldGuide } from '@dependency/errors'
import { valueIsNullOrUndefined } from '../../field-input/utils/value-is-null-or-undefined'

import {
    IValidationStrategy,
    IValidationStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-strategy.types'

export const ValidatorMaxLengthStrategy = function (this: IValidationStrategy) {
    this.validate = function (data: IValidationStrategyData) {
        if (!data?.validationOptions?.maxLength) {
            return newValidationResult(true, data.fieldName, ValidationErrorsCodes.maxLength)
        }

        const hasValue = !valueIsNullOrUndefined(data?.value)

        if (hasValue && data.toString().length > data.validationOptions?.maxLength?.maxLength) {
            return newValidationResult(
                false,
                data.fieldName,
                ValidationErrorsCodes.maxLength,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.maxLength,
                    data.validationOptions.maxLength.error ?? undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.maxLength,
                    data.validationOptions.maxLength?.guide ?? undefined
                ),
                data
            )
        }

        return newValidationResult(true, data.fieldName, ValidationErrorsCodes.maxLength)
    }
} as any as IValidationStrategy
