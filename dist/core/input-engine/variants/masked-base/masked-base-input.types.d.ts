import { ICustomHandler } from '../../core/abstract/dom-registers-builder';
import { IExtendedInputBase } from '../../core/input-base/input-base.types';
export declare const SMaskedBaseInput: unique symbol;
export interface IMaskedBaseInput extends IExtendedInputBase {
    new (mask: string): IMaskedBaseInput;
    readonly mask: string;
    maskInitialized: boolean;
    ref: (ref: HTMLInputElement | null) => void;
    register: (...customHandlers: ICustomHandler[]) => any;
    onChange: (e: Event) => void;
    setMask: (mask: string) => void;
    onKeyPress: (e: KeyboardEvent) => void;
    onKeyUp: (e: KeyboardEvent) => void;
    initialize: () => void;
}
