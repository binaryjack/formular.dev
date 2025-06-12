import { IFieldDescriptor } from '../../framework/schema/descriptor/field.descriptor';
import { IBuilderService } from '../input-factory/input-factory';
import { IOptionBaseInput } from '../../input-engine/variants/option-based/option-base-input.types';
import { IServiceManager } from '../../managers/service-manager/service-manager.types';
export declare const SOptionInputService: unique symbol;
export interface IOptionInputService extends IBuilderService<IOptionBaseInput> {
    new (sm: IServiceManager): IOptionInputService;
    build: (descriptor: IFieldDescriptor) => IOptionBaseInput;
}
export declare const OptionInputService: IOptionInputService;
