import { newEvent } from '../../events/events.types'
import { IFieldInput } from '../../field-base-input/field-input-base-types'
import { IOptionBaseInput } from '../option-based-input'

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
export const register = function <FieldValuesTypes>(this: IOptionBaseInput) {
    const onChange = (e: Event) => {
        const inputElement = e.target as HTMLInputElement

        this.field.value = inputElement.value

        this.field.isPristine = this.field.originalValue === this.field.value
        this.field._style?.fieldStateStyle.update('pristine', this.field.isPristine)
        this.field.isDirty = this.field.originalValue !== this.field.value
        this.field._style?.fieldStateStyle.update('dirty', this.field.isDirty)

        this.field._notifier?.notify(
            'onChange',
            newEvent(this.name, onChange.name, 'onChange', `field.${onChange.name}`)
        )

        e.stopPropagation()
    }

    const onBlur = (e: Event) => {
        this.field.isFocus = false
        this.field._style?.fieldStateStyle.update('focus', this.field.isFocus)

        e.stopPropagation()
        e.preventDefault()

        this.field._notifier?.notify(
            'onBlur',
            newEvent(this.name, onBlur.name, 'onBlur', `field.${onBlur.name}`)
        )
    }

    const onFocus = (e: Event) => {
        this.field.isFocus = true
        this.field._style?.fieldStateStyle.update('focus', this.field.isFocus)

        e.stopPropagation()
        e.preventDefault()

        this.field._notifier?.notify(
            'onFocus',
            newEvent(this.name, onFocus.name, 'onFocus', `field.${onFocus.name}`)
        )
    }

    /** ARIA BASICS */
    this.field.dmAriaSet(this.field.id.toString(), this.name)

    return {
        id: `${this.field.id}`,
        type: this.field.type,
        className: this.field._style?.classNames(),
        label: this.field.label,
        onChange,
        onBlur,
        onFocus
    }
}
