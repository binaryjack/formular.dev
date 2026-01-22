import { IValidationResult } from './i-validation-result'

/**
 * Aggregated results from validating multiple fields or an entire form.
 */
export interface IValidationResults {
    /** Whether all validations passed */
    isValid: boolean

    /** Individual validation results for each field */
    results?: IValidationResult[]

    /** ID of the form these results belong to */
    formId?: string
}
