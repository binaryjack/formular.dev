import { IOptionItem } from '../../../../dependency/schema/options-schema/options.scheme.types'
import { IFieldInput } from '../field-input.types'

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
export const onSelectItem = function (this: IFieldInput, option: IOptionItem) {
    if (!this.dmExists(this.id.toString())) {
        return
    }
    const internlOption = this.getOptionByValue(option.value)
    if (!internlOption) return
    this.selectedOptionId = internlOption.sequenceId
    this.value = internlOption.id

    this.dmSetSelected(this.id.toString(), option.text)
    this.dmSetFocus(this.id.toString())
    this.openState = 'closed'
    // this.observers.trigger()
    this.notify('changed', {
        fieldName: this.name,
        fieldState: 'onChange'
    })

    this.notify('validate', {
        fieldName: this.name,
        fieldState: 'reset'
    })
}
