import { newFieldError, newFieldGuide } from '@core/framework/errors'
import { isNullEmptyOrUndefined } from '@core/framework/utility/is-null-empty-or-undefined'
import {
    IValidationMethodStrategy,
    IValidationStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-strategy.types'

export const ValidatorPatternStrategy = function (this: IValidationMethodStrategy) {
    this.validate = function (data: IValidationStrategyData) {
        if (!data?.validationOptions?.pattern?.pattern) {
            return newValidationResult(true, data.fieldName, ValidationErrorsCodes.custom)
        }
        const hasValue = !isNullEmptyOrUndefined(data?.value as string | null | undefined)

        const regexp = new RegExp(data.validationOptions.pattern.pattern)
        const valueToBeTested = data?.toString()
        if (hasValue && !regexp.test(valueToBeTested)) {
            return newValidationResult(
                false,
                data.fieldName,
                ValidationErrorsCodes.custom,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.custom,
                    data.validationOptions.pattern.error ?? undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.custom,
                    data.validationOptions.pattern?.guide ?? undefined
                ),
                data
            )
        }

        return newValidationResult(true, data.fieldName, ValidationErrorsCodes.custom)
    }
} as any as IValidationMethodStrategy
