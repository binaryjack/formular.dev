import { IFieldInput } from '../fieldInput.types'

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
    const updateUI = () => {
        this.observers.trigger()
    }
    const onClick = (e: Event) => {
        const inputElement = e.target as HTMLInputElement
        this.value = inputElement?.value ?? ''

        this.fieldStateStyle.update('dirty', this.originalValue !== this.value)

        updateUI()

        this._notify('clicked', this.name, 'onChange')
        e?.stopPropagation?.()
    }

    const onBlur = (e: Event) => {
        this.isFocus = false
        this.fieldStateStyle.update('focus', this.isFocus)

        updateUI()

        e.stopPropagation()
        e.preventDefault()

        this._notify('blurred', this.name, 'onBlur')
    }

    const onFocus = (e: Event) => {
        this.isFocus = true
        this.fieldStateStyle.update('focus', this.isFocus)

        updateUI()

        e.stopPropagation()
        e.preventDefault()

        this._notify('focused', this.name, 'onFocus')
    }

    return {
        onClick,
        onBlur,
        onFocus
    }
}
