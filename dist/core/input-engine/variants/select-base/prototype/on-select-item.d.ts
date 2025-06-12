import { IOptionItem } from '../../../../framework/schema/options-schema/options.scheme.types';
import { IExtendedInput } from '../../../core/input-base/input-base.types';
/**
 * Handles the selection of an item in a field input component.
 *
 * @param this - The current instance of the field input implementing `IFieldInput`.
 * @param option - The selected option item containing `id` and `text` properties.
 *
 * @remarks
 * - Updates the `value` of the field input based on the `id` of the selected option.
 * - Updates the internal HTML element's value and focuses it if the reference exists.
 * - Closes the dropdown by setting the `openState` to `'closed'`.
 * - Notifies observers of the `changed` event with the field name and state.
 * - Notifies observers of the `validate` event to reset validation state.
 */
export declare const onSelectItem: (this: IExtendedInput, option: IOptionItem) => void;
