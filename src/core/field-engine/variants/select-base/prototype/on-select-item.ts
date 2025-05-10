import { IExtendedFieldInput } from '@core/field-engine/core/input-base/field-input-base-types'
import { newEvent } from '@core/framework/events/events.types'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'

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
export const onSelectItem = function (this: IExtendedFieldInput, option: IOptionItem) {
    if (!this.field.domManager?.dmExists(this.field.id.toString())) {
        return
    }
    const internlOption = this.optionBase.getOptionByValue(option.value)
    if (!internlOption) return
    this.selectedOptionId = internlOption.sequenceId
    this.field.value = internlOption.id

    this.field.domManager?.dmSetSelected(this.field.id.toString(), option.text)
    this.field.domManager?.dmSetFocus(this.field.id.toString())
    if (this.field?.drawer) this.field.drawer!.openState = 'closed'

    this.field.notificationManager?.notify(
        'onSelect',
        newEvent(this.field.name, onSelectItem.name, 'onSelect', 'field.selected')
    )
}
