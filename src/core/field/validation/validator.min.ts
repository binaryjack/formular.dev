import { INDate } from '../../../dependency/dateModels'
import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { IValidationResult, newValidationResult } from './coreValidationFunctions'
import { IValidationOptions, ValidationErrorsCodes } from './validation'

const validatorMin = (
    validationOptions: IValidationOptions,
    value: string | number | boolean | INDate | undefined,
    fieldName: string,
    configurationOptionMessage: string
): IValidationResult => {
    const hasValue = !!value

    if (!hasValue || !validationOptions.min) {
        return newValidationResult(true, fieldName)
    }

    if (isNaN(Number(value)) || Number(value) < validationOptions.min.min) {
        return newValidationResult(
            false,
            fieldName,
            newFieldError(
                fieldName,
                ValidationErrorsCodes.min,
                validationOptions.min.error ? validationOptions.min.error : undefined
            ),
            newFieldGuide(
                fieldName,
                ValidationErrorsCodes.min,
                validationOptions.min?.guide ? validationOptions.min?.guide : undefined
            )
        )
    }

    return newValidationResult(true, fieldName)
}

export default validatorMin
