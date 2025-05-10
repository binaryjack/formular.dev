import { EventsType } from '@core/framework/events/events.types'
import { IValidationManager } from '../validation-manager.types'

/**
 * Sets the validation trigger mode for the field input.
 *
 * @param this - The current instance of the field input implementing `IFieldInput`.
 * @param mode - An array of `ValidationTriggerModeType` values that define the validation trigger modes.
 */
export const setValidationTriggerMode = function (this: IValidationManager, mode: EventsType[]) {
    this.validationTriggerModeType = mode
}
