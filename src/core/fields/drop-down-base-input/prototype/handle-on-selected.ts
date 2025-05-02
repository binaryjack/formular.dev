import { IEvents, newEvent } from '../../../events/events.types'
import { IFieldInput } from '../../field-base-input/field-input-base-types'
import { IDropDownInput } from '../drop-down-base-input.types'

/**
 * Handles the event when a value is selected.
 *
 * @this IFieldInput - The context in which this function is executed.
 * @param data - Optional parameter representing the selected data.
 * Logs the selected value, the provided data, and the current value of the field input.
 */
export const handleOnSelected = function <T extends IEvents>(this: IDropDownInput, data?: T) {
    if (!this._field._validation?.validationTriggerModeType.includes('onSelect')) return
    this._field._tracker?.internalInfo(
        'IFieldInput.handleOnSelected',
        `value selected: ${this._field.type}, value: ${this._field._value?.toString()} `
    )

    this._field._notifier?.debounceNotify(
        'onValidate',
        500,
        newEvent(
            this._field.name,
            handleOnSelected.name,
            'onValidate',
            `field.state.${handleOnSelected.name}`
        )
    )
}
