import { IOptionItem } from '@dependency/schema/options-schema/options.scheme.types'
import { newEvent } from '../../../events/events.types'
import { IDropDownInput } from '../drop-down-base-input.types'

/**
 * Handles the selection of an item in a field input component.
 *
 * @param this - The current instance of the field input implementing `IFieldInput`.
 * @param option - The selected option item containing `id` and `text` properties.
 *
 * @remarks
 * - Updates the `value` of the field input based on the `id` of the selected option.
 * - Updates the internal HTML element's value and focuses it if the reference exists.
 * - Closes the dropdown by setting the `openState` to `'closed'`.
 * - Notifies observers of the `changed` event with the field name and state.
 * - Notifies observers of the `validate` event to reset validation state.
 */
export const onSelectItem = function (this: IDropDownInput, option: IOptionItem) {
    if (!this._field._dom?.dmExists(this._field.id.toString())) {
        return
    }
    const internlOption = this.getOptionByValue(option.value)
    if (!internlOption) return
    this.selectedOptionId = internlOption.sequenceId
    this._field.value = internlOption.id

    this._field._dom?.dmSetSelected(this._field.id.toString(), option.text)
    this._field._dom?.dmSetFocus(this._field.id.toString())
    if (this._field?._drawer?.openState) this._field._drawer.openState = 'closed'

    this._field._notifier?.notify(
        'onSelect',
        newEvent(this._field.name, onSelectItem.name, 'onSelect', 'field.selected')
    )
}
