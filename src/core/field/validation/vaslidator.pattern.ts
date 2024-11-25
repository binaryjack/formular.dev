import { INDate } from '../../../dependency/dateModels'
import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { IValidationResult, newValidationResult } from './coreValidationFunctions'
import { IValidationOptions, ValidationErrorsCodes } from './validation'

const validatorPattern = (
    validationOptions: IValidationOptions,
    value: string | number | boolean | INDate | undefined,
    fieldName: string,
    configurationOptionMessage: string
): IValidationResult => {
    const hasValue = !!value

    if (!hasValue || !validationOptions.pattern) {
        return newValidationResult(true, fieldName)
    }

    const regexp = new RegExp(validationOptions.pattern.pattern)
    const valueToBeTested = value?.toString() ?? ''
    if (!regexp.test(valueToBeTested)) {
        return newValidationResult(
            false,
            fieldName,
            newFieldError(
                fieldName,
                ValidationErrorsCodes.custom,
                validationOptions.pattern.error ? validationOptions.pattern.error : undefined
            ),
            newFieldGuide(
                fieldName,
                ValidationErrorsCodes.custom,
                validationOptions.pattern?.guide ? validationOptions.pattern?.guide : undefined
            )
        )
    }

    return newValidationResult(true, fieldName)
}

export default validatorPattern
