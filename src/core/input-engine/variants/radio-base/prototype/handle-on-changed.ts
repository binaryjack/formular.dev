import { IEvents } from '@core/framework/events/events.types'
import { onChangedHandle } from '@core/input-engine/core/input-base/events/on-changed-handle'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IRadioBaseInput } from '../radio-base-input.types'

/**
 * Handles the change event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional parameter representing the new data or value associated with the change event.
 *
 * Logs the updated value and the provided data to the console.
 */
export const handleOnChanged = function <T extends IEvents>(this: IRadioBaseInput, data?: T) {
    onChangedHandle(this as unknown as IExtendedInput)
}
