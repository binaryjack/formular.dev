import { IEvents, newEvent } from '../../events/events.types'
import { IFieldInput } from '../field-input.types'

/**
 * Handles the change event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional parameter representing the new data or value associated with the change event.
 *
 * Logs the updated value and the provided data to the console.
 */
export const handleOnChanged = function <T extends IEvents>(this: IFieldInput, data?: T) {
    if (!this.validationTriggerModeType.includes('onChange')) return

    this.debounceNotify(
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
