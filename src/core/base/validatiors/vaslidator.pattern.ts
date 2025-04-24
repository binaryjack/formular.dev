import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { isNullEmptyOrUndefined } from '../field-input-base/utils/is-null-empty-or-undefined'

import {
    IValidatorStrategy,
    IValidatorStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from './validator.types'

const ValidatorPattern = function (this: IValidatorStrategy) {
    this.validate = function (data: IValidatorStrategyData) {
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
} as any as IValidatorStrategy
const validatorPattern = new ValidatorPattern()
export default validatorPattern
