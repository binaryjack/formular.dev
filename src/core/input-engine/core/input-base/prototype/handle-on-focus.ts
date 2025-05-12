import { IEvents } from '@core/framework/events/events.types'

import { onFocusHandle } from '../events/on-focus-handle'
import { IInput } from '../input-base.types'

/**
 * Handles the focus event for a field input.
 *
 * @this IInput - The context of the field input instance.
 * @param data - Optional data associated with the focus event.
 * Logs the focus event details, including the optional data and the current value of the field input.
 */
export const handleOnFocus = function <T extends IEvents>(this: IInput, data?: T) {
    onFocusHandle(this)
}
