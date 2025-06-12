import { IExtendedInput } from '../../../input-engine/core/input-base/input-base.types';
import { IFormular } from '../formular-base.types';
/**
 * Adds fields to the Formy instance.
 * @param flds - Fields to be added.
 */
export declare function addFields<T extends object>(this: IFormular<T>, ...flds: IExtendedInput[]): void;
