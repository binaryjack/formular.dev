import { IEvents } from '../../../framework/events/events.types';
import { IExtendedInputBase } from '../../core/input-base/input-base.types';
export declare const SClickBaseInput: unique symbol;
export interface IClickBaseInputProperties {
}
export interface IClickBaseInput extends IClickBaseInputProperties, IExtendedInputBase {
    new (): IClickBaseInput;
    onClickHandle: <T extends IEvents>(data?: T) => void;
}
