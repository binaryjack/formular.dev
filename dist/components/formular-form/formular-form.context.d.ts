import { IFormular, IFormularFlags } from '../../core/formular-engine/formular-base/formular-base.types';
import { IExtendedInput } from '../../core/input-engine/core/input-base/input-base.types';
import { default as React } from 'react';
export interface IFormularContext<T extends object> {
    getFields: () => IExtendedInput[];
    getFormFlags: () => IFormularFlags;
    message: string[];
    formInstance: IFormular<T> | undefined;
    getField: (fieldName: string) => IExtendedInput | undefined;
}
export declare const formularCotextDefault: {
    getFields: () => never[];
    getFormFlags: () => IFormularFlags;
    getField: () => undefined;
    message: never[];
    formInstance: undefined;
};
export declare const formularContext: React.Context<IFormularContext<any>>;
export declare const useFormularContext: <T extends object>() => IFormularContext<T>;
export default useFormularContext;
