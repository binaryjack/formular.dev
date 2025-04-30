import { IEvents, newEvent } from '../../../events/events.types'
import { IFieldInput } from '../field-input-base-types'

/**
 * Handles the blur event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional additional data associated with the blur event.
 * Logs the blur event, the provided data, and the current value of the field input.
 */
export const handleOnClear = function <T extends IEvents>(this: IFieldInput, data?: T) {
    if (!this._validator?.validationTriggerModeType.includes('onClear')) return
    this.internalInfo('IFieldInput.handleOnBlur', `value clicked: ${this.type}, data: ${data} `)

    this._notifier?.debounceNotify(
        'onValidate',
        500,
        newEvent(this.name, handleOnClear.name, 'onValidate', `field.state.${handleOnClear.name}`)
    )
}
