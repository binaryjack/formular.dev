import { InputDataTypes } from '../../../framework/common/common.input.data.types';
import { IFormular } from '../formular-base.types';
/**
 * Retrieves the data from the Formy instance.
 * @returns A record containing field values.
 */
export declare function getData<T extends object>(this: IFormular<T>): Record<string, InputDataTypes>;
