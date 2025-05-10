import { IEvents } from '@core/framework/events/events.types'
import { onClearHandle } from '../events/on-clear-handle'
import { IFieldInput } from '../field-input-base-types'

/**
 * Handles the blur event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional additional data associated with the blur event.
 * Logs the blur event, the provided data, and the current value of the field input.
 */
export const handleOnClear = function <T extends IEvents>(this: IFieldInput, data?: T) {
    onClearHandle(this)
}
