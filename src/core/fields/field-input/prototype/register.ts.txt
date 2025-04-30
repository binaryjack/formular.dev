import { newEvent } from '../../events/events.types'
import { IFieldInput } from '../field-input.types'

/**
 * The register function is used to register the event handlers for the field input.
 */
/**
 * Registers event handlers and ARIA attributes for a field input component.
 * This function is intended to be used as part of the `IFieldInput` interface implementation.
 *
 * @template FieldValuesTypes - The type of the field values.
 * @this IFieldInput - The context of the field input instance.
 *
 * @returns An object containing the field's attributes and event handlers:
 * - `id`: The unique identifier for the field.
 * - `type`: The type of the input field (e.g., "text", "checkbox", "radio").
 * - `className`: The computed class names for the field.
 * - `label`: The label associated with the field.
 * - `onChange`: Event handler for the `change` event.
 * - `onBlur`: Event handler for the `blur` event.
 * - `onFocus`: Event handler for the `focus` event.
 * - `onClick`: Event handler for the `click` event.
 *
 * @remarks
 * - The function updates the UI state and triggers observers when events occur.
 * - It manages field states such as `pristine`, `dirty`, and `focus`.
 * - ARIA attributes (`aria-labelledby` and `name`) are set for accessibility compliance.
 *
 * @example
 * ```typescript
 * const fieldInput = new FieldInput();
 * const registeredField = fieldInput.register();
 *
 * <input
 *   id={registeredField.id}
 *   type={registeredField.type}
 *   className={registeredField.className}
 *   onChange={registeredField.onChange}
 *   onBlur={registeredField.onBlur}
 *   onFocus={registeredField.onFocus}
 *   onClick={registeredField.onClick}
 * />
 *  or simply
 *  <input {...field?.register()}  ref={field?.ref()} ...
 * />
 * ```
 */
export const register = function <FieldValuesTypes>(this: IFieldInput) {
    const onChange = (e: Event) => {
        const inputElement = e.target as HTMLInputElement
        if (this.type === 'checkbox' || this.type === 'radio') {
            return
        } else {
            this.value = inputElement.value
        }
        this.isPristine = this.originalValue === this.value
        this.fieldStateStyle.update('pristine', this.isPristine)
        this.isDirty = this.originalValue !== this.value
        this.fieldStateStyle.update('dirty', this.isDirty)

        this.notify(
            'onChange',
            newEvent(this.name, onChange.name, 'onChange', `field.${onChange.name}`)
        )

        e.stopPropagation()
    }

    const onBlur = (e: Event) => {
        this.isFocus = false
        this.fieldStateStyle.update('focus', this.isFocus)

        e.stopPropagation()
        e.preventDefault()

        this.notify('onBlur', newEvent(this.name, onBlur.name, 'onBlur', `field.${onBlur.name}`))
    }

    const onFocus = (e: Event) => {
        this.isFocus = true
        this.fieldStateStyle.update('focus', this.isFocus)

        e.stopPropagation()
        e.preventDefault()

        this.notify(
            'onFocus',
            newEvent(this.name, onFocus.name, 'onFocus', `field.${onFocus.name}`)
        )
    }

    const onClick = (e: MouseEvent) => {
        const inputElement = e.target as HTMLInputElement
        if (!this.dmExists(this.id.toString())) return

        if (this.type !== 'checkbox' && this.type !== 'radio') return

        this.value = inputElement.checked
        this.checked = this.value as boolean

        e?.stopPropagation?.()

        this.notify(
            'onClick',
            newEvent(this.name, onClick.name, 'onClick', `field.${onClick.name}`)
        )
    }

    /** ARIA BASICS */
    this.dmAriaSet(this.id.toString(), this.name)

    return {
        id: `${this.id}`,
        type: this.type,
        className: this.classNames(),
        label: this.label,
        onChange,
        onBlur,
        onFocus,
        onClick
    }
}
