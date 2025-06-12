import { IAria } from '../../../managers/dom-manager/dom-manager.types';
import { IInput } from '../input-base/input-base.types';
export interface IAriaHelper {
    new (): IAriaHelper;
    arias: IAria[];
    add: (name: string, value: string) => void;
    addMany: (...arias: IAria[]) => void;
    apply: (f: IInput) => void;
}
export declare const aria: (name: string, value: string) => IAria;
export declare const AriaHelper: IAriaHelper;
