import { INDate } from '../../../dependency/dateModels'
import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { IValidationResult, newValidationResult } from './coreValidationFunctions'
import { IValidationOptions, ValidationErrorsCodes } from './validation'

const validatorMax = (
    validationOptions: IValidationOptions,
    value: string | number | boolean | INDate | undefined,
    fieldName: string
): IValidationResult => {
    const hasValue = !!value

    if (!hasValue || !validationOptions.max) {
        return newValidationResult(true, fieldName)
    }

    if (isNaN(Number(value)) || Number(value) > validationOptions.max.max) {
        return newValidationResult(
            false,
            fieldName,
            newFieldError(
                fieldName,
                ValidationErrorsCodes.max,
                validationOptions.max.error ? validationOptions.max.error : undefined
            ),
            newFieldGuide(
                fieldName,
                ValidationErrorsCodes.max,
                validationOptions.max?.guide ? validationOptions.max?.guide : undefined
            )
        )
    }

    return newValidationResult(true, fieldName)
}
export default validatorMax
