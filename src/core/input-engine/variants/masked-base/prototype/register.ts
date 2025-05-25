/**
 * The register function is used to register the event handlers for the field input.
 */

import { conventions } from '@components/context/conventions/conventions'
import {
    DomRegisterBuilder,
    ICustomHandler
} from '@core/input-engine/core/abstract/dom-registers-builder'
import { aria } from '@core/input-engine/core/accessibility/arias'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IMaskedBaseInput } from '../masked-base-input.types'
import { onChange } from './on-change'
import { onKeyPress } from './on-key-press'

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
    this: IExtendedInput,
    ...customHandlers: ICustomHandler[]
): Partial<HTMLInputElement> {
    const lableId = `${this.input.id}${conventions.suffix.labelId}`
    const describedbyId = `${this.input.id}${conventions.suffix.describedById}`

    const arias = [
        aria('labelledby', lableId),
        aria('describedby', describedbyId),
        aria('name', this.input.name),
        aria('label', this.input.name),
        aria('required', this.input.validationOptions?.requiredData?.required ? 'true' : 'false'),
        aria('invalid', this.input.isValid ? 'false' : 'true'),
        aria('disabled', this.input.enabled ? 'false' : 'true'),
        aria('readonly', 'false'),
        aria('autocomplete', 'none'),
        aria('haspopup', 'false'),
        aria('expanded', 'false'),
        aria('activedescendant', 'false')
    ]

    return new DomRegisterBuilder(this)
        .registerChange(onChange.bind(this as unknown as IMaskedBaseInput))
        .registerKeyPress(onKeyPress.bind(this as unknown as IMaskedBaseInput))
        .registerEvents(...customHandlers)
        .registerBlur()
        .registerFocus()
        .registerAria(...arias)
        .build()
}
