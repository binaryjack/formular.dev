import { IEvents } from '@core/framework/events/events.types'

import { onKeyPressHandle } from '../events/on-key-press-handler'
import { IExtendedInput, IInput } from '../input-base.types'

/**
 * Handles the focus event for a field input.
 *
 * @this IInput - The context of the field input instance.
 * @param data - Optional data associated with the focus event.
 * Logs the focus event details, including the optional data and the current value of the field input.
 */
export const handleOnKeyPress = function <T extends IEvents>(this: IExtendedInput, data?: T) {
    onKeyPressHandle(data?.fieldRef as IExtendedInput)
}
