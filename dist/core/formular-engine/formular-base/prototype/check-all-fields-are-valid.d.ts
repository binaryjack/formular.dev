import { IFormular } from '../formular-base.types';
/**
 * Validates all fields in the Formy instance.
 */
export declare function checkAllFieldsAreValid<T extends object>(this: IFormular<T>): Promise<boolean>;
