import { IEvents } from '@core/framework/events/events.types'

import { onBlurHandle } from '../events/on-blur-handle'
import { IExtendedInput, IInput } from '../input-base.types'

/**
 * Handles the blur event for a field input.
 *
 * @this IInput - The context of the field input instance.
 * @param data - Optional additional data associated with the blur event.
 * Logs the blur event, the provided data, and the current value of the field input.
 */
export const handleOnBlur = function <T extends IEvents>(this: IExtendedInput, data?: T) {
    onBlurHandle(data?.fieldRef as IExtendedInput)
}
