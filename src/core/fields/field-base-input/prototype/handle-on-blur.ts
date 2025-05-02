import { IEvents } from '../../../events/events.types'
import { onBlurHandle } from '../events/on-blur-handle'
import { IFieldInput } from '../field-input-base-types'

/**
 * Handles the blur event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional additional data associated with the blur event.
 * Logs the blur event, the provided data, and the current value of the field input.
 */
export const handleOnBlur = function <T extends IEvents>(this: IFieldInput, data?: T) {
    onBlurHandle(this)
}
