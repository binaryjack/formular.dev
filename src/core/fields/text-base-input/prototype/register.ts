import { AriaHelper } from '@core/fields/field-base-input/accessibility/arias'
import { onBlur } from '@core/fields/field-base-input/events/on-blur'
import { onChange } from '@core/fields/field-base-input/events/on-changed'
import { onFocus } from '@core/fields/field-base-input/events/on-focus'
import { ITextInput } from '../text-base-input.types'

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
export const register = function <FieldValuesTypes>(this: ITextInput): Partial<HTMLInputElement> {
    const onchange = (e: Event) => onChange(this.field(), e)
    const onblur = (e: Event) => onBlur(this.field(), e)
    const onfocus = (e: Event) => onFocus(this.field(), e)

    const ah = new AriaHelper()
    ah.applyNameAndLabel(this.field())

    return {
        id: `${this.field().id}`,
        type: this.field().type,
        className: this.field().style()?.classNames() ?? '',
        title: this.field().label ?? '',
        ariaDescription: `${this.field().name}`,
        ariaLabel: this.field().label ?? '',
        ariaValueText: this.field()?.validationStrategy()?.getAsString(),
        onchange,
        onblur,
        onfocus
    }
}
