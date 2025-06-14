import { IEvents } from '@core/framework/events/events.types'
import { onClearHandle } from '@core/input-engine/core/input-base/events/on-clear-handle'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { ISelectBaseInput } from '../select-base-input.types'

/**
 * Handles the change event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional parameter representing the new data or value associated with the change event.
 *
 * Logs the updated value and the provided data to the console.
 */
export const handleOnClear = function <T extends IEvents>(this: ISelectBaseInput, data?: T) {
    onClearHandle(this as unknown as IExtendedInput)
}
