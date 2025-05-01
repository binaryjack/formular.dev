import { newEvent } from '../../../events/events.types'
import { IDropDownInput } from '../drop-down-base-input.types'

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
    this: IDropDownInput
): Partial<HTMLInputElement> {
    const onchange = (e: Event) => {
        const inputElement = e.target as HTMLInputElement

        this.value = inputElement.value
        this.isPristine = this.originalValue === this.value
        this._style?.fieldStateStyle.update('pristine', this.isPristine)
        this.isDirty = this.originalValue !== this.value
        this._style?.fieldStateStyle.update('dirty', this.isDirty)

        this?.notify(
            'onChange',
            newEvent(this.name, onchange.name, 'onChange', `field.${onchange.name}`)
        )

        e.stopPropagation()
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
        onchange,
        onblur,
        onfocus
    }
}
