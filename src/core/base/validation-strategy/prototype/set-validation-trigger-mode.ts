import { IFieldInput } from '../../abstract-base-input/field-input-base-types'
import { EventsType } from '../../events/events.types'

/**
 * Sets the validation trigger mode for the field input.
 *
 * @param this - The current instance of the field input implementing `IFieldInput`.
 * @param mode - An array of `ValidationTriggerModeType` values that define the validation trigger modes.
 */
export const setValidationTriggerMode = function (this: IFieldInput, mode: EventsType[]) {
    this.validationTriggerModeType = mode
}
