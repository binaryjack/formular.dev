import { onClearHandle } from '@core/field-engine/core/input-base/events/on-clear-handle'
import { IEvents } from '@core/framework/events/events.types'
import { ITextBaseInput } from '../text-base-input.types'

/**
 * Handles the change event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional parameter representing the new data or value associated with the change event.
 *
 * Logs the updated value and the provided data to the console.
 */
export const handleOnClear = function <T extends IEvents>(this: ITextBaseInput, data?: T) {
    onClearHandle(this.field)
}
