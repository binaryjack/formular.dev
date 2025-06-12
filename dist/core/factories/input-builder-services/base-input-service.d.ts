import { IBuilderService } from '../input-factory/input-factory';
import { IFieldDescriptor } from '../../framework/schema/descriptor/field.descriptor';
import { IInputBase } from '../../input-engine/core/input-base/input-base.types';
import { IServiceManager } from '../../managers/service-manager/service-manager.types';
export declare const SBaseInputService: unique symbol;
export interface IBaseInputService extends IBuilderService<IInputBase> {
    new (sm: IServiceManager): IBaseInputService;
    build: (descriptor: IFieldDescriptor) => IInputBase;
}
export declare const BaseInputService: IBaseInputService;
