import { newEvent } from '../../../events/events.types'
import { IFieldInput } from '../field-input-base-types'

/**
 * Clears the state and value of the field input, resetting it to its initial state.
 *
 * This method performs the following actions:
 * - Clears the `errors` and `guides` arrays.
 * - Resets the `checked` property of all associated internal HTML input element references.
 * - Notifies listeners about the `validate` and `changed` events with the appropriate field state.
 * - Updates the field's state style to reflect the "clear" action.
 * - Sets the field's value to `null`.
 * - Focuses the field input.
 * - Resets the `value` and `checked` properties of the main internal HTML input element reference, if it exists.
 *
 * @this IFieldInput - The field input instance on which the method is called.
 */
export const clear = function (this: IFieldInput) {
    this.errors = []
    this.guides = []

    this._style?.fieldStateStyle.update('clear', true)
    this.value = null
    if (this._clickable) this._clickable.checked = false
    if (this._optionable) this._optionable.selectedOptionId = null
    this.dmClear()
    this.focus()

    this._notifier?.notify(
        'onClear',
        newEvent(this.name, clear.name, 'onClear', `field.${clear.name}`)
    )
}
