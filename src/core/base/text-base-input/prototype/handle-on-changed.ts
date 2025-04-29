import { IEvents, newEvent } from '../../events/events.types'
import { IFieldInput } from '../../field-base-input/field-input-base-types'
import { ITextBaseInput } from '../text-base-input.types'

/**
 * Handles the change event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional parameter representing the new data or value associated with the change event.
 *
 * Logs the updated value and the provided data to the console.
 */
export const handleOnChanged = function <T extends IEvents>(this: ITextBaseInput, data?: T) {
    if (!this.field._validator?.validationTriggerModeType.includes('onChange')) return

    this.field._notifier?.debounceNotify(
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
