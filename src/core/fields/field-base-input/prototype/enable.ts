import { IFieldInput } from '../field-input-base-types'

/**
 * Toggles the enabled state of the field input and updates the associated HTML element.
 *
 * @param enabled - A boolean indicating whether the field input should be enabled (`true`) or disabled (`false`).
 *
 * @remarks
 * - When `enabled` is set to `false`, the method will blur the associated HTML element if it is focused.
 * - The `disabled` property of the associated HTML element is updated to reflect the enabled state.
 * - If the internal HTML element reference (`internalHTMLElementRef`) is not available, the method exits early.
 *
 * @this IFieldInput - The field input instance on which the method is invoked.
 */
export const enable = function (this: IFieldInput, enabled: boolean) {
    this.enabled = enabled
    this.dom()?.dmSetEnabled(this.id.toString(), enabled)
}
