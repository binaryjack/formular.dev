import { newEvent } from '@core/framework/events/new-event'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

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
export const onSelectItem = function (this: IExtendedInput, option: IOptionItem) {
    if (!this.input.domManager?.dmExists(this.input.id.toString())) {
        return
    }
    this.input.valueManager.setValue(this, option.value)
    if (this.input?.drawer) this.input.drawer!.openState = 'closed'

    this.input.notificationManager?.notify(
        'onValueChange',
        newEvent(
            this.input.name,
            onSelectItem.name,
            'onValueChange',
            'field.selected',
            this.input.name,
            this as unknown as IExtendedInput
        )
    )
}
