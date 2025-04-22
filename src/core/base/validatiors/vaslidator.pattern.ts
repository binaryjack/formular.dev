import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { valueIsNullOrUndefined } from '../fieldInputBase/utils'
import {
    IValidatorStrategy,
    IValidatorStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from './validator.types'

const ValidatorPattern = function (this: IValidatorStrategy) {
    this.validate = function (data: IValidatorStrategyData) {
        const hasValue = !valueIsNullOrUndefined(data?.value)

        if (!hasValue || !data?.validationOptions?.pattern?.pattern) {
            return newValidationResult(true, data.fieldName)
        }

        const regexp = new RegExp(data.validationOptions.pattern.pattern)
        const valueToBeTested = data?.toString()
        if (!regexp.test(valueToBeTested)) {
            return newValidationResult(
                false,
                data.fieldName,
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

        return newValidationResult(true, data.fieldName)
    }
} as any as IValidatorStrategy
const validatorPattern = new ValidatorPattern()
export default validatorPattern
