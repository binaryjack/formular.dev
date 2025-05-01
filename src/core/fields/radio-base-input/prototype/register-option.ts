import { newEvent } from '../../../events/events.types'
import { IDropDownInput } from '../drop-down-base-input.types'

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
export const registerOption = function (this: IDropDownInput): Partial<HTMLInputElement> {
    const onclick = (e: Event) => {
        const inputElement = e.target as HTMLInputElement
        this.value = inputElement?.value ?? ''

        this._style?.fieldStateStyle.update('dirty', this.originalValue !== this.field.value)

        this.notify(
            'onClick',
            newEvent(this.name, onclick.name, 'onClick', `field.option.${onclick.name}`)
        )
        e?.stopPropagation?.()
    }

    const onblur = (e: Event) => {
        this.isFocus = false
        this._style?.fieldStateStyle.update('focus', this.isFocus)

        e.stopPropagation()
        e.preventDefault()

        this?.notify('onBlur', newEvent(this.name, onblur.name, 'onBlur', `field.${onblur.name}`))
    }

    const onfocus = (e: Event) => {
        this.isFocus = true
        this._style?.fieldStateStyle.update('focus', this.field.isFocus)

        e.stopPropagation()
        e.preventDefault()

        this?.notify(
            'onFocus',
            newEvent(this.name, onfocus.name, 'onFocus', `field.${onfocus.name}`)
        )
    }

    /** ARIA BASICS */
    this.field.dmAriaSet(this.field.id.toString(), this.name)

    return {
        id: `${this.id}`,
        type: this.type,
        className: this._style?.classNames() ?? '',
        title: this.label ?? '',
        ariaDescription: `${this.name}`,
        ariaLabel: this.label ?? '',
        ariaValueText: this.getAsString(),
        onclick,
        onblur,
        onfocus
    }
}
