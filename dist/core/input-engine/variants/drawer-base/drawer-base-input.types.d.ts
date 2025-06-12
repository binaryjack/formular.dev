import { ToggleableStateType } from '../../../framework/common/common.toggleable';
import { IExtendedInputBase } from '../../core/input-base/input-base.types';
export declare const SDrawerBaseInput: unique symbol;
export interface IDrawerBaseInputProperties {
    openState: ToggleableStateType;
}
export interface IDrawerBaseInput extends IDrawerBaseInputProperties, IExtendedInputBase {
    new (): IDrawerBaseInput;
    setOpenState: (state: ToggleableStateType) => void;
}
