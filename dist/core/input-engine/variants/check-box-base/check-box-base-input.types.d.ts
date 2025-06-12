import { IExtendedInputBase } from '../../core/input-base/input-base.types';
import { IClickBaseInput } from '../click-base/click-base-input.types';
export declare const SCheckBoxBaseInput: unique symbol;
export interface ICheckBoxBaseInputProperties {
    clickBase: IClickBaseInput;
    checked?: boolean;
}
export interface ICheckBoxBaseInput extends ICheckBoxBaseInputProperties, IExtendedInputBase {
    new (): ICheckBoxBaseInput;
}
