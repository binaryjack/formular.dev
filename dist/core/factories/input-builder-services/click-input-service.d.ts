import { IFieldDescriptor } from '../../framework/schema/descriptor/field.descriptor';
import { IBuilderService } from '../input-factory/input-factory';
import { IClickBaseInput } from '../../input-engine/variants/click-base/click-base-input.types';
import { IServiceManager } from '../../managers/service-manager/service-manager.types';
export declare const SClickInputService: unique symbol;
export interface IClickInputService extends IBuilderService<IClickBaseInput> {
    new (sm: IServiceManager): IClickInputService;
    build: (descriptor: IFieldDescriptor) => IClickBaseInput;
}
export declare const ClickInputService: IClickInputService;
