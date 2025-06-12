import { IBuilderService } from '../input-factory/input-factory';
import { IFieldDescriptor } from '../../framework/schema/descriptor/field.descriptor';
import { ITextBaseInput } from '../../input-engine/variants/text-base/text-base-input.types';
import { IServiceManager } from '../../managers/service-manager/service-manager.types';
export declare const STextInputService: unique symbol;
export interface ITextInputService extends IBuilderService<ITextBaseInput> {
    new (sm: IServiceManager): ITextInputService;
    build: (descriptor: IFieldDescriptor) => ITextBaseInput;
}
export declare const TextInputService: ITextInputService;
