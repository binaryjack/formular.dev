import { InputDataTypes } from '../../framework/common/common.input.data.types';
import { ITrackingManager } from '../tracking-manager/tracker-manager.types';
import { IInitializableDependency } from '../initialization-manager/initialization-manager.types';
export declare const SDomManager: unique symbol;
export interface IAria {
    name: string;
    value: string;
}
export type IDomManager<T extends HTMLElement> = IDomManagerBase<T> & ITrackingManager;
export interface IDomManagerBase<T extends HTMLElement> extends IInitializableDependency {
    new (): IDomManager<T>;
    elements: T[];
    tracker: ITrackingManager | null;
    internalHTMLElementRef: HTMLInputElement[] | null;
    ref: (o: HTMLInputElement | null) => void;
    dmSetFocus: (id: string) => void;
    dmRegister: (element: T | null) => void;
    dmRegisterById: (id: string) => void;
    dmGet: (id: string) => T | null;
    dmExists: (id: string) => boolean;
    dmSetValue: (id: string, value: InputDataTypes) => void;
    dmClear: () => void;
    dmSetChecked: (id: string, value: boolean) => void;
    dmSetClass: (id: string, rules: CSSPropertyRule) => void;
    dmSetEnabled: (id: string, enabled: boolean) => void;
    dmSetSelected: (id: string, selectionValue: string | null) => void;
    dmAriaSet: (id: string, name: string) => void;
    dmAddArias: (id: string, arias: IAria[]) => void;
    dmUpdateAria: <T extends HTMLElement>(id: string, aria: IAria) => void;
}
export declare const DomUtils: {
    getElementById: (id: string) => HTMLElement | null;
    focusElement: (element: HTMLElement | null) => void;
    clearElement: (element: HTMLInputElement | null) => void;
};
