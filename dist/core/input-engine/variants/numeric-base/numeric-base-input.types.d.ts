import { InputDataTypes } from '../../../framework/common/common.input.data.types';
import { IEvents } from '../../../framework/events/events.types';
import { ICustomHandler } from '../../core/abstract/dom-registers-builder';
import { IExtendedInputBase } from '../../core/input-base/input-base.types';
export declare const SNumericBaseInput: unique symbol;
export interface INumericBaseInput extends IExtendedInputBase {
    new (): INumericBaseInput;
    ref: (ref: HTMLInputElement | null) => void;
    register: (...customHandlers: ICustomHandler[]) => any;
    setValue: (value: InputDataTypes) => void;
    getValue: () => InputDataTypes;
    handleOnChanged: <T extends IEvents>(data?: T) => void;
    handleOnClear: <T extends IEvents>(data?: T) => void;
}
