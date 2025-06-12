import { IFieldDescriptor } from '../../framework/schema/descriptor/field.descriptor';
import { IBuilderService } from '../input-factory/input-factory';
import { ISelectBaseInput } from '../../input-engine/variants/select-base/select-base-input.types';
import { IServiceManager } from '../../managers/service-manager/service-manager.types';
export declare const SSelectInputService: unique symbol;
export interface ISelectInputService extends IBuilderService<ISelectBaseInput> {
    new (sm: IServiceManager): ISelectInputService;
    build: (descriptor: IFieldDescriptor) => ISelectBaseInput;
}
export declare const SelectInputService: ISelectInputService;
