import { IEvents, newEvent } from '../../events/events.types'
import { IFieldInput } from '../../field-base-input/field-input-base-types'
import { IOptionBaseInput } from '../option-based-input.types'

/**
 * Handles the event when a value is selected.
 *
 * @this IFieldInput - The context in which this function is executed.
 * @param data - Optional parameter representing the selected data.
 * Logs the selected value, the provided data, and the current value of the field input.
 */
export const handleOnSelected = function <T extends IEvents>(this: IOptionBaseInput, data?: T) {
    if (!this.field._validator?.validationTriggerModeType.includes('onSelect')) return
    this.field.internalInfo(
        'IFieldInput.handleOnSelected',
        `value clicked: ${this.field.type}, value: ${this.toString()} `
    )

    this.field._notifier?.debounceNotify(
        'onValidate',
        500,
        newEvent(
            this.name,
            handleOnSelected.name,
            'onValidate',
            `field.state.${handleOnSelected.name}`
        )
    )
}
