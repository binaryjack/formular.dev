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
export const handleOnClick = function <T extends IEvents>(this: IDropDownInput, data?: T) {
    if (!this?.validationTriggerModeType.includes('onClick')) return
    this.internalInfo(
        'IFieldInput.handleOnSelected',
        `value clicked: ${this.type}, value: ${this.toString()} `
    )

    this?.debounceNotify(
        'onValidate',
        500,
        newEvent(this.name, handleOnClick.name, 'onValidate', `field.state.${handleOnClick.name}`)
    )
}
