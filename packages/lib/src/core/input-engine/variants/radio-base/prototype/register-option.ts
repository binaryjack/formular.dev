import { IOptionItem } from '@core/framework/schema/option-schema/options.scheme.types'
import { DomRegisterBuilder } from '@core/input-engine/core/dom-registers-builder/dom-registers-builder'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

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
export const registerOption = function (
    this: IExtendedInput,
    option: IOptionItem
): Partial<HTMLInputElement> {
    return new DomRegisterBuilder(this)
        .registerBlur()
        .registerFocus()
        .registerClickOption(option.id)
        .registerAria()
        .buildOption(option)
}
