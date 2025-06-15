/**
 * Interface for forms that support validation operations.
 *
 * Provides the contract for forms to implement validation capabilities
 * across all their fields.
 */
export interface IValidableForm {
    /** Validates all fields in the form */
    validateAll: () => void
}
