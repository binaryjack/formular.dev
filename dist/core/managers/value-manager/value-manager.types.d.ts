import { InputDataTypes } from '../../framework/common/common.input.data.types';
import { IExtendedInput, IInput } from '../../input-engine/core/input-base/input-base.types';
import { IInitializableDependency } from '../initialization-manager/initialization-manager.types';
export declare const SValueManager: unique symbol;
export type TGetter<T extends Partial<InputDataTypes> | null> = (field: IExtendedInput) => T;
export type TSetter<T extends Partial<InputDataTypes> | null> = (field: IExtendedInput, value: T) => void;
export type OutputPurposeType = 'validation' | 'display' | 'submission' | 'all';
export type FieldValuePropertyType = 'value' | 'id' | 'selectedOptionId' | 'checked' | 'objectValue';
export interface IParserStrategy<T extends Partial<InputDataTypes> | null> {
    id: string;
    concernedTypes: string[];
    fieldValueProperty: FieldValuePropertyType;
    setter: TSetter<T>;
    getter: TGetter<T>;
}
export declare const setParserStrategy: <T extends Partial<InputDataTypes> | null>(id: string, concernedTypes: string[], fieldValueProperty: FieldValuePropertyType, setter: TSetter<T>, getter: TGetter<T>) => IParserStrategy<T>;
export interface IValueManagerProperties {
    valueStrategies: IParserStrategy<InputDataTypes>[];
}
export interface IValueManager extends IValueManagerProperties, IInitializableDependency {
    new (): IValueManager;
    acceptValueStrategies: (...parsers: IParserStrategy<any>[]) => void;
    addValueStrategies: (...parsers: IParserStrategy<any>[]) => void;
    getAsString: (field: IExtendedInput) => string | null;
    setValue: (field: IExtendedInput, value: Partial<InputDataTypes> | null) => void;
    setValueFromHtmlElement: (field: IExtendedInput, value: HTMLInputElement | null) => void;
    getValue: (field: IExtendedInput, purpose?: OutputPurposeType) => Partial<InputDataTypes> | null;
    clear: (field: IExtendedInput | IInput) => void;
}
