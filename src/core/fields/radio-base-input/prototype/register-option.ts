import { AriaHelper } from '@core/fields/field-base-input/accessibility/arias'
import { newEvent } from '../../../events/events.types'
import { IRadioInput } from '../radio-base-input.types'

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
export const registerOption = function (this: IRadioInput): Partial<HTMLInputElement> {
    const onclick = (e: Event) => {
        const inputElement = e.target as HTMLInputElement
        this.field().value = inputElement?.value ?? ''

        this.field()
            .style()
            ?.fieldStateStyle.update('dirty', this.field().originalValue !== this.field().value)

        this.field()
            .notifier()
            ?.notify(
                'onClick',
                newEvent(this.name, onclick.name, 'onClick', `field.option.${onclick.name}`)
            )
        e?.stopPropagation?.()
    }

    const onblur = (e: Event) => {
        this.field().isFocus = false
        this.field().style()?.fieldStateStyle.update('focus', this.field().isFocus)

        e.stopPropagation()
        e.preventDefault()

        this?.field()
            .notifier()
            ?.notify('onBlur', newEvent(this.name, onblur.name, 'onBlur', `field.${onblur.name}`))
    }

    const onfocus = (e: Event) => {
        this.field().isFocus = true
        this.field().style()?.fieldStateStyle.update('focus', this.field().isFocus)

        e.stopPropagation()
        e.preventDefault()

        this.field()
            ?.notifier()
            ?.notify(
                'onFocus',
                newEvent(this.name, onfocus.name, 'onFocus', `field.${onfocus.name}`)
            )
    }
    const ah = new AriaHelper()
    ah.add('')
    /** ARIA BASICS */
    this.field()?.dom()?.dmAriaSet(this.field()?.id.toString(), this.name)

    return {
        id: `${this.field()?.id}`,
        type: this.field()?.type,
        className: this.field()?.style()?.classNames() ?? '',
        title: this.field()?.label ?? '',
        ariaDescription: `${this.field()?.name}`,
        ariaLabel: this.field()?.label ?? '',
        ariaValueText: this.field()?.getAsString(),
        onclick,
        onblur,
        onfocus
    }
}
