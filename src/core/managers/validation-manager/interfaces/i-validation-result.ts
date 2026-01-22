import { EventsType } from '@core/framework/events/events.types'

/**
 * Represents the result of a validation operation on a field.
 *
 * Contains all information about whether validation passed or failed,
 * along with error messages and contextual information.
 */
export interface IValidationResult {
    /** Whether the validation passed (true) or failed (false) */
    state: boolean

    /** Error/validation code identifier */
    code: string

    /** Name of the field that was validated */
    fieldName: string

    /** Events that triggered this validation */
    triggerEventTypes: EventsType[]

    /** Human-readable error message (if validation failed) */
    error?: string

    /** Help/guidance message for the user */
    guide?: string
}
