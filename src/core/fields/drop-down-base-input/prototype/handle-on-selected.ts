import { onSelectHandle } from '@core/fields/field-base-input/events/on-select-handle'
import { IEvents } from '../../../events/events.types'
import { IFieldInput } from '../../field-base-input/field-input-base-types'
import { IDropDownInput } from '../drop-down-base-input.types'

/**
 * Handles the event when a value is selected.
 *
 * @this IFieldInput - The context in which this function is executed.
 * @param data - Optional parameter representing the selected data.
 * Logs the selected value, the provided data, and the current value of the field input.
 */
export const handleOnSelected = function <T extends IEvents>(this: IDropDownInput, data?: T) {
    onSelectHandle(this.field())
}
