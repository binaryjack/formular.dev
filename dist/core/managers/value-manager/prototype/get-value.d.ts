import { IExtendedInput } from '../../../input-engine/core/input-base/input-base.types';
import { IValueManager, OutputPurposeType } from '../value-manager.types';
/**
 * Retrieves the value of a field based on the strategies defined in the ValueStrategy instance.
 * @param field - The field input base instance to retrieve the value from.
 * @returns The value of the field or null if no strategy matches.
 */
export declare function getValue(this: IValueManager, field: IExtendedInput, purpose?: OutputPurposeType): unknown | null;
