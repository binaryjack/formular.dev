import { IEvents } from '@core/framework/events/events.types'
import { onSelectHandle } from '@core/input-engine/core/input-base/events/on-select-handle'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { ISelectBaseInput } from '../select-base-input.types'

/**
 * Handles the event when a value is selected.
 *
 * @this IFieldInput - The context in which this function is executed.
 * @param data - Optional parameter representing the selected data.
 * Logs the selected value, the provided data, and the current value of the field input.
 */
export const handleOnSelected = function <T extends IEvents>(this: ISelectBaseInput, data?: T) {
    onSelectHandle(this as unknown as IExtendedInput)
}
