import { IEvents, newEvent } from '../../../events/events.types'
import { IClickInput } from '../click-base-input.types'

/**
 * Handles the click event for a field input.
 *
 * @param this - The context of the field input implementing the `IFieldInput` interface.
 * @param data - Optional data associated with the click event.
 *
 * Logs the clicked value, the provided data, and the current value of the field input.
 */
export const handleOnClicked = function <T extends IEvents>(this: IClickInput, data?: T) {
    if (!this.validationTriggerModeType.includes('onClick')) return
    this.field.internalInfo(
        'IFieldInput.handleOnClicked',
        `value clicked: ${this.field.type}, value: ${this.toString()} `
    )

    this.debounceNotify(
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
