import { newEvent } from '../../../events/events.types'
import { ICheckBoxInput } from '../check-box-base-input.types'

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
export const register = function <FieldValuesTypes>(
    this: ICheckBoxInput
): Partial<HTMLInputElement> {
    const onchange = (e: Event) => {
        const inputElement = e.target as HTMLInputElement

        this._field.value = inputElement.value
        this._field.isPristine = this._field.originalValue === this._field.value
        this._field._style?.fieldStateStyle.update('pristine', this._field.isPristine)
        this._field.isDirty = this._field.originalValue !== this._field.value
        this._field._style?.fieldStateStyle.update('dirty', this._field.isDirty)

        this._field._notifier?.notify(
            'onChange',
            newEvent(this._field.name, onchange.name, 'onChange', `field.${onchange.name}`)
        )

        e.stopPropagation()
    }

    const onblur = (e: Event) => {
        this._field.isFocus = false
        this._field._style?.fieldStateStyle.update('focus', this._field.isFocus)

        e.stopPropagation()
        e.preventDefault()

        this._field._notifier?.notify(
            'onBlur',
            newEvent(this._field.name, onblur.name, 'onBlur', `field.${onblur.name}`)
        )
    }

    const onfocus = (e: Event) => {
        this._field.isFocus = true
        this._field._style?.fieldStateStyle.update('focus', this._field.isFocus)

        e.stopPropagation()
        e.preventDefault()

        this._field._notifier?.notify(
            'onFocus',
            newEvent(this._field.name, onfocus.name, 'onFocus', `field.${onfocus.name}`)
        )
    }

    /** ARIA BASICS */
    this._field._dom?.dmAriaSet(this._field.id.toString(), this.name)

    return {
        id: `${this._field.id}`,
        type: this._field.type,
        className: this._field._style?.classNames() ?? '',
        title: this._field.label ?? '',
        ariaDescription: `${this._field.name}`,
        ariaLabel: this._field.label ?? '',
        ariaValueText: this._field._value?.getAsString(),
        onchange,
        onblur,
        onfocus
    }
}
