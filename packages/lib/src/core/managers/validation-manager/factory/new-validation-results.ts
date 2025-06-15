import { IValidationResult } from '../interfaces/i-validation-result'
import { IValidationResults } from '../interfaces/i-validation-results'

export const newValidationResults = function (
    isValid: boolean,
    results?: IValidationResult[],
    formId?: string
): IValidationResults {
    return { isValid, results: results ?? [], formId }
}
