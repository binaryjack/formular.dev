import { IExtendedInput } from '../../../input-engine/core/input-base/input-base.types';
import { IValueManager } from '../value-manager.types';
/**
 * Converts the current field input value to a string representation.
 *
 * @this IFieldInput - The context object that this function is bound to.
 * @returns {string | null} The value of the field input as a string, or `null` if the value is not a string.
 */
export declare const getAsString: (this: IValueManager, field: IExtendedInput) => string | null;
