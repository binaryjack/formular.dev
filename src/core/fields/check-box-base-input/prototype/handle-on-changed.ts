import { onChangedHandle } from '@core/fields/field-base-input/events/on-changed-handle'
import { IEvents } from '../../../events/events.types'
import { ICheckBoxBaseInput } from '../check-box-base-input.types'

/**
 * Handles the change event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional parameter representing the new data or value associated with the change event.
 *
 * Logs the updated value and the provided data to the console.
 */
export const handleOnChanged = function <T extends IEvents>(this: ICheckBoxBaseInput, data?: T) {
    onChangedHandle(this.field)
}
