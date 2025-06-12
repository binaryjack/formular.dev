import { IBuilderService } from '../input-factory/input-factory';
import { IFieldDescriptor } from '../../framework/schema/descriptor/field.descriptor';
import { ICheckBoxBaseInput } from '../../input-engine/variants/check-box-base/check-box-base-input.types';
import { IServiceManager } from '../../managers/service-manager/service-manager.types';
export declare const SCheckInputService: unique symbol;
export interface ICheckInputService extends IBuilderService<ICheckBoxBaseInput> {
    new (sm: IServiceManager): ICheckInputService;
    build: (descriptor: IFieldDescriptor) => ICheckBoxBaseInput;
}
export declare const CheckInputService: ICheckInputService;
