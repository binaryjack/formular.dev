import { IFieldError } from '@core/framework/models/errors/i-field-error'
import { IFieldGuide } from '@core/framework/models/errors/i-field-guide'

/**
 * Base interface for all validation rules.
 *
 * Provides common properties that all validation constraints share,
 * including error and guide message configuration.
 */
export interface IValidationBase {
    /** Optional type identifier for the validation rule */
    type?: string

    /** Error information if validation fails */
    error?: IFieldError

    /** Guidance/help information for the user */
    guide?: IFieldGuide
}
