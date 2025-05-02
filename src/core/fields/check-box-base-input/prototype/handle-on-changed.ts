import { IEvents, newEvent } from '../../../events/events.types'
import { ICheckBoxInput } from '../check-box-base-input.types'

/**
 * Handles the change event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional parameter representing the new data or value associated with the change event.
 *
 * Logs the updated value and the provided data to the console.
 */
export const handleOnChanged = function <T extends IEvents>(this: ICheckBoxInput, data?: T) {
    if (!this._field._validation?.validationTriggerModeType.includes('onChange')) return

    this._field._notifier?.debounceNotify(
        'onValidate',
        500,
        newEvent(
            this.name,
            handleOnChanged.name,
            'onValidate',
            `field.state.${handleOnChanged.name}`
        )
    )
}
