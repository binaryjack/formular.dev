import { IEvents, newEvent } from '../../../events/events.types'
import { IFieldInput } from '../field-input-base-types'

/**
 * Handles the focus event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional data associated with the focus event.
 * Logs the focus event details, including the optional data and the current value of the field input.
 */
export const handleOnFocus = function <T extends IEvents>(this: IFieldInput, data?: T) {
    if (!this?.validationTriggerModeType.includes('onFocus')) return
    this.internalInfo(
        'IFieldInput.handleOnFocus',
        `value clicked: ${this.type}, data: ${JSON.stringify(data)} `
    )
    const validationOrigin = data as IEvents
    this?.debounceNotify(
        'onValidate',
        500,
        newEvent(this.name, handleOnFocus.name, 'onValidate', `field.state.${handleOnFocus.name}`)
    )
}
