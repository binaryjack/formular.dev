import { INDate } from '../../../dependency/dateModels'
import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { IValidationResult, newValidationResult } from './coreValidationFunctions'
import { IValidationOptions, ValidationErrorsCodes } from './validation'

const validatorMinLength = (
    validationOptions: IValidationOptions,
    value: string | number | boolean | INDate | undefined,
    fieldName: string
): IValidationResult => {
    const hasValue = !!value

    if (!hasValue || !validationOptions.minLength) {
        return newValidationResult(true, fieldName)
    }

    if ((value?.toString() ?? '')?.length < validationOptions?.minLength.minLength) {
        return newValidationResult(
            false,
            fieldName,
            newFieldError(
                fieldName,
                ValidationErrorsCodes.minLength,
                validationOptions.minLength.error ? validationOptions.minLength.error : undefined
            ),
            newFieldGuide(
                fieldName,
                ValidationErrorsCodes.minLength,
                validationOptions.minLength?.guide ? validationOptions.minLength?.guide : undefined
            )
        )
    }

    return newValidationResult(true, fieldName)
}
export default validatorMinLength
