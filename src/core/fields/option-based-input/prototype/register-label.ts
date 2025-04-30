import { newEvent } from '../../../events/events.types'
import { IOptionBaseInput } from '../option-based-input.types'

/**
 * Registers a label click handler for a field input component.
 *
 * @param this - The current instance of the field input implementing `IFieldInput`.
 * @param refHtmlFor - A React ref object pointing to the associated HTML input element.
 * @returns An object containing the `onClick` event handler for the label.
 *
 * The `onClick` handler performs the following actions:
 * - Updates the `value` of the field input with the current value of the associated input element.
 * - Sets the `checked` property of the associated input element to `true`.
 * - Updates the field's state style to "dirty" if the current value differs from the original value.
 * - Notifies observers of a "clicked" event with the field's name and an "onChange" action.
 * - Triggers all registered observers.
 * - Stops the propagation of the click event.
 */
export const registerLabel = function (this: IOptionBaseInput, optionId: string) {
    const onClick = (e: Event) => {
        const option = this.getOptionById(optionId)
        if (option) {
            this.field.value = option.id
            this.selectedOptionId = option.sequenceId
        }
        this.field.dmSetChecked(optionId, true)
        this.field._style?.fieldStateStyle.update(
            'dirty',
            this.field.originalValue !== this.field.value
        )

        // this.observers.trigger()

        this.field?._notifier?.notify(
            'onClick',
            newEvent(this.name, onClick.name, 'onClick', `field.option.label.${onClick.name}`)
        )
        e?.stopPropagation?.()
    }

    return {
        onClick
    }
}
