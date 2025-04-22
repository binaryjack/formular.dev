import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { valueIsNullOrUndefined } from '../fieldInputBase/utils'
import {
    IValidatorStrategy,
    IValidatorStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from './validator.types'

const ValidatorRequired = function (this: IValidatorStrategy) {
    this.validate = function (data: IValidatorStrategyData) {
        const hasExpectedValue = !!data.expectedValue
        const hasValue = !valueIsNullOrUndefined(data?.value)

        if (!data?.validationOptions?.requiredData?.required) {
            return newValidationResult(true, data.fieldName)
        }

        if (!hasValue || (hasValue && hasExpectedValue && data.expectedValue !== data?.value)) {
            return newValidationResult(
                false,
                data.fieldName,
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

        return newValidationResult(true, data.fieldName)
    }
} as any as IValidatorStrategy
const validatorRequired = new ValidatorRequired()
export default validatorRequired
