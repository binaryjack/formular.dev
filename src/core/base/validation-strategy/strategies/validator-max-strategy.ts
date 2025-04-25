import { newFieldError, newFieldGuide } from '../../../../dependency/errors'
import { valueIsNullOrUndefined } from '../../field-input-base/utils/value-is-null-or-undefined'

import {
    IValidatorStrategy,
    IValidatorStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from '../validator.types'

export const ValidatorMaxStrategy = function (this: IValidatorStrategy) {
    this.validate = function (data: IValidatorStrategyData) {
        if (!data?.validationOptions?.max) {
            return newValidationResult(true, data.fieldName, ValidationErrorsCodes.max)
        }
        const hasValue = !valueIsNullOrUndefined(data?.value)
        if (
            hasValue &&
            (isNaN(Number(data?.value)) || Number(data?.value) > data.validationOptions.max.max)
        ) {
            return newValidationResult(
                false,
                data.fieldName,
                ValidationErrorsCodes.max,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.max,
                    data.validationOptions.max.error ?? undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.max,
                    data.validationOptions.max?.guide ?? undefined
                ),
                data
            )
        }

        return newValidationResult(true, data.fieldName, ValidationErrorsCodes.max)
    }
} as any as IValidatorStrategy
