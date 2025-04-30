import { IEvents, newEvent } from '../../../events/events.types'
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
    if (!this.field._validator?.validationTriggerModeType.includes('onClick')) return
    this.field.internalInfo(
        'IFieldInput.handleOnClicked',
        `value clicked: ${this.field.type}, value: ${this.toString()} `
    )

    this.field._notifier?.debounceNotify(
        'onValidate',
        500,
        newEvent(
            this.name,
            handleOnClicked.name,
            'onValidate',
            `field.state.${handleOnClicked.name}`
        )
    )
}
