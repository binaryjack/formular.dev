import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import {
    IValidatorStrategy,
    IValidatorStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from './validator.types'

const ValidatorPattern = function (this: IValidatorStrategy) {
    this.validate = function (data: IValidatorStrategyData) {
        const hasValue = !!data?.value
        if (!hasValue || !data?.validationOptions?.pattern?.pattern) {
            return newValidationResult(true, data.fieldName)
        }

        const regexp = new RegExp(data.validationOptions.pattern.pattern)
        const valueToBeTested = data?.value?.toString() ?? ''
        if (!regexp.test(valueToBeTested)) {
            return newValidationResult(
                false,
                data.fieldName,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.custom,
                    data.validationOptions.pattern.error
                        ? data.validationOptions.pattern.error
                        : undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.custom,
                    data.validationOptions.pattern?.guide
                        ? data.validationOptions.pattern?.guide
                        : undefined
                )
            )
        }

        return newValidationResult(true, data.fieldName)
    }
} as any as IValidatorStrategy
const validatorPattern = new ValidatorPattern()
export default validatorPattern
