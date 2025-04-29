import { IOptionItem } from '../../../../dependency/schema/options-schema/options.scheme.types'
import { newEvent } from '../../events/events.types'
import { IOptionBaseInput } from '../option-based-input'

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
export const onSelectItem = function (this: IOptionBaseInput, option: IOptionItem) {
    if (!this.field.dmExists(this.field.id.toString())) {
        return
    }
    const internlOption = this.getOptionByValue(option.value)
    if (!internlOption) return
    this.selectedOptionId = internlOption.sequenceId
    this.field.value = internlOption.id

    this.field.dmSetSelected(this.field.id.toString(), option.text)
    this.field.dmSetFocus(this.field.id.toString())
    if (this.field._drawer?.openState) this.field._drawer.openState = 'closed'

    this.field._notifier?.notify(
        'onSelect',
        newEvent(this.name, onSelectItem.name, 'onSelect', 'field.selected')
    )
}
