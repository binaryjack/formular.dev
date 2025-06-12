import { InputTypeNames } from '../../common/common.input.types';
import { EventsType } from '../../events/events.types';
import { InputDataTypes } from '../../common/common.input.data.types';
import { IValidationOptions } from '../../../managers/validation-manager/validation-manager.types';
import { IFieldDescriptor } from '../descriptor/field.descriptor';
import { IOptionItem } from '../options-schema/options.scheme.types';
export interface IFieldSchema extends IValidationOptions {
    readonly id: number | null;
    readonly name: string | null;
    readonly type: InputTypeNames;
    target: string | null;
    options: IOptionItem[];
    defaultValue: string | null;
    expectedValue: string | null;
    shouldValidate: boolean;
    triggerKeyWord: EventsType[] | never[];
    mask: string | null;
}
export interface IFieldSchemaBuilder extends IFieldSchema {
    new (): IFieldSchemaBuilder;
    setId: (id: number) => IFieldSchemaBuilder;
    setName: (name: string) => IFieldSchemaBuilder;
    setTypeInput: (type: InputDataTypes) => IFieldSchemaBuilder;
    setMask: (mask: string) => IFieldSchemaBuilder;
    setOptionData: (target: string | null, options?: IOptionItem[]) => IFieldSchemaBuilder;
    setExpectedValue: (expectedValue?: any) => IFieldSchemaBuilder;
    setDefaultValue: (defaultValue?: any) => IFieldSchemaBuilder;
    setValidationData: (shouldValidate: boolean, validationData?: IValidationOptions) => IFieldSchemaBuilder;
    setTriggerKeyWord: (triggerKeyWord: EventsType[]) => IFieldSchemaBuilder;
    build: () => IFieldSchema;
    clone: () => IFieldSchema;
}
export interface IFieldSchemeFactory {
    new (): IFieldSchemeFactory;
    builders: IFieldSchemaBuilder[];
    addBuilders: (...builders: IFieldSchemaBuilder[]) => void;
    create: (name: string, target: string | null, options: IOptionItem[], shouldValidate: boolean, validationOptions?: IValidationOptions) => IFieldSchema | undefined;
}
/**
 * this interface represents an entity
 * name is the name of the entity
 * properties is an array of field schema
 */
export interface IEntityScheme {
    name: string;
    properties: IFieldSchema[];
}
export interface IApplicationScheme {
    name: string;
    entities: IEntityScheme[];
}
export interface IAppSchemeToObjectAction {
    scheme: IFieldDescriptor[];
    obj: any;
}
