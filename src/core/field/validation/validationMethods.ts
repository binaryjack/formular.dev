import { IFieldDescriptor } from '../../../dependency/common'
import { IFormFlags } from '../../form/formBase/formBase.types'
import { IValidationResult, newValidationResult, validationCore } from './coreValidationFunctions'

export interface IDoValidateAll {
    formId: string
}

export interface IValidationResults {
    isValid: boolean
    results?: IValidationResult[]
    formId?: string
}

export const newValidationResults = (
    isValid: boolean,
    results?: IValidationResult[],
    formId?: string
): IValidationResults => {
    return { isValid, results: results ?? [], formId }
}

export const validateAll = (fields: IFieldDescriptor[], flags: IFormFlags): IValidationResults => {
    if (fields?.length === 0) return newValidationResults(false)

    const mainResults: IValidationResults = newValidationResults(false, [])

    fields.forEach((f) => {
        if (!f?.shouldValidate) {
            return
        }

        const validation = validationCore(f)
        let validationResult: IValidationResult = newValidationResult(false, f.name)

        validationResult = validation(undefined, flags.isResetting || flags.isSubmitting)

        mainResults?.results?.push(validationResult)
    })

    mainResults.isValid = mainResults.results?.every((o) => o.state) ?? false

    return mainResults
}
