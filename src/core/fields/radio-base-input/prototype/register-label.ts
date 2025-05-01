import { newEvent } from '../../../events/events.types'
import { IRadioInput } from '../radio-base-input.types'

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

/** NEED TO BE MOVED TO RADIO KIND CONTROL */
export const registerLabel = function (
    this: IRadioInput,
    optionId: string
): Partial<HTMLInputElement> {
    const onclick = (e: Event) => {
        const option = this.getOptionById(optionId)
        if (option) {
            this.value = option.id
            this.selectedOptionId = option.sequenceId
        }
        this.dmSetChecked(optionId, true)
        this._style?.fieldStateStyle.update('dirty', this.originalValue !== this.value)

        this.notify(
            'onClick',
            newEvent(this.name, onclick.name, 'onClick', `field.option.label.${onclick.name}`)
        )
        e?.stopPropagation?.()
    }

    return {
        onclick
    }
}
