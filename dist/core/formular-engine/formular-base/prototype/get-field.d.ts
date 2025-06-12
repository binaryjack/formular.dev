import { IExtendedInput } from '../../../input-engine/core/input-base/input-base.types';
import { IFormular } from '../formular-base.types';
/**
 * Retrieves a field by its name from the Formy instance.
 * @param fieldName - The name of the field to retrieve.
 * @returns The field if found, otherwise undefined.
 */
export declare function getField<T extends object>(this: IFormular<T>, fieldName: string): IExtendedInput | undefined;
