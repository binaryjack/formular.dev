import { INDate } from '../../../dependency/dateModels'
import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { IValidationResult, newValidationResult } from './coreValidationFunctions'
import { IValidationOptions, ValidationErrorsCodes } from './validation'

const validatorRequired = (
    validationOptions: IValidationOptions,
    value: string | number | boolean | INDate | undefined,
    expectedValue: string | number | boolean | INDate | undefined,
    fieldName: string
): IValidationResult => {
    const hasExpectedValue = expectedValue !== undefined
    const hasValue = !!value

    if (!validationOptions.required) {
        return newValidationResult(true, fieldName)
    }

    if (!hasValue || (hasValue && hasExpectedValue && expectedValue !== value)) {
        return newValidationResult(
            false,
            fieldName,
            newFieldError(
                fieldName,
                ValidationErrorsCodes.required,
                validationOptions.required?.error ? validationOptions.required?.error : undefined
            ),
            newFieldGuide(
                fieldName,
                ValidationErrorsCodes.required,
                validationOptions.required?.guide ? validationOptions.required?.guide : undefined
            )
        )
    }

    return newValidationResult(true, fieldName)
}

export default validatorRequired
