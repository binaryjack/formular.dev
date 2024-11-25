import { IFieldDescriptor } from '../../../dependency/common'
import { IFieldError, IFieldGuide, newFieldError } from '../../../dependency/errors'
import validatorMax from './validator.max'
import validatorMaxLength from './validator.max-length'
import validatorMin from './validator.min'
import validatorMinLength from './validator.min-length'
import validatorRequired from './validator.required'
import validatorPattern from './vaslidator.pattern'

const configurationOptionMessage = `[DEV] => [Models] => [FieldProperties] Your configuration is not correct for the type you selected `

export interface IDoValidate {
    formId: string
}

export interface IValidationResult {
    state: boolean
    fieldName: string
    error?: IFieldError
    guide?: IFieldGuide
    formId?: string
}

export const newValidationResult = (
    state: boolean,
    fieldName: string,
    error?: IFieldError,
    guide?: IFieldGuide,
    formId?: string
): IValidationResult => {
    return { state, fieldName, error, guide, formId }
}
/** Return IValidationResult
 * State true = valid
 * State False = invalid
 */
export const validationCore =
    (field: IFieldDescriptor | undefined) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (immediateValue?: any, preventValidation?: boolean): IValidationResult => {
        if (preventValidation) return newValidationResult(false, 'no field name')
        if (!field) return newValidationResult(false, 'no field name')
        if (!field.validationOptions)
            return newValidationResult(
                true,
                field.name,
                newFieldError(field.name, '1', 'no field validation options')
            )

        const validationOptions = field.validationOptions

        const fieldName = field?.name

        const value = immediateValue ?? getFieldValue(field)
        const expectedValue = getExpectedValue(field)

        const required = validatorRequired(validationOptions, value, expectedValue, fieldName)
        const min = validatorMin(validationOptions, value, fieldName, configurationOptionMessage)
        const max = validatorMax(validationOptions, value, fieldName)
        const minLengh = validatorMinLength(validationOptions, value, fieldName)
        const maxLengh = validatorMaxLength(validationOptions, value, fieldName)
        const pattern = validatorPattern(
            validationOptions,
            value,
            fieldName,
            configurationOptionMessage
        )
        const allValidators = [required, min, max, minLengh, maxLengh, pattern]

        const failedValidation = allValidators.find((o) => !o.state)

        return failedValidation ?? newValidationResult(true, fieldName)
    }

const getFieldValue = (field: IFieldDescriptor) => {
    return ''
}
const getExpectedValue = (field: IFieldDescriptor) => {
    return ''
}
