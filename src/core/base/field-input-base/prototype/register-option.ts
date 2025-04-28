import { newEvent } from '../../events/events.types'
import { IFieldInput } from '../field-input.types'

/**
 * Registers event handlers for a field's children options input components
 *
 * This function provides event handlers for `onClick`, `onBlur`, and `onFocus` events
 * to manage the state and behavior of a field input. It updates the UI, triggers observers,
 * and notifies listeners about specific events.
 *
 * @this IFieldInput - The field input instance on which the event handlers operate.
 *
 * @returns An object containing the following event handlers:
 *
 * - `onClick`: Handles click events on the input element. Updates the value, triggers
 *   observers, and notifies listeners about the "clicked" event.
 *
 * - `onBlur`: Handles blur events on the input element. Updates the focus state,
 *   triggers observers, and notifies listeners about the "blurred" event.
 *
 * - `onFocus`: Handles focus events on the input element. Updates the focus state,
 *   triggers observers, and notifies listeners about the "focused" event.
 */
export const registerOption = function (this: IFieldInput) {
    const onClick = (e: Event) => {
        const inputElement = e.target as HTMLInputElement
        this.value = inputElement?.value ?? ''

        this.fieldStateStyle.update('dirty', this.originalValue !== this.value)

        this.notify(
            'onClick',
            newEvent(this.name, onClick.name, 'onClick', `field.option.${onClick.name}`)
        )
        e?.stopPropagation?.()
    }

    const onBlur = (e: Event) => {
        this.isFocus = false
        this.fieldStateStyle.update('focus', this.isFocus)

        e.stopPropagation()
        e.preventDefault()

        this.notify(
            'onBlur',
            newEvent(this.name, onBlur.name, 'onBlur', `field.option.${onBlur.name}`)
        )
    }

    const onFocus = (e: Event) => {
        this.isFocus = true
        this.fieldStateStyle.update('focus', this.isFocus)

        e.stopPropagation()
        e.preventDefault()

        this.notify(
            'onFocus',
            newEvent(this.name, onFocus.name, 'onFocus', `field.option.${onFocus.name}`)
        )
    }

    return {
        onClick,
        onBlur,
        onFocus
    }
}
