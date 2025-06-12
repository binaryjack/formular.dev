import { InputTypeNames } from '../../framework/common/common.input.types';
import { IServiceManager } from '../../managers/service-manager/service-manager.types';
import { IFieldDescriptor } from '../../framework/schema/descriptor/field.descriptor';
import { InputTypeMap } from './mapping/input-type-map';
export declare const SInputFactory: unique symbol;
export interface IInputFactory {
    new (serviceManager: IServiceManager): IInputFactory;
    sm: IServiceManager;
    InputsRegistry: <T>(type: keyof InputTypeMap) => IBuilder<T> | undefined;
    create: <T>(type: InputTypeNames) => IBuilder<T>;
}
export type IBuilder<T> = (descriptor: IFieldDescriptor) => T;
export interface IBuilderService<T> {
    sm: IServiceManager;
    build: IBuilder<T>;
}
export declare const InputFactory: IInputFactory;
