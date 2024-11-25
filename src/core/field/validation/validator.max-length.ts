import { INDate } from '../../../dependency/dateModels'
import { newFieldError, newFieldGuide } from '../../../dependency/errors'
import { IValidationResult, newValidationResult } from './coreValidationFunctions'
import { IValidationOptions, ValidationErrorsCodes } from './validation'

const validatorMaxLength = (
    validationOptions: IValidationOptions,
    value: string | number | boolean | INDate | undefined,
    fieldName: string
): IValidationResult => {
    const hasValue = !!value

    if (!hasValue || !validationOptions.maxLength) {
        return newValidationResult(true, fieldName)
    }

    if ((value?.toString() ?? '')?.length > validationOptions?.maxLength.maxLength) {
        return newValidationResult(
            false,
            fieldName,
            newFieldError(
                fieldName,
                ValidationErrorsCodes.maxLength,
                validationOptions.maxLength.error ? validationOptions.maxLength.error : undefined
            ),
            newFieldGuide(
                fieldName,
                ValidationErrorsCodes.maxLength,
                validationOptions.maxLength?.guide ? validationOptions.maxLength?.guide : undefined
            )
        )
    }

    return newValidationResult(true, fieldName)
}

export default validatorMaxLength
