import { onClickHandle } from '@core/field-engine/core/input-base/events/on-click-handle'
import { IEvents } from '@core/framework/events/events.types'
import { IClickBaseInput } from '../click-base-input.types'

/**
 * Handles the click event for a field input.
 *
 * @param this - The context of the field input implementing the `IFieldInput` interface.
 * @param data - Optional data associated with the click event.
 *
 * Logs the clicked value, the provided data, and the current value of the field input.
 */
export const handleOnClicked = function <T extends IEvents>(this: IClickBaseInput, data?: T) {
    onClickHandle(this.field)
}
